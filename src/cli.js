import { useState, useEffect } from 'react';
import { resume, linkedin, github, email } from './constants.js';
import figlet from 'figlet';
import big from 'figlet/importable-fonts/Big';
import './App.css';
figlet.parseFont('Big', big);

function CLI(props) {
  const [banner, setBanner] = useState('');
  const [cmd, setCmd] = useState('');
  const [history, setHistory] = useState([]);
  const [historyCursor, setHistoryCursor] = useState();

  const cmds = {
    'help': 'Print CLI usage',
    'history': 'CMD history',
    'resume': 'Resume file download',
    'linkedin': 'LinkedIn profile',
    'github': 'Github repos',
    'chart': 'Select asset to chart live',
    'chart [asset]': 'Chart live asset price (example asset: BTC-USD)'
  };

  let longestCmd = Object.keys(cmds).reduce((a, b) => a.length > b.length ? a : b);

  const focusCLIInput = () => {
    return document.getElementById('cli-input').children[1].focus();
  }

  const getPadding = (key) => {
    let padding = '         ';

    for (let i=0; i<longestCmd.length-key.length; i++) {
      padding += ' ';
    }

    return padding;
  };

  const parseCmd = (cmd) => {
    if (cmd === '') {
      return cmd;
    }

    if (cmd.indexOf('help') >= 0) {
      return help;
    }

    if (cmd.indexOf('resume') === 0) {
      window.open(resume, '_blank');
      return resume;
    }

    if (cmd.indexOf('linkedin') === 0) {
      if (cmd.indexOf('-c') > 0) {
        navigator.clipboard.writeText(linkedin);
      }

      if (cmd.indexOf('-o') > 0) {
        window.open(linkedin, '_blank');
      }
      
      return linkedin;
    }

    if (cmd.indexOf('github') === 0) {
      if (cmd.indexOf('-c') > 0) {
        navigator.clipboard.writeText(github);
      }

      if (cmd.indexOf('-o') > 0) {
        window.open(github, '_blank');
      }

      return github;
    }

    if (cmd.indexOf('history') === 0) {
      return props.history.filter(h => h !== '').join('\n');
    }

    if (cmd === 'chart') {
      window.setTimeout(() => props.displayManager.showChartSetup(), 0);
      return cmd;
    }

    if (cmd.indexOf('chart') === 0) {
      const asset = cmd.split(' ')[1];
      window.setTimeout(() => asset ? props.displayManager.showChart(asset.toUpperCase()) : props.displayManager.showChartSetup(), 0);
      return cmd;
    }

    return 'Unknown cmd: '+cmd;
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
        setHistoryCursor(undefined);
        props.setHistory([...props.history, cmd]);
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

      default:
        //console.log('# unrecognized keycode:', e.keyCode);
    }
  };

  const helpConf = [
    `    contact: ${email}`, `\n`,
    `    Try typing and entering one of the following commands.`,
    `    If you get lost, use "help" to bring the set of commands back`,  `\n`,
    `    cmd${getPadding('cmd')}description`,
    `    ---${getPadding('---')}-----------`
  ];

  for (let key in cmds) {
    helpConf.push(`    ${key}${getPadding(key)}${cmds[key]}`);
  }

  helpConf.push(``);
  helpConf.push(`    general`);
  helpConf.push(`    -------`);
  helpConf.push(`    enter an empty command to clear screen`);
  helpConf.push(`    "-c" can be used to copy links to your clipboard (when applicable)`);
  helpConf.push(`    "-o" can be used to open links in new tab (when applicable)`);
  helpConf.push(``);
  helpConf.push(`\n`);
  const help = helpConf.join('\n');

  useEffect(() => focusCLIInput(), []);

  // initialize cli with banner
  useEffect(() => figlet.text('Andrew Komar', { font: 'Big' }, (err, data) => setBanner(data)), []);
  useEffect(() => setHistory([[banner, help].join('\n')]), [banner, help]);

  // scroll through history with up/down arrow
  useEffect(() => {
    const value = historyCursor >= 0 ? props.history[historyCursor] : '';
    document.getElementById('cli-input').children[1].value = value;
    setCmd(value);
  }, [historyCursor, props.history]);

  return (
    <div className="container" onClick={focusCLIInput}>
      <div id="cli-wrapper">
        <div id="cli-history">
          { history.map((h, i) => <div className="cli-history-item" key={i}>{h}</div>) }
        </div>
        <div id="cli-input" className="row">
          <span>$</span>
          <input type="text" onKeyDown={handleInput} onChange={(e) => setCmd(e.target.value)}/>
        </div>
      </div>
    </div>
  );
}

export default CLI;
