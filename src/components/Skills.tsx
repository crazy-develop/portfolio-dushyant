import "./styles/Skills.css";

const Skills = () => {
  return (
    <div className="career-section section-container skills-reverse" id="skills">
      <div className="career-container">
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Development</h4>
                <h5>Frontend & Logic</h5>
              </div>
              <h3>01</h3>
            </div>
            <p>
              HTML5, CSS, JavaScript, React, Three.js, C Programming. 
              Focusing on responsive design and interactive user interfaces.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Automation</h4>
                <h5>Workflow Optimization</h5>
              </div>
              <h3>02</h3>
            </div>
            <p>
              N8N (Workflow Automation), API Integration, Webhooks. 
              Streamlining complex processes and integrating diverse web services.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hosting & DevOps</h4>
                <h5>Deployment & Cloud</h5>
              </div>
              <h3>03</h3>
            </div>
            <p>
              Hostinger, Vercel, Netlify, Fireconsole. 
              Managing modern deployment workflows and ensuring 99.9% uptime.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Tools & AI</h4>
                <h5>Efficiency & Design</h5>
              </div>
              <h3>04</h3>
            </div>
            <p>
              Git, GitHub, MS Office, Canva, Antigravity. 
              Proficient in version control, design tools, and AI-assisted development.
            </p>
          </div>

        </div>
        <h2 className="skills-title">
          Technical <span>&</span>
          <br /> Skills
        </h2>
      </div>
    </div>
  );
};

export default Skills;
