import React from 'react';

const Certifications = ({ certifications, certificates }) => (
  <section id="certs" className="portfolio-section">
    <h3>Certifications</h3>
    <div className="certs-list">
      {certifications.map((c, i) => (
        <span key={i} className="cert-badge"><img src={c.logo} alt={c.name} height="24" style={{verticalAlign:'middle'}}/> {c.name}</span>
      ))}
    </div>
    <ul className="certificates-list">
      {certificates.map((cert, i) => <li key={i}>{cert}</li>)}
    </ul>
  </section>
);

export default Certifications;
