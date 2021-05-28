import React, { useState, useEffect } from 'react';
import asciichart from 'asciichart';
import figlet from 'figlet';
import big from 'figlet/importable-fonts/Big';
figlet.parseFont('Big', big);

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
  const [socket, setSocket] = useState();

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

  const zoomIn = () => height > 0 ? setHeight(height-1) : null;

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
 
    let s = new WebSocket('wss://ws-feed.pro.coinbase.com');

    // Connection opened
    s.addEventListener('open', () => {
      s.send(JSON.stringify({
        "type": "subscribe",
        "product_ids": [
            "BTC-USD"
        ],
        "channels": [
            "ticker"
        ]
      }));
    });

    s.addEventListener('subscribe', (event) => {
      console.log('Subscription message:', event)
    });

    // Listen for messages
    s.addEventListener('message', (event) => {
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

    setSocket(s);
  }, []);

  useEffect(async () => {
    if (point) {
      let copy = points.length < 120 ? points.slice(0) : points.slice(1);
      copy.push(parseFloat(point.price));
      setPoints(copy);
    }
  }, [point]);

  useEffect(() => {
    if (points.length > 5) {
      setDisplay(
        <div id="chart">
          <div>{asciichart.plot(points, { height: height })}</div>
          <div id="cli-chart-sidebar">
            <div id="cli-chart-transactions">
              <div>transactions</div>
              <div id="cli-chart-transactions-wrapper">
                {
                  transactions.map((t, i) => {
                    const d = new Date(t[2]);
                    return (
                      <div
                        key={i}
                        className="cli-chart-transactions">
                          {t[0]}, {t[1]}, {d.getMonth()+1}/{d.getDate()}/{d.getFullYear()}
                      </div>
                    );
                  })
                }
              </div>
            </div>
            <div>
              <div style={{ textAlign: 'center' }}>controls</div>
              <div
                tabIndex="0"
                className={isLoading ? 'hidden' : 'cli-chart-button'}
                onClick={props.displayManager.showCLI}>
                  <div>exit</div>
                  <div> - [ctrl] + [c]</div>
              </div>
              <div
                tabIndex="0"
                className={isLoading ? 'hidden' : 'cli-chart-button'}
                onClick={buy}>
                  <div>buy</div>
                  <div> - [ctrl] + [b]</div>
              </div>
              <div
                tabIndex="0"
                className={isLoading ? 'hidden' : 'cli-chart-button'}
                onClick={sell}>
                  <div>sell</div>
                  <div> - [ctrl] + [s]</div>
              </div>
              <div
                tabIndex="0"
                className={isLoading ? 'hidden' : 'cli-chart-button'}
                onClick={zoomIn}>
                  <div>[+]</div>
                  <div> - [ctrl] + [+]</div>
              </div>
              <div
                tabIndex="0"
                className={isLoading ? 'hidden' : 'cli-chart-button'}
                onClick={zoomOut}>
                  <div>[-]</div>
                  <div> - [ctrl] + [-]</div>
              </div>
            </div>
          </div>
        </div>
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
              <div className="cli-chart-metric">
                <div className="cli-chart-metric-header">Last:</div>
                <div>{point ? point.price : ''}</div>
              </div>
              <div className="cli-chart-metric">
                <div className="cli-chart-metric-header">Bid:</div>
                <div>{point ? point.best_bid : ''}</div>
              </div>
              <div className="cli-chart-metric">
                <div className="cli-chart-metric-header">Ask:</div>
                <div>{point ? point.best_ask : ''}</div>
              </div>
              <div className="cli-chart-metric">
                <div className="cli-chart-metric-header">Quantity:</div>
                <div>{quantity}</div>
              </div>
              <div className="cli-chart-metric">
                <div className="cli-chart-metric-header">Cost Basis:</div>
                <div>{costBasis.toFixed(4)}</div>
              </div>
              <div className="cli-chart-metric">
                <div className="cli-chart-metric-header">Total:</div>
                <div>{total.toFixed(4)}</div>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', textAlign: (isLoading ? 'center' : '') }}>{display}</div>
      </div>
    </div>
    );
}