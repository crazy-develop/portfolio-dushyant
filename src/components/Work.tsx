import { useEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    let ctx = gsap.context(() => {
      let translateX: number = 0;

      function setTranslateX() {
        const box = document.getElementsByClassName("work-box");
        const rectLeft = document
          .querySelector(".work-container")!
          .getBoundingClientRect().left;
        const rect = box[0].getBoundingClientRect();
        const parentWidth =
          box[0].parentElement!.getBoundingClientRect().width;
        let padding: number =
          parseInt(window.getComputedStyle(box[0]).padding) / 2;
        translateX =
          rect.width * box.length - (rectLeft + parentWidth) + padding;
      }

      setTranslateX();

      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`, // Use actual scroll width
          scrub: true,
          pin: true,
          id: "work",
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>

                <div>
                  <h4>whatin.in</h4>
                  <p>Educational Platform</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Hostinger, UI/UX, Backend Resource Management</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="whatin.in" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>

                <div>
                  <h4>Workflow Automation</h4>
                  <p>Automation & Integration</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>N8N, API Integration, Webhooks</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Automation Projects" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>

                <div>
                  <h4>Mini Projects</h4>
                  <p>Web Applications</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>JavaScript, React, Vercel/Netlify</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Mini Projects" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
