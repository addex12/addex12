import React from 'react';

const Languages = ({ languages }) => (
  <section id="languages" className="portfolio-section">
    <h3>Languages</h3>
    <ul className="languages-list">
      {languages.map((l, i) => (
        <li key={i}>{l.name} <span className="lang-level">({l.level})</span></li>
      ))}
    </ul>
  </section>
);

export default Languages;
