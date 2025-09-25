import React from 'react';

const Testimonials = ({ testimonials }) => (
  <section id="testimonials" className="portfolio-section">
    <h3>Testimonials</h3>
    <div className="testimonials-list">
      {testimonials.map((t, i) => (
        <div className="testimonial-card" key={i}>
          <p>"{t.text}"</p>
          <span>- {t.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
