import React from 'react';

const Skills = ({ skills }) => (
  <section id="skills" className="portfolio-section">
    <h3>Tech Stack & Skills</h3>
    <div className="skills-list">
      {skills.map((skill, i) => (
        <div className="skill-bar" key={i}>
          <span>{skill.name}</span>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: skill.level + '%' }}>
              <span className="bar-label">{skill.level}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
