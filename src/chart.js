import React, { useState, useEffect } from 'react';
import asciichart from 'asciichart';

export default function Chart(props) {
  const [display, setDisplay] = useState();
  const [keyPresses, setKeyPresses] = useState({});
  const [point, setPoint] = useState();
  const [points, setPoints] = useState([]);
  const [socket, setSocket] = useState();
  const [i, setI] = useState(0);

  useEffect(() => {
    switch(props.asset) {
      case 'bitcoin':
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
                return setPoint(parseFloat(data.price));
              default:
                console.log('Message from server ', event.data);
            }
          } catch(e) {
            console.log('Received unparseable raw message:', event.data);
          }
        });

        // const end = (new Date());
        // const start = (new Date(end.getTime() - (2*60*60*1000)));
        // const raw = await fetch('https://api.pro.coinbase.com/products/BTC-USD/candles?ids=bitcoin&granularity=60&start='+start.toISOString()+'&end='+end.toISOString());
        // const json = await raw.json();
        // setPoints(json.map(j => j[4]).reverse());
        setSocket(s);
        break;
    }
  }, []);

  useEffect(async () => {
    if (point) {
      let copy = points.length < 120 ? points.slice(0) : points.slice(1);
      copy.push(point);
      setPoints(copy);
    }
  }, [point]);

  useEffect(() => {
    if (points.length > 5) {
      setDisplay(
        <div id="chart">
          <div>{asciichart.plot(points, { height: 32 })}</div>
          <div
            className={isLoading ? 'hidden' : ''}
            onClick={props.displayManager.showCLI}
            style={{margin: '0 3em'}}>
              exit - ctrl + c
          </div>
        </div>
      );
    } else {
      setDisplay(<div key={"loading"}>Loading...</div>);
    }
  }, [points]);

  const handleKeydown = (e) => {
    const kp = Object.assign(keyPresses);
    kp[e.keyCode] = true;

    if (kp[17] && kp[67]) {
      return props.displayManager.showCLI();
    }

    setKeyPresses(kp);
  };

  const handleKeyup = (e) => {
    const kp = Object.assign(keyPresses);
    delete kp[e.keyCode];
    setKeyPresses(kp);
  };

  const isLoading = !display || display.key === 'loading';

  const banner = `
    ____   _ _            _       
    |  _ \\(_) |          (_)      
    | |_) |_| |_ ___ ___  _ _ __  
    |  _ <| | __/ __/ _ \\| | '_ \\ 
    | |_) | | || (_| (_) | | | | |
    |____/|_|\\__\\___\\___/|_|_| |_|
  `

  return (
    <div className="container">
      <div
        id="cli-wrapper"
        className={"cli-chart"+(isLoading ? '-loading' : '')}
        onKeyDown={handleKeydown}
        onKeyUp={handleKeyup}
        tabIndex="0">
          <div className={ isLoading ? 'hidden' : '' }>{banner}</div>
          <div style={{ textAlign: 'center', width: '100%' }}>{display}</div>
      </div>
    </div>
    );
}