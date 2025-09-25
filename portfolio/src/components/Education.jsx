import React from 'react';

const Education = ({ education }) => (
  <section id="education" className="portfolio-section">
    <h3>Education</h3>
    <ul className="education-list">
      {education.map((ed, i) => (
        <li key={i}><b>{ed.school}</b> — {ed.degree} <span className="ed-period">({ed.period})</span></li>
      ))}
    </ul>
  </section>
);

export default Education;
