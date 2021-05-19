import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Experience } from './resume.components.js';
import { resume, linkedin, github, email } from './constants.js';

function Resume(props) {
  const handleEmailClick = () => {
    updateClipboard(email);
  }

  const updateClipboard = (newClip) => {
    navigator.clipboard.writeText(newClip)
    .then(() => {
      /* clipboard successfully set */
    }, () => {
      /* clipboard write failed */
    });
  };
  
  return (
    <div className="container">
      <div id="resume-wrapper">
        <div id="resume-content-wrapper">
          <header id="resume-header">
            <div id="resume-header-info">
              <div id="resume-header-name">Andrew Komar</div>
              <div id="resume-header-title">Full-Stack Javascript Developer</div>
            </div>
          </header>
          <div id="resume-body">
            <div id="intro">
              This page is under active development, check back soon for further updates. In the mean time
              my resume is available for download as a file in the top right corner
            </div>
            <div id="resume-experience">
              <Experience name="Datera" title="Member of Technical Staff" location="Santa Clara, CA" dates={['2/2016', '2/2021']}></Experience>
              <Experience name="Microsoft" title="Software Engineer" location="Redmond, WA" dates={['4/2015', '10/2016']}></Experience>
              <Experience name="Clutch" title="Software Engineer" location="Seattle, WA" dates={['9/2014', '4/2015']}></Experience>
              <Experience name="Cisco" title="Project Manager" location="San Jose, CA" dates={['2/2012', '9/2014']}></Experience>
            </div>
            <div id="resume-education">
              <div>UC Santa Cruz</div>
              <div>Bachelors of Arts Computational Mathematics, 2012</div>
            </div>
          </div>
        </div>
        <div id="resume-sidebar">
            <div id="resume-header-controls">
              <FontAwesomeIcon title="Go to main CLI view" id="cli-view" icon="laptop-code" onClick={props.showCLI}/>
              <FontAwesomeIcon title="Download resume" id="resume-file-download" icon="file-download" onClick={() => window.open(resume, '_blank')}/>
              <FontAwesomeIcon title="Copy email to clipboard" id="email" icon="envelope" onClick={handleEmailClick}/>
              <FontAwesomeIcon title="Open LinkedIn" id="linkedin" icon={["fab", "linkedin-in"]} onClick={() => window.open(linkedin, '_blank')}/>
              <FontAwesomeIcon title="Open Github" id="github" icon={["fab", "github"]} onClick={() => window.open(github, '_blank')}/>
            </div>
            <div id="resume-skills">
              <div className="resume-skill">JS</div>
              <div className="resume-skill">Node.js</div>
              <div className="resume-skill">React.js</div>
              <div className="resume-skill">Next.js</div>
              <div className="resume-skill">CSS</div>
              <div className="resume-skill">Python</div>
              <div className="resume-skill">SQL</div>
              <div className="resume-skill">Docker</div>
              <div className="resume-skill">Cloud</div>
              <div className="resume-skill">Bash</div>
              <div className="resume-skill">C#</div>
              <div className="resume-skill">Java</div>
              <div className="resume-skill">Git</div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Resume;
