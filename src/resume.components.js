import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resume, linkedin, github, email } from './constants.js';

function Experience(props) {
  return (
    <div className="experience">
      <div className="experience-header">
        <div className="experience-title">{props.title}</div>
        <div>
          <span className="experience-name">{props.name}</span>
          <span>, </span>
          <span className="experience-location">{props.location}</span>
          <span> (</span>
          <span className="experience-dates">{props.dates[0]}</span>
          <span> - </span>
          <span className="experience-dates">{props.dates[1]}</span>
          <span>)</span>
        </div>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );
}

function Controls(props) {
  return (
    <div id="resume-header-controls">
      <FontAwesomeIcon title="Go to main CLI view" id="cli-view" icon="laptop-code" onClick={props.showCLI}/>
      <FontAwesomeIcon title="Download resume" id="resume-file-download" icon="file-download" onClick={() => window.open(resume, '_blank')}/>
      <FontAwesomeIcon title="Copy email to clipboard" id="email" icon="envelope" onClick={() => navigator.clipboard.writeText(email)}/>
      <FontAwesomeIcon title="Open LinkedIn" id="linkedin" icon={["fab", "linkedin-in"]} onClick={() => window.open(linkedin, '_blank')}/>
      <FontAwesomeIcon title="Open Github" id="github" icon={["fab", "github"]} onClick={() => window.open(github, '_blank')}/>
    </div>
  );
}

export { Experience, Controls };
