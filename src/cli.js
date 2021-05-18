import { useState, useEffect } from 'react';
import './App.css';
const resume = 'https://drive.google.com/uc?id=1gL7S3L4zUgKBmq7oiPxmhPQxeZ2Us2I0&export=download';
const linkedin = 'https://www.linkedin.com/in/andrew-komar-24537036/';
const github = 'https://github.com/akomar812';

function CLI(props) {
  const [cmd, setCmd] = useState('');
  const [history, setHistory] = useState([]);

  const focusCLIInput = () => {
    return document.getElementById('cli-input').children[1].focus();
  }

  const getHistoryHTML = (h) => {
    return <div className="cli-history-item" key={new Date().getTime()+(Math.random()*1000)}>{h}</div>;
  };

  const getBanner = () => {
    const banner = [
    `
       ___            _                     _   __                             _____  _     _____ 
      / _ \\          | |                   | | / /                            /  __ \\| |   |_   _|
     / /_\\ \\_ __   __| |_ __ _____      __ | |/ /  ___  _ __ ___   __ _ _ __  | /  / | |     | |  
     |  _  | '_ \\ / _\` | '__/ _ \\ \\ /\\ / / |    \\ / _ \\| '_ \` _ \\ / _\` | \'__| | |    | |     | |  
     | | | | | | | (_| | | |  __/\\ V  V /  | |\\  \\ (_) | | | | | | (_| | |    | \\__/\\| |_____| |_ 
     \\_| |_/_| |_|\\__,_|_|  \\___| \\_/\\_/   \\_| \\_/\\___/|_| |_| |_|\\__,_|_|     \\____/\\_____/\\___/
     `,
     getHelp()
    ];

    console.log(banner)
    return banner.join('\n');
  };

  const getHelp = () => {
    const help = [`    cmd              description`,
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
    help.push(`    contact: akomar812@gmail.com`);

    help.push(``);
    help.push(`    pending features`);
    help.push(`    -------`);
    help.push(`    cmd history`);
    help.push(`    direct link to individual views`);
    return help.join('\n');
  };

  const cmds = {
    'help': 'Print CLI usage',
    'resume': 'Resume view (or call with "-d" for direct file download)',
    'linkedin': 'LinkedIn profile',
    'github': 'Github repos'
  };

  const parseCmd = (cmd) => {
    if (cmd === '') {
      return cmd;
    }

    if (cmd.indexOf('help') >= 0) {
      return getHelp();
    }

    if (cmd.indexOf('resume') >= 0) {
      if (cmd.indexOf('-d') >= 0) {
        window.open(resume, '_blank');
        return resume;
      }

      return props.showResume();
    }

    if (cmd === 'linkedin') {
      window.open(linkedin, '_blank');
      return linkedin;
    }

    if (cmd === 'github') {
      window.open(github, '_blank');
      return github;
    }

    return `CMD not recognized: ${cmd}`
  };

  const submit = (e) => {
    if (e.keyCode === 13) {
      const copy = history.slice();

      // add command invocation to output array
      copy.push(cmd);

      // add command invocation output to output array
      copy.push(parseCmd(cmd, copy));

      setHistory(copy.reverse().slice(0, 2).reverse());
      setCmd('');
      e.target.value = '';
    }
  };

  useEffect(() => setHistory([getBanner()]), []);

  return (
    <div className="container" onClick={focusCLIInput}>
      <div id="cli-wrapper">
        <div id="cli-history">
          { history.map(getHistoryHTML) }
        </div>
        <div id="cli-input">
          <span>$</span>
          <input type="text" onKeyDown={submit} onChange={(e) => setCmd(e.target.value)}/>
        </div>
      </div>
    </div>
  );
}

export default CLI;
