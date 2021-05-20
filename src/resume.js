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
              Dedicated full stack developer with 9 years of experience working in enterprise and startup environments.
              I've built and deployed applications both on-prem and on public clouds. Beyond web technologies, my interests
              include finance (investing, crypto), gaming, cooking, and the outdoors
            </div>
            <div id="resume-experience">
              <Experience name="Datera" title="Member of Technical Staff" location="Santa Clara CA" dates={['Feb/2016', 'Feb/2021']}>
                <ul>
                  <li>
                    Designed and built web applications, product features, product tooling, test infrastructure,
                    and more for a distributed cloud management platform.
                  </li>
                  <li>
                    Coordinated with systems engineers, QA engineers, product stakeholders, sales, support,
                    and organization members from the early stages and throughout the software lifecycle for
                    new and legacy features. Engaged with customers in support and feedback gathering capacities.
                  </li>
                  <li>
                    Designed, owned, and made significant contributions to core product features and functionality
                  </li>
                  <li>
                    Spearheaded several quality initiatives including efforts to improve test infrastructure, code quality,
                    code coverage, and reporting
                  </li>
                </ul>
              </Experience>
              <Experience name="Microsoft" title="Software Engineer" location="Redmond WA" dates={['Apr/2015', 'Oct/2016']}>
                <ul>
                  <li>
                    Main contributor and engineer for software deployed by The Garage at Microsoft. Delivered REST/GUI based 
                    applications, administered the databases that these systems ran on, and the cloud deployments for these applications.
                  </li>
                  <li>
                    Worked in the cloud to deploy and administer services. Managed deployments, configurations, scaling, and implemented 
                    telemetry for monitoring. Enabled projects for continuous deployment, developed and integrating applications with services. 
                    Configured and deployed apps, databases, and servers, web jobs, blob storage, and active directory authentication
                  </li>
                  <li>
                    Worked on a small, high visibility team to build rich experiences quickly for a broad audience. Led multiple 
                    teams building core components for the Garage’s family of applications. 
                  </li>
                </ul>
              </Experience>
              <Experience name="Clutch" title="Software Engineer" location="Seattle WA" dates={['Sep/2014', 'Apr/2015']}>
                <ul>
                  <li>
                    Full stack web and mobile developer. Core contributor and engineer for application releases, proof of
                    concept prototypes, and customer facing tools and services. Managed and deployed applications to AWS, 
                    Heroku, and iTunes.
                  </li>
                  <li>
                    Developed frontend, backend, and algorithmic solutions for demoes and proofs of concept built on iOS 
                    and Android
                  </li>
                  <li>
                    Engineered applications to interact with Low Energy Blutooth beacons, collect and manage their data, 
                    and provide access and insights
                  </li>
                  <li>
                    Administered internal applications, IT systems, and networking
                  </li>
                </ul>
              </Experience>
              <Experience name="Cisco" title="Project Manager" location="San Jose CA" dates={['Feb/2012', 'Sep/2014']}>
                <ul>
                  <li>
                    Project manager in an agile/scrum environment for teams building network analytics tools
                  </li>
                </ul>
              </Experience>
            </div>
            <div id="resume-education">
              <div style={{"fontSize":"2em","fontWeight":"bold"}}>Education</div>
              <div>UC Santa Cruz</div>
              <div>Bachelors of Arts Computational Mathematics, 2012</div>
            </div>
          </div>
        </div>
        <div id="resume-sidebar">
            <Controls showCLI={props.showCLI}></Controls>
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
