import React from 'react';

const Blog = ({ blogs }) => (
  <section id="blog" className="portfolio-section">
    <h3>Blog & News</h3>
    <div className="blog-list">
      {blogs.map((b, i) => (
        <div className="blog-card" key={i}>
          <h4>{b.title}</h4>
          <span className="blog-date">{b.date}</span>
          <p>{b.summary}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Blog;
