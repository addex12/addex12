import React from 'react';

const Experience = ({ experience }) => (
  <section id="workexp" className="portfolio-section">
    <h3>Work Experience</h3>
    <div className="workexp-list">
      {experience.map((job, i) => (
        <div className="workexp-card" key={i}>
          <h4>{job.title}</h4>
          <span className="workexp-org">{job.org} | {job.location}</span>
          <span className="workexp-period">{job.period}</span>
          <ul>
            {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Experience;
