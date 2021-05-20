import { useState, useEffect } from 'react';
import { resume, linkedin, github, email } from './constants.js';
import './App.css';

function CLI(props) {
  const [cmd, setCmd] = useState('');
  const [history, setHistory] = useState([]);
  const [historyCursor, setHistoryCursor] = useState();

  const cmds = {
    'help': 'Print CLI usage',
    'resume': 'Resume view (or add "-d" for direct file download)',
    'linkedin': 'LinkedIn profile',
    'github': 'Github repos'
  };

  const focusCLIInput = () => {
    return document.getElementById('cli-input').children[1].focus();
  }

  const getHistoryHTML = (h) => {
    return <div className="cli-history-item" key={new Date().getTime()+(Math.random()*1000)}>{h}</div>;
  };

  const getBanner = () => {
    const banner = [
    `
       ___            _                     _   __
      / _ \\          | |                   | | / /
     / /_\\ \\_ __   __| |_ __ _____      __ | |/ /  ___  _ __ ___   __ _ _ __
     |  _  | '_ \\ / _\` | '__/ _ \\ \\ /\\ / / |    \\ / _ \\| '_ \` _ \\ / _\` | \'__|
     | | | | | | | (_| | | |  __/\\ V  V /  | |\\  \\ (_) | | | | | | (_| | |
     \\_| |_/_| |_|\\__,_|_|  \\___| \\_/\\_/   \\_| \\_/\\___/|_| |_| |_|\\__,_|_|
     `,
     getHelp()
    ];

    return banner.join('\n');
  };

  const getHelp = () => {
    const help = [`    contact: ${email}`, `\n`,
                  `    cmd              description`,
                  `    ---              -----------`];

    for (let key in cmds) {
      let padding = '         ';

      // 6 is the size of the largest command ("linkedin")
      for (let i=0; i<8-key.length; i++) {
        padding += ' ';
      }

      help.push(`    ${key}${padding}${cmds[key]}`);
    }

    help.push(``);
    help.push(`    general`);
    help.push(`    -------`);
    help.push(`    enter an empty command to clear screen`);
    help.push(`    add "-l" to linkedin, or github cmd to retrieve link w/o opening in new tab`);
    help.push(``);
    help.push(`    known issues/pending features`);
    help.push(`    -----------------------------`);
    help.push(`    completed resume view`);
    help.push(`    visual indication email copied when resume view button clicked`);
    help.push(`\n`);
    return help.join('\n');
  };

  const parseCmd = (cmd) => {
    if (cmd === '') {
      return cmd;
    }

    if (cmd.indexOf('help') >= 0) {
      return getHelp();
    }

    if (cmd.indexOf('resume') === 0) {
      if (cmd.indexOf('-d') >= 0) {
        window.open(resume, '_blank');
        return resume;
      }

      window.setTimeout(() => props.showResume(), 500);

      return 'Opening...';
    }

    if (cmd.indexOf('linkedin') === 0) {
      if (cmd.indexOf('-l') < 0) {
        window.open(linkedin, '_blank');
      }
      
      return linkedin;
    }

    if (cmd.indexOf('github') === 0) {
      if (cmd.indexOf('-l') < 0) {
        window.open(github, '_blank');
      }

      return github;
    }

    return `CMD not recognized: ${cmd}`
  };

  const handleInput = (e) => {
    switch(e.keyCode) {
      case 13:
        const copy = history.slice();

        // add command invocation to output array
        copy.push(cmd);
  
        // add command invocation output to output array
        copy.push(parseCmd(cmd, copy));
  
        setHistory(copy.reverse().slice(0, 2).reverse());
        setCmd('');
        e.target.value = '';
        break;

      case 38:
        if (props.history.length > 0) {
          if (historyCursor && historyCursor > 0) {
            setHistoryCursor(historyCursor - 1);
          } else if (!historyCursor) {
            setHistoryCursor(props.history.length - 1);
          } else {
            setHistoryCursor(undefined);
          }
        }

        break;

      case 40:
        if (props.history.length > 0) {
          if (historyCursor && historyCursor < props.history.length - 1) {
            setHistoryCursor(historyCursor + 1);
          } else {
            setHistoryCursor(undefined);
          }
        }

        break;

      // default:
      //   console.log('# unrecognized keycode:', e.keyCode);
    }
  };

  // initialize cli with banner
  useEffect(() => setHistory([getBanner()]), []);

  // register cmd invokations in full history
  useEffect(() => history.length > 1 ? props.setHistory([...props.history, history[0]]) : null, [history]);

  // scroll through history with up/down arrow
  useEffect(() => {
    const value = historyCursor >= 0 ? props.history[historyCursor] : '';
    document.getElementById('cli-input').children[1].value = value;
    setCmd(value);
  }, [historyCursor]);

  return (
    <div className="container" onClick={focusCLIInput}>
      <div id="cli-wrapper">
        <div id="cli-history">
          { history.map(getHistoryHTML) }
        </div>
        <div id="cli-input">
          <span>$</span>
          <input type="text" onKeyDown={handleInput} onChange={(e) => setCmd(e.target.value)}/>
        </div>
      </div>
    </div>
  );
}

export default CLI;
