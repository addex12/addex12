import React from 'react';

const Projects = ({ projects, filter, setFilter }) => {
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);
  return (
    <section id="projects" className="portfolio-section">
      <h3>Featured Projects</h3>
      <div className="project-filters">
        {categories.map(cat => (
          <button key={cat} className={filter === cat ? 'active' : ''} onClick={() => setFilter(cat)}>{cat}</button>
        ))}
      </div>
      <div className="projects-grid">
        {filtered.map((p, i) => (
          <div className="project-card" key={i}>
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
