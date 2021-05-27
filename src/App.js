import { useState, useEffect } from 'react';
import CLI from './cli.js';
import Chart from './chart.js';
import './App.css';

function App() {
  const [view, setView] = useState({ name: null });
  const [display, setDisplay] = useState(<div></div>);
  const [history, setHistory] = useState([]);

  const getCLI = () => <CLI history={history} setHistory={setHistory} displayManager={displayManager}></CLI>;

  const getChart = () => <Chart asset={view.params.asset} displayManager={displayManager}></Chart>;

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
        setDisplay(getChart());
        break;
      case 'cli':
      default:
        setDisplay(getCLI());
    }
  }, [view]);

  return (<div className="App">{display}</div>);
}

export default App;
