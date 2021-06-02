import { useState, useEffect } from 'react';
import CLI from './cli.js';
import Chart from './chart.js';
import ChartSetup from './chartsetup.js';
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

  const showChartSetup = () => {
    setView({ name: 'chartsetup', params: {} });
    window.history.replaceState(null, 'Chart', '/#chartsetup');
  };

  useEffect(() => showCLI(), []);

  useEffect(() => {
    const displayManager = {
      showCLI,
      showChart,
      showChartSetup
    };

    switch(view.name) {
      case 'chartsetup':
        setDisplay(<ChartSetup displayManager={displayManager}></ChartSetup>);
        break;
      case 'chart':
        setDisplay(<Chart asset={view.params.asset} displayManager={displayManager}></Chart>);
        break;
      case 'cli':
      default:
        setDisplay(<CLI history={history} setHistory={setHistory} displayManager={displayManager}></CLI>);
    }
  }, [view, history]);

  return (<div className="App">{display}</div>);
}

export default App;
