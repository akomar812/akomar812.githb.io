import { Experience, Controls } from './resume.components.js';

function Resume(props) {
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
              <p>This page is under active development, check back soon for further updates. In the mean time
              my resume is available for download as a file in the top right corner</p>

              {/* <p>Dedicated full stack developer with 9 years of experience working in enterprise and startup environments.
              I've built and deployed applications both on-prem and on public clouds.</p> */}
            </div>
            {/* <div id="resume-experience">
              <Experience name="Datera" title="Member of Technical Staff" location="Santa Clara, CA" dates={['2/2016', '2/2021']}>
                <ul>
                  <lh>Role and Accomplishments</lh>
                </ul>
              </Experience>
              <Experience name="Microsoft" title="Software Engineer" location="Redmond, WA" dates={['4/2015', '10/2016']}>
                <ul>
                  <lh>Role and Accomplishments</lh>
                </ul>
              </Experience>
              <Experience name="Clutch" title="Software Engineer" location="Seattle, WA" dates={['9/2014', '4/2015']}>
                <ul>
                  <lh>Role and Accomplishments</lh>
                </ul>
              </Experience>
              <Experience name="Cisco" title="Project Manager" location="San Jose, CA" dates={['2/2012', '9/2014']}>
                <ul>
                  <lh>Role and Accomplishments</lh>
                </ul>
              </Experience>
            </div>
            <div id="resume-education">
              <div>UC Santa Cruz</div>
              <div>Bachelors of Arts Computational Mathematics, 2012</div>
            </div> */}
          </div>
        </div>
        <div id="resume-sidebar">
            <Controls showCLI={props.showCLI}></Controls>
            {/* <div id="resume-skills">
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
            </div> */}
          </div>
      </div>
    </div>
  );
}

export default Resume;
