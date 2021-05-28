import { useState, useEffect } from 'react';
import CLI from './cli.js';
import Chart from './chart.js';
import './App.css';

function App() {
  const [view, setView] = useState({ name: null });
  const [display, setDisplay] = useState(<div></div>);
  const [history, setHistory] = useState([]);

  const showCLI = () => {
    setView({ name: 'cli', params: {} });
    window.history.replaceState(null, 'Main', '/');
  };

  const showChart = (asset) => {
    setView({ name: 'chart', params: { asset } });
    window.history.replaceState(null, 'Chart', '/#chart');
  };

  const displayManager = {
    showCLI,
    showChart
  };

  useEffect(() => showCLI(), []);

  useEffect(() => {
    switch(view.name) {
      case 'chart':
        setDisplay(<Chart asset={view.params.asset} displayManager={displayManager}></Chart>);
        break;
      case 'cli':
      default:
        setDisplay(<CLI history={history} setHistory={setHistory} displayManager={displayManager}></CLI>);
    }
  }, [view]);

  return (<div className="App">{display}</div>);
}

export default App;
