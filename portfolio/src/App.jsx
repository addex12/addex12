import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Languages from './components/Languages';
import Certifications from './components/Certifications';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import { useEffect, useState } from 'react';
import './App.css';
import { PROFILE, WORK_EXPERIENCE, EDUCATION, LANGUAGES_LIST, CERTIFICATES, SKILLS, OTHER_SKILLS, CERTIFICATIONS, TESTIMONIALS, PROJECTS, BLOGS, STATS, LANGUAGES } from './data/profileData';
import ScrollProgress from './components/ScrollProgress';


function App() {
  const [filter, setFilter] = useState('All');
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState('en');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme');
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');

    if (storedTheme) {
      setDark(storedTheme === 'dark');
    } else if (mediaQuery?.matches) {
      setDark(true);
    }

    const handleSystemTheme = (event) => {
      const hasStored = window.localStorage.getItem('portfolio-theme');
      if (!hasStored) {
        setDark(event.matches);
      }
    };

    mediaQuery?.addEventListener('change', handleSystemTheme);
    return () => mediaQuery?.removeEventListener('change', handleSystemTheme);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', dark);
    window.localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 420);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Smooth scroll
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered projects for project section
  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  return (
    <>
      <ScrollProgress />
      <div className={`portfolio-container${dark ? ' dark' : ''}`}>
        <header className="portfolio-header">
          <div className="header-row">
            <h1>{PROFILE.name}</h1>
            <div className="header-actions">
              <button className="dark-toggle" onClick={() => setDark(d => !d)} title="Toggle dark mode">{dark ? '🌙' : '☀️'}</button>
              <select className="lang-switch" value={lang} onChange={e => setLang(e.target.value)} title="Switch language">
                {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
              </select>
            </div>
          </div>
          <h2>{PROFILE.title}</h2>
          <p className="relocation-banner">🌍 Open to Relocate & Visa Sponsorship Worldwide</p>
          <nav>
            <a href="#about" onClick={e => {e.preventDefault(); scrollTo('about');}}>About</a>
            <a href="#workexp" onClick={e => {e.preventDefault(); scrollTo('workexp');}}>Experience</a>
            <a href="#education" onClick={e => {e.preventDefault(); scrollTo('education');}}>Education</a>
            <a href="#languages" onClick={e => {e.preventDefault(); scrollTo('languages');}}>Languages</a>
            <a href="#skills" onClick={e => {e.preventDefault(); scrollTo('skills');}}>Skills</a>
            <a href="#certs" onClick={e => {e.preventDefault(); scrollTo('certs');}}>Certifications</a>
            <a href="#stats" onClick={e => {e.preventDefault(); scrollTo('stats');}}>Stats</a>
            <a href="#projects" onClick={e => {e.preventDefault(); scrollTo('projects');}}>Projects</a>
            <a href="#testimonials" onClick={e => {e.preventDefault(); scrollTo('testimonials');}}>Testimonials</a>
            <a href="#blog" onClick={e => {e.preventDefault(); scrollTo('blog');}}>Blog</a>
          </nav>
          <div className="social-icons">
            <a href={PROFILE.links.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" height="28"/></a>
            <a href="https://github.com/addex12" target="_blank" rel="noopener noreferrer" title="GitHub"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" height="28"/></a>
          </div>
        </header>

        {/* Component-driven sections (authoritative) */}
        <About profile={PROFILE} />
        <Experience experience={WORK_EXPERIENCE} />
        <Education education={EDUCATION} />
        <Languages languages={LANGUAGES_LIST} />
        <Skills skills={SKILLS} otherSkills={OTHER_SKILLS} />
        <Certifications certifications={CERTIFICATIONS} certificates={CERTIFICATES} />
        <Stats stats={STATS} />
        <Projects projects={PROJECTS} filter={filter} setFilter={setFilter} />
        <Testimonials testimonials={TESTIMONIALS} />
        <Blog blogs={BLOGS} />

        {/* Keep unique sections (Resume & Contact) */}
        <section id="resume" className="portfolio-section">
          <h3>Resume</h3>
          <p>
            <a className="resume-btn" href="/resume.pdf" download>Download Resume (PDF)</a> or connect on <a href="https://linkedin.com/in/eleganceict" target="_blank" rel="noopener noreferrer">LinkedIn</a> for more details.
          </p>
        </section>

        <section id="contact" className="portfolio-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: <span className="copy-email" onClick={() => {navigator.clipboard.writeText('adugna.gizaw@flipperschools.com');}} title="Copy email">adugna.gizaw@flipperschools.com 📋</span></li>
            <li>Email: <span className="copy-email" onClick={() => {navigator.clipboard.writeText('gizawadugna@gmail.com');}} title="Copy email">gizawadugna@gmail.com 📋</span></li>
            <li>Location: Addis Ababa, Ethiopia</li>
            <li>LinkedIn: <a href="https://linkedin.com/in/eleganceict" target="_blank" rel="noopener noreferrer">linkedin.com/in/eleganceict</a></li>
            <li>GitHub: <a href="https://github.com/addex12" target="_blank" rel="noopener noreferrer">github.com/addex12</a></li>
          </ul>
          <p><a className="resume-btn" href="mailto:adugna.gizaw@flipperschools.com?subject=Contact%20from%20Portfolio">Contact Me by Email</a></p>
        </section>

        <footer className="portfolio-footer">
          <p>⭐ Open to international opportunities, relocation, and visa sponsorship. Let’s build something amazing together! 🚀</p>
        </footer>
      </div>
      {showTop && (
        <button
          type="button"
          className="back-to-top"
          onClick={handleScrollTop}
          aria-label="Scroll back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}

export default App;
          <h3>Work Experience</h3>
          <div className="workexp-list">
            {WORK_EXPERIENCE.map((job, i) => (
              <div className="workexp-card" key={i}>
                <h4>{job.title}</h4>
                <span className="workexp-org">{job.org} | {job.location}</span>
                <span className="workexp-period">{job.period}</span>
                <ul>
                  {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="portfolio-section">
          <h3>Education</h3>
          <ul className="education-list">
            {EDUCATION.map((ed, i) => (
              <li key={i}><b>{ed.school}</b> — {ed.degree} <span className="ed-period">({ed.period})</span></li>
            ))}
          </ul>
        </section>

        <section id="languages" className="portfolio-section">
          <h3>Languages</h3>
          <ul className="languages-list">
            {LANGUAGES_LIST.map((l, i) => (
              <li key={i}>{l.name} <span className="lang-level">({l.level})</span></li>
            ))}
          </ul>
        </section>
        <section id="certs" className="portfolio-section">
          <h3>Certifications</h3>
          <div className="certs-grid">
            {CERTIFICATIONS.map((cert, index) => (
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
            {CERTIFICATES.map((cert, i) => <li key={i}>{cert}</li>)}
          </ul>
        </section>
        <section id="stats" className="portfolio-section">
          <h3>Stats</h3>
          <div className="stats-list">
            <div className="stat-card"><b>GitHub Stars</b><div className="stat-num">{STATS.github}+</div></div>
            <div className="stat-card"><b>Projects</b><div className="stat-num">{STATS.projects}</div></div>
            <div className="stat-card"><b>Certificates</b><div className="stat-num">{STATS.certificates}</div></div>
            <div className="stat-card"><b>Blog Posts</b><div className="stat-num">{STATS.blogPosts}</div></div>
          </div>
        </section>
        <section id="blog" className="portfolio-section">
          <h3>Blog & News</h3>
          <div className="blog-list">
            {BLOGS.map((b, i) => (
              <div className="blog-card" key={i}>
                <h4>{b.title}</h4>
                <span className="blog-date">{b.date}</span>
                <p>{b.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="portfolio-section">
          <h3>Featured Projects</h3>
          <div className="project-filters">
            <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
            <button className={filter === 'ERP' ? 'active' : ''} onClick={() => setFilter('ERP')}>ERP</button>
            <button className={filter === 'CRM' ? 'active' : ''} onClick={() => setFilter('CRM')}>CRM</button>
            <button className={filter === 'AI' ? 'active' : ''} onClick={() => setFilter('AI')}>AI</button>
            <button className={filter === 'Innovation' ? 'active' : ''} onClick={() => setFilter('Innovation')}>Innovation</button>
          </div>
          <div className="projects-grid">
            {filteredProjects.map((p, i) => (
              <div className="project-card" key={i}>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="portfolio-section">
          <h3>Tech Stack & Skills</h3>
          <div className="skills-list">
            {SKILLS.map((skill, i) => (
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

        <section id="testimonials" className="portfolio-section">
          <h3>Testimonials</h3>
          <div className="testimonials-list">
            {TESTIMONIALS.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <p>"{t.text}"</p>
                <span>- {t.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="resume" className="portfolio-section">
          <h3>Resume</h3>
          <p>
            <a className="resume-btn" href="/resume.pdf" download>Download Resume (PDF)</a> or connect on <a href="https://linkedin.com/in/eleganceict" target="_blank" rel="noopener noreferrer">LinkedIn</a> for more details.
          </p>
        </section>

        <section id="contact" className="portfolio-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: <span className="copy-email" onClick={() => {navigator.clipboard.writeText('adugna.gizaw@flipperschools.com');}} title="Copy email">adugna.gizaw@flipperschools.com 📋</span></li>
            <li>Email: <span className="copy-email" onClick={() => {navigator.clipboard.writeText('gizawadugna@gmail.com');}} title="Copy email">gizawadugna@gmail.com 📋</span></li>
            <li>Location: Addis Ababa, Ethiopia</li>
            <li>LinkedIn: <a href="https://linkedin.com/in/eleganceict" target="_blank" rel="noopener noreferrer">linkedin.com/in/eleganceict</a></li>
            <li>GitHub: <a href="https://github.com/addex12" target="_blank" rel="noopener noreferrer">github.com/addex12</a></li>
          </ul>
          <p><a className="resume-btn" href="mailto:adugna.gizaw@flipperschools.com?subject=Contact%20from%20Portfolio">Contact Me by Email</a></p>
        </section>

        <footer className="portfolio-footer">
          <p>⭐ Open to international opportunities, relocation, and visa sponsorship. Let’s build something amazing together! 🚀</p>
        </footer>
      </div>
      {showTop && (
        <button
          type="button"
          className="back-to-top"
          onClick={handleScrollTop}
          aria-label="Scroll back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}

const pillStyle = {
  background: 'rgba(255,255,255,.08)',
  padding: '.45rem .75rem',
  borderRadius: '999px',
  fontSize: '.75rem',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255,255,255,.12)'
}

const inputStyle = {
  width: '100%',
  padding: '.65rem .8rem',
  borderRadius: '.6rem',
  border: '1px solid rgba(255,255,255,.25)',
  background: 'rgba(255,255,255,.07)',
  color: 'inherit'
}

const cardStyle = {
  background: 'linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.03))',
  padding: '.8rem 1rem',
  borderRadius: '.75rem',
  border: '1px solid rgba(255,255,255,.15)'
}

const impactStyle = {
  background: 'rgba(255,255,255,.07)',
  padding: '.9rem .85rem',
  borderRadius: '.8rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '.25rem',
  border: '1px solid rgba(255,255,255,.15)',
  textAlign: 'left'
}

export default App;
