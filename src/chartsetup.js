import React, { useState, useEffect } from 'react';

const mod = function(m, n) {
  return ((m%n)+n)%n;
};

export default function ChartSetup(props) {
  const [assets, setAssets] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [keyPresses, setKeyPresses] = useState({});

  const handleInput = (e) => {
    if (e.keyCode === 17 || keyPresses[17]) {
      const kp = Object.assign(keyPresses);
      kp[e.keyCode] = true;
  
      if (kp[17] && kp[67]) {
        return props.displayManager.showCLI();
      }
  
      return setKeyPresses(kp);
    }

    switch(e.keyCode) {
      case 13:
        props.displayManager.showChart(assets[cursor].id);
        break;
      case 38:
        setCursor(mod(cursor-1, assets.length));
        break;
      case 40:
        setCursor(mod(cursor+1, assets.length));
        break;
      default:
        ;
    }
  };

  useEffect(async () => {
    const raw = await fetch('https://api.pro.coinbase.com/products');
    const json = await raw.json();
    setAssets(json.sort((a, b) => a.id > b.id ? 1 : -1));
  }, []);

  return (
    <div tabIndex="0" className="container" onKeyDown={handleInput}>
      <div id="cli-wrapper" className="spaced-columns">
        <div id="cli-history">
          {
            assets.slice(cursor, cursor+30).map((a, i) => <div className={0 === i ? 'selected' : ''} key={i}>{a.id}</div>)
          }
        </div>
        <div>exit - [ctrl] + [c]</div>
      </div>
    </div>
  );
}