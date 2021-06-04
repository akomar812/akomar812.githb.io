import React, { useState, useEffect } from 'react';
import asciichart from 'asciichart';
import figlet from 'figlet';
import big from 'figlet/importable-fonts/Big';
figlet.parseFont('Big', big);

function ChartMetric(props) {
  return (
    <div className="column align-start cli-chart-metric">
      <div className="cli-chart-metric-header">{props.title}:</div>
      <div>{props.data}</div>
    </div>
  );
}

function ChartTransaction(props) {
  const d = new Date(props.datetime);
  return (
    <div>{props.quantity}, {props.price}, {d.getMonth()+1}/{d.getDate()}/{d.getFullYear()}</div>
  );
}

function ChartControl(props) {
  return (
    <div
    tabIndex="0"
    className={props.isLoading ? 'hidden' : 'cli-chart-control'}
    onClick={props.onClick}>
      <div>{props.name}</div>
      <div> - {props.hotkey}</div>
  </div>
  );
}

function ChartView(props) {
  const [moneyness, setMoneyness] = useState('');

  useEffect(() => {
    if (props && props.costBasis > 0) {
      if (props.costBasis > props.point.price) {
        setMoneyness('cli-chart-otm');
      } else {
        setMoneyness('cli-chart-itm');
      }
    } else {
      setMoneyness('')
    }
  }, [props, props.costBasis, props.point]);

  return (
    <div className="row justify-spaced">
      <div className={moneyness}>{asciichart.plot(props.points, { height: props.height })}</div>
      <div className="column">
        <div id="cli-chart-transactions">
          <div>transactions</div>
          <div id="cli-chart-transactions-wrapper">
            {
              props.transactions.map((t, i) => {
                return <ChartTransaction key={i} quantity={t[0]} price={t[1]} datetime={t[2]}></ChartTransaction>;
              })
            }
          </div>
        </div>
        <div>
          <div style={{ textAlign: 'center' }}>controls</div>
          <ChartControl
            name="exit"
            hotkey="[ctrl] + [c]"
            onClick={props.displayManager.showCLI}
            isLoading={props.isLoading}></ChartControl>
          <ChartControl
            name="reselect"
            hotkey="[ctrl] + [r]"
            onClick={props.displayManager.showChartSetup}
            isLoading={props.isLoading}></ChartControl>
          <ChartControl
            name="buy"
            hotkey="[ctrl] + [b]"
            onClick={props.buy}
            isLoading={props.isLoading}></ChartControl>
          <ChartControl
            name="sell"
            hotkey="[ctrl] + [s]"
            onClick={props.sell}
            isLoading={props.isLoading}></ChartControl>
          <ChartControl
            name="[+]"
            hotkey="[ctrl] + [+]"
            onClick={props.zoomIn}
            isLoading={props.isLoading}></ChartControl>
          <ChartControl
            name="[-]"
            hotkey="[ctrl] + [-]"
            onClick={props.zoomOut}
            isLoading={props.isLoading}></ChartControl>
        </div>
      </div>
    </div>
  );
}

function ChartError(props) {
  return (
    <div>
      <div>Unknown asset: {props.asset} (example valid entry: BTC-USD)</div>
      <div>exit - [ctrl] + [c]</div>
      <div>select asset - [ctrl] + [r]</div>
    </div>
  )
}

export default function Chart(props) {
  const [banner, setBanner] = useState('');
  const [costBasis, setCostBasis] = useState(0);
  const [display, setDisplay] = useState();
  const [height, setHeight] = useState(32);
  const [loadState, setLoadState] = useState('connecting');
  const [keyPresses, setKeyPresses] = useState({});
  const [point, setPoint] = useState();
  const [points, setPoints] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [tradeId, setTradeId] = useState(-1);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);

  const getCostBasis = (price) => {
    const t = transactions.filter((a) => a[2] === tradeId);
    const totalCostThisTrade = getTotal(t, price);
    const numTrades = t.length + 1;
    return totalCostThisTrade / numTrades;
  };

  const getTotal = (t, price) => {
    return t.reduce((s, a) => s + a[1], 0) + price;
  };

  const buy = () => {
    if (costBasis === 0) {
      setTradeId(tradeId+1);
    }

    const price = parseFloat(point.price);
    setCostBasis(quantity + 1 === 0 ? 0 : getCostBasis(price));
    setQuantity(quantity+1);
    setTotal(-1 * getTotal(transactions, price));
    setTransactions([...transactions, [1, price, point.time, tradeId]]);
  };

  const sell = () => {
    if (costBasis === 0) {
      setTradeId(tradeId+1);
    }

    const price = -1 * parseFloat(point.price);
    setCostBasis(quantity - 1 === 0 ? 0 : getCostBasis(price));
    setQuantity(quantity-1);
    setTotal(-1 * getTotal(transactions, price));
    setTransactions([...transactions, [-1, price, point.time, tradeId]]);
  };

  const zoomIn = () => height > 5 ? setHeight(height-1) : null;

  const zoomOut = () => height < 32 ? setHeight(height+1) : null;

  const handleKeydown = (e) => {
    const kp = Object.assign(keyPresses);
    kp[e.keyCode] = true;

    // [ctrl] + [c] - exit
    if (kp[17] && kp[67]) {
      return props.displayManager.showCLI();
    }

    // [ctrl] + [r] - reselect asset to graph
    if (kp[17] && kp[82]) {
      return props.displayManager.showChartSetup();
    }

    // [ctrl] + [b] - buy charted asset at current price
    if (kp[17] && kp[66]) {
      return buy();
    }

    // [ctrl] + [s] - sell charted asset at current price
    if (kp[17] && kp[83]) {
      return sell();
    }

    // [ctrl] + [+] - decrease the number of ticks for the y axis i.e zoom in
    if (kp[17] && kp[61]) {
      return zoomIn();
    }

    // [ctrl] + [-] - increase the number of ticks for the y axis i.e zoom out
    if (kp[17] && kp[173]) {
      return zoomOut();
    }

    setKeyPresses(kp);
  };

  const handleKeyup = (e) => {
    const kp = Object.assign(keyPresses);
    delete kp[e.keyCode];
    setKeyPresses(kp);
  };

  useEffect(() => {
    figlet.text(props.asset, { font: 'Big' }, (err, data) => setBanner(data));

    document.getElementById('cli-wrapper').focus();

    let socket = new WebSocket('wss://ws-feed.pro.coinbase.com');

    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({
        "type": "subscribe",
        "product_ids": [
          props.asset
        ],
        "channels": [
            "ticker"
        ]
      }));
    });

    socket.addEventListener('subscribe', (event) => {
      console.log('Subscription message:', event)
    });

    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);

        switch(data.type) {
          case 'subscriptions':
            return setLoadState('Waiting for data');
          case 'ticker':
            return setPoint(data);
          case 'error':
            if (data.message === 'Failed to subscribe' && data.reason === props.asset+' is not a valid product') {
              setDisplay(<ChartError key="error" asset={props.asset}></ChartError>);
            }

            return;
          default:
            console.log('Message from server ', event.data);
        }
      } catch(e) {
        console.log('Received unparseable raw message:', event.data);
      }
    });

    return function chartDisconnect() {
      socket.close();
    }
  }, []);

  useEffect(() => {
    if (point) {
      let copy = points.length < 120 ? points.slice(0) : points.slice(1);
      copy.push(parseFloat(point.price));
      setPoints(copy);
    }
  }, [point]);

  useEffect(() => {
    if (points.length > 3) {
      setDisplay(
        <ChartView
          displayManager={props.displayManager}
          buy={buy}
          sell={sell}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          costBasis={costBasis}
          point={point}
          points={points}
          transactions={transactions}
          height={height}
          isLoading={isLoading}>
        </ChartView>
      );
    } else {
      setDisplay(
        <div key={"loading"}>
          <div>Loading... {props.asset} - {loadState}</div>
          <div>Depending on trade volume this can take a moment</div>
          <div className="row justify-center">
            <div style={{"marginRight":"2em"}}>[ctrl] + [c] - cancel</div>
            <div>[ctrl] + [r] - reselect</div>
          </div>
        </div>
      );
    }
  }, [points, loadState]);

  const isLoading = !display || display.key === 'loading' || display.key === 'error';
  return (
    <div className="container">
      <div
        id="cli-wrapper"
        className={"cli-chart column justify-center align-"+(isLoading ? 'center' : 'start')}
        onKeyDown={handleKeydown}
        onKeyUp={handleKeyup}
        tabIndex="0">
          <div className={ isLoading ? 'hidden' : 'row justify-start' }>
            <div id="cli-chart-banner">{banner}</div>
            <div className="row align-center justify-center">
              <ChartMetric title="Price" data={point ? point.price : ''}></ChartMetric>
              <ChartMetric title="Bid" data={point ? point.best_bid : ''}></ChartMetric>
              <ChartMetric title="Ask" data={point ? point.best_ask : ''}></ChartMetric>
              <ChartMetric title="Quantity" data={quantity}></ChartMetric>
              <ChartMetric title="Cost Basis" data={costBasis.toFixed(4)}></ChartMetric>
              <ChartMetric title="Total" data={total.toFixed(4)}></ChartMetric>
            </div>
          </div>
          <div style={{ width: '100%', textAlign: (isLoading ? 'center' : '') }}>{display}</div>
      </div>
    </div>
    );
}