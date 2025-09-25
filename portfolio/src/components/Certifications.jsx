import React from 'react';

const Certifications = ({ certifications, certificates }) => (
  <section id="certs" className="portfolio-section">
    <h3>Certifications</h3>
    <div className="certs-grid">
      {certifications.map((cert, index) => (
        <a
          key={cert.name + index}
          className="cert-badge"
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          title={`${cert.name} • ${cert.issuer} (${cert.year})`}
        >
          <img src={cert.logo} alt={cert.name} className="cert-badge__logo" />
          <span className="cert-badge__name">{cert.name}</span>
          <span className="cert-badge__meta">{cert.issuer} · {cert.year}</span>
        </a>
      ))}
    </div>
    <ul className="certificates-list">
      {certificates.map((cert, idx) => (
        <li key={idx}>{cert}</li>
      ))}
    </ul>
  </section>
);

export default Certifications;
