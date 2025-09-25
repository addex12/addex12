import React from 'react';

const Stats = ({ stats }) => (
  <section id="stats" className="portfolio-section">
    <h3>Stats</h3>
    <div className="stats-list">
      <div className="stat-card"><b>GitHub Stars</b><div className="stat-num">{stats.github}+</div></div>
      <div className="stat-card"><b>Projects</b><div className="stat-num">{stats.projects}</div></div>
      <div className="stat-card"><b>Certificates</b><div className="stat-num">{stats.certificates}</div></div>
      <div className="stat-card"><b>Blog Posts</b><div className="stat-num">{stats.blogPosts}</div></div>
    </div>
  </section>
);

export default Stats;
