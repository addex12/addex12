import React from 'react';

const About = ({ profile }) => (
  <section id="about" className="portfolio-section">
    <h3>About Me</h3>
    <div className="profile-block">
      <div className="profile-main">
        <h2>{profile.name}</h2>
        <h4>{profile.title}</h4>
        <div className="profile-contact">
          <span>📧 <a href={`mailto:${profile.email}`}>{profile.email}</a></span> |
          <span>📞 {profile.phone}</span> |
          <span><a href={profile.links.website} target="_blank" rel="noopener noreferrer">Website</a></span> |
          <span><a href={profile.links.credly} target="_blank" rel="noopener noreferrer">Credly</a></span> |
          <span><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
        </div>
        <p className="profile-summary">{profile.summary}</p>
        <div className="profile-skills">
          <b>Core Skills:</b>
          <ul>
            {profile.coreSkills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default About;
