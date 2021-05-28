import React, { useState, useEffect } from 'react';
import asciichart from 'asciichart';
import figlet from 'figlet';
import big from 'figlet/importable-fonts/Big';
figlet.parseFont('Big', big);

function ChartMetric(props) {
  return (
    <div className="cli-chart-metric">
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
  return (
    <div id="chart">
    <div>{asciichart.plot(props.points, { height: props.height })}</div>
      <div id="cli-chart-sidebar">
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


export default function Chart(props) {
  const [banner, setBanner] = useState('');
  const [costBasis, setCostBasis] = useState(0);
  const [display, setDisplay] = useState();
  const [height, setHeight] = useState(32);
  const [keyPresses, setKeyPresses] = useState({});
  const [point, setPoint] = useState();
  const [points, setPoints] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  let socket;

  const buy = () => {
    setCostBasis(quantity + 1 === 0 ? 0 : (transactions.reduce((s, a) => s + (a[0] * a[1]), 0) + parseFloat(point.price)) / (transactions.length + 1));
    setQuantity(quantity+1);
    setTotal(-1 * (transactions.reduce((s, a) => s + (a[0] * a[1]), 0) + parseFloat(point.price)));
    setTransactions([...transactions, [1, parseFloat(point.price), point.time]]);
  };

  const sell = () => {
    setCostBasis(quantity - 1 === 0 ? 0 : (transactions.reduce((s, a) => s + (a[0] * a[1]), 0) - parseFloat(point.price)) / (transactions.length + 1));
    setQuantity(quantity-1);
    setTotal(-1 * (transactions.reduce((s, a) => s + (a[0] * a[1]), 0) - parseFloat(point.price)));
    setTransactions([...transactions, [-1, parseFloat(point.price), point.time]]);
  };

  const zoomIn = () => height > 5 ? setHeight(height-1) : null;

  const zoomOut = () => height < 32 ? setHeight(height+1) : null;

  const handleKeydown = (e) => {
    const kp = Object.assign(keyPresses);
    kp[e.keyCode] = true;

    if (kp[17] && kp[67]) {
      return props.displayManager.showCLI();
    }

    if (kp[17] && kp[66]) {
      return buy();
    }

    if (kp[17] && kp[83]) {
      return sell();
    }

    if (kp[17] && kp[61]) {
      return zoomIn();
    }

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
    socket = new WebSocket('wss://ws-feed.pro.coinbase.com');

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
          case 'ticker':
            return setPoint(data);
          default:
            console.log('Message from server ', event.data);
        }
      } catch(e) {
        console.log('Received unparseable raw message:', event.data);
      }
    });
  }, []);

  useEffect(async () => {
    if (point) {
      let copy = points.length < 120 ? points.slice(0) : points.slice(1);
      copy.push(parseFloat(point.price));
      setPoints(copy);
    }
  }, [point]);

  useEffect(() => {
    console.log('# asset:', props.asset)

    if (points.length > 5) {
      setDisplay(
        <ChartView
          displayManager={props.displayManager}
          buy={buy}
          sell={sell}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          points={points}
          transactions={transactions}
          height={height}
          isLoading={isLoading}>
        </ChartView>
      );
    } else {
      setDisplay(<div key={"loading"}>Loading...</div>);
    }
  }, [points]);

  const isLoading = !display || display.key === 'loading';

  return (
    <div className="container">
      <div
        id="cli-wrapper"
        className={"cli-chart"+(isLoading ? '-loading' : '')}
        onKeyDown={handleKeydown}
        onKeyUp={handleKeyup}
        tabIndex="0">
          <div className={ isLoading ? 'hidden' : 'cli-chart-header' }>
            <div id="cli-chart-banner">{banner}</div>
            <div id="cli-chart-metrics">
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