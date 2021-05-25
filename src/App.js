import { useState, useEffect } from 'react';
import CLI from './cli.js';
import './App.css';

function App() {
  const [view, setView] = useState();
  const [history, setHistory] = useState([]);
  let display;

  const showCLI = () => {
    setView('cli');
    window.history.replaceState(null, 'Main', '/');
  };

  const displayManager = {
    showCLI
  }

  useEffect(() => showCLI(), []);

  switch(view) {
    case 'cli':
    default:
      display = <CLI history={history} setHistory={setHistory} displayManager={displayManager}></CLI>;
  }

  return (<div className="App">{display}</div>);
}

export default App;
