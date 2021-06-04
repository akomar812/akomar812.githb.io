import React, { useState, useEffect } from 'react';

const mod = function(m, n) {
  return ((m%n)+n)%n;
};

export default function ChartSetup(props) {
  const [assets, setAssets] = useState([]);
  const [displayAssets, setDisplayAssets] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [keyPresses, setKeyPresses] = useState({});
  const [search, setSearch] = useState('');

  const handleInput = (e) => {
    const isControlSelection = e.keyCode === 17 || keyPresses[17];
    const isNumberInput = e.keyCode > 47 && e.keyCode < 58;
    const isLetterInput = e.keyCode > 64 && e.keyCode < 91;
    
    if (isControlSelection) {
      const kp = Object.assign(keyPresses);
      kp[e.keyCode] = true;
  
      // [ctrl] + [c]
      if (kp[17] && kp[67]) {
        return props.displayManager.showCLI();
      }
  
      return setKeyPresses(kp);
    }

    // [0]-[9] or [a]-[z]
    if (isNumberInput || isLetterInput) {
      setCursor(0);
      setSearch(search+String.fromCharCode(e.keyCode));
    }

    switch(e.keyCode) {
      // [enter]
      case 13:
        props.displayManager.showChart(displayAssets[cursor].id);
        break;
      // [up arrow]
      case 38:
        setCursor(mod(cursor-1, displayAssets.length));
        break;
      // [down arrow]
      case 40:
        setCursor(mod(cursor+1, displayAssets.length));
        break;
      // [delete]
      case 8:
        setCursor(0);
        setSearch(search.substring(0, search.length - 1));
        break; 
      // [-]   
      case 173:
        setCursor(0);
        setSearch(search+'-');
        break;
      default:
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      setDisplayAssets(assets.filter(a => a.id.match(search.toUpperCase())));
    } else {
      setDisplayAssets(assets);
    }
  }, [search, assets]);

  useEffect(() => {
    async function loadAssets() {
      const raw = await fetch('https://api.pro.coinbase.com/products');
      const json = await raw.json();
      const sortedAssets = json.sort((a, b) => a.id > b.id ? 1 : -1);

      for (let i=0; i<sortedAssets.length; i++) {
        if (sortedAssets[i].id === 'BTC-USD') {
          setCursor(i);
          break;
        }
      }

      setAssets(sortedAssets);
      setDisplayAssets(sortedAssets);
    }

    document.getElementById('cli-view').focus();
    loadAssets();
  }, []);

  return (
    <div tabIndex="0" className="container" onKeyDown={handleInput} id="cli-view">
      <div id="cli-wrapper" className="column justify-spaced">
        <div id="cli-history">
          {
            displayAssets.slice(cursor, cursor+30).map((a, i) => <div className={0 === i ? 'selected' : ''} key={i}>{a.id}</div>)
          }
        </div>
        <div id="cli-setup-controls" className="row">
          <div>nav up - [&#8593;]</div>
          <div>nav down - [&#8595;]</div>
          <div>exit - [ctrl] + [c]</div>
          <div>search: {search === '' ? '<search>' : search}</div>
        </div>
      </div>
    </div>
  );
}