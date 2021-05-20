import { useState, useEffect } from 'react';
import CLI from './cli.js';
import Resume from './resume.js';
import './App.css';

function App() {
  const [view, setView] = useState();
  const [history, setHistory] = useState([]);
  let display;

  const showCLI = () => {
    setView('cli');
    window.history.replaceState(null, 'Main', '/');
  };

  const showResume = () => {
    setView('resume');
    window.history.replaceState(null, 'Resume', '#resume');
  };

  useEffect(() => window.location.hash === '#resume' ? showResume() : showCLI(), []);

  switch(view) {
    case 'cli':
      display = <CLI showResume={showResume} history={history} setHistory={setHistory}></CLI>;
      break;
    case 'resume':
      display = <Resume showCLI={showCLI}></Resume>;
      break;     
  }

  return (<div className="App">{display}</div>);
}

export default App;
