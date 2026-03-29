import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder & Lead Developer</h4>
                <h5>whatin.in</h5>
              </div>
              <h3>2024 - NOW</h3>
            </div>
            <p>
              Developed a comprehensive resource platform for AKTU students.
              Managed the full lifecycle from UI/UX to backend. Ensured 99.9%
              uptime on Hostinger with full mobile responsiveness.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Workflow Automation Analyst</h4>
                <h5>Self-Led Projects</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Optimized automated workflows using N8N. Managed version control
              via Git/GitHub. Deployed high-performance web apps on Netlify
              and Vercel.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech (Computer Science & Eng.)</h4>
                <h5>GL BAJAJ MATHURA</h5>
              </div>
              <h3>2024 - 2028</h3>
            </div>
            <p>
              Currently pursuing B.Tech with a focus on DSA in Java, Advanced
              Automation, and scaling the Whatin.in platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
