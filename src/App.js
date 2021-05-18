import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CLI from './cli.js';
import './App.css';

function App() {
  const [view, setView] = useState();

  const showCLI = () => setView(<CLI showResume={showResume}></CLI>);
  const showResume = () => setView(<div className="container"><FontAwesomeIcon icon="laptop-code" onClick={showCLI}/></div>);
  useEffect(() => showCLI(), []);

  return (
    <div className="App">
      { view }
    </div>
  );
}

export default App;
