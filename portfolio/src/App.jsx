import Education from './components/Education';
import Languages from './components/Languages';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import { useEffect, useState, useMemo } from 'react';
import './App.css';
import {
  PROFILE,
  WORK_EXPERIENCE,
  EDUCATION as EDUCATION_DATA,
  LANGUAGES_LIST,
  CERTIFICATES,
  SKILLS,
  OTHER_SKILLS,
  CERTIFICATIONS,
  TESTIMONIALS,
  PROJECTS,
  BLOGS,
  STATS,
  LANGUAGES
} from './data/profileData';
import ScrollProgress from './components/ScrollProgress';


function App() {
  const [filter, setFilter] = useState('All');
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState('en');
  const [showTop, setShowTop] = useState(false);

  // NEW state for revamped sections
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [expFilter, setExpFilter] = useState('');
  const [expOpenAll, setExpOpenAll] = useState(false);
  const [skillCategory, setSkillCategory] = useState('technical'); // technical | other
  const [skillSearch, setSkillSearch] = useState('');

  // Theme initialization
  useEffect(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme');
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');

    if (storedTheme) {
      setDark(storedTheme === 'dark');
    } else if (mediaQuery?.matches) {
      setDark(true);
    }

    const handleSystemTheme = (e) => {
      const hasStored = window.localStorage.getItem('portfolio-theme');
      if (!hasStored) {
        setDark(e.matches);
      }
    };

    mediaQuery?.addEventListener('change', handleSystemTheme);
    return () => mediaQuery?.removeEventListener('change', handleSystemTheme);
  }, []);

  // Apply theme class
  useEffect(() => {
    document.body.classList.toggle('dark-theme', dark);
    window.localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Scroll top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 420);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // SAFE GUARDS
  const safe = (v, def = []) => Array.isArray(v) ? v : def
  const safeObj = (v, def = {}) => (v && typeof v === 'object') ? v : def

  const profileSafe = safeObj(PROFILE)
  const links = safeObj(profileSafe.links)
  const summary = profileSafe.summary || ''
  const coreSkills = safe(profileSafe.coreSkills)
  const workExp = safe(WORK_EXPERIENCE)
  const eduData = safe(EDUCATION_DATA)
  const langList = safe(LANGUAGES_LIST)
  const certs = safe(CERTIFICATIONS)
  const certNames = safe(CERTIFICATES)
  const testimonials = safe(TESTIMONIALS)
  const projects = safe(PROJECTS)
  const blogs = safe(BLOGS)
  const statsSafe = safeObj(STATS)
  const skillsTech = safe(SKILLS)
  const skillsOther = safe(OTHER_SKILLS)

  // Derived Experience list
  const filteredExperience = useMemo(() => {
    if (!expFilter.trim()) return workExp;
    const q = expFilter.toLowerCase();
    return workExp.filter(j =>
      [j.title, j.org, j.location, ...(j.bullets || [])].some(v => v?.toLowerCase().includes(q))
    );
  }, [expFilter, workExp]);

  // Derived Skills
  const technicalSkills = useMemo(
    () => skillsTech.filter(s => s.name?.toLowerCase().includes(skillSearch.toLowerCase())),
    [skillSearch, skillsTech]
  );
  const otherSkills = useMemo(
    () => skillsOther.filter(
      s => typeof s === 'string' && s.toLowerCase().includes(skillSearch.toLowerCase())
    ),
    [skillSearch, skillsOther]
  );
  const normalizedOtherSkills = useMemo(
    () => otherSkills.map(s => (typeof s === 'string' ? s : (s?.name || 'Unknown'))),
    [otherSkills]
  );

  // Safe fallbacks
  const certificateCount = (statsSafe && statsSafe.certificates) ? statsSafe.certificates : coreSkills.length || '—';

  return (
    <>
      <ScrollProgress />
      <div className={`portfolio-container${dark ? ' dark' : ''}`}>
        <header className="portfolio-header">
          <div className="header-row">
            <h1>{profileSafe.name}</h1>
            <div className="header-actions">
              <button className="dark-toggle" onClick={() => setDark(d => !d)} title="Toggle dark mode">{dark ? '🌙' : '☀️'}</button>
              <select className="lang-switch" value={lang} onChange={e => setLang(e.target.value)} title="Switch language">
                {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
              </select>
            </div>
          </div>
            <h2>{profileSafe.title}</h2>
          <p className="relocation-banner">🌍 Open to Relocate & Visa Sponsorship Worldwide</p>
          <nav>
            <a href="#about" onClick={e => { e.preventDefault(); scrollTo('about'); }}>About</a>
            <a href="#workexp" onClick={e => { e.preventDefault(); scrollTo('workexp'); }}>Experience</a>
            <a href="#education" onClick={e => { e.preventDefault(); scrollTo('education'); }}>Education</a>
            <a href="#languages" onClick={e => { e.preventDefault(); scrollTo('languages'); }}>Languages</a>
            <a href="#skills" onClick={e => { e.preventDefault(); scrollTo('skills'); }}>Skills</a>
            <a href="#certs" onClick={e => { e.preventDefault(); scrollTo('certs'); }}>Certifications</a>
            <a href="#stats" onClick={e => { e.preventDefault(); scrollTo('stats'); }}>Stats</a>
            <a href="#projects" onClick={e => { e.preventDefault(); scrollTo('projects'); }}>Projects</a>
            <a href="#testimonials" onClick={e => { e.preventDefault(); scrollTo('testimonials'); }}>Testimonials</a>
            <a href="#blog" onClick={e => { e.preventDefault(); scrollTo('blog'); }}>Blog</a>
            <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
          </nav>
          <div className="social-icons">
            {links.linkedin && (
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" height="28" />
              </a>
            )}
            <a href="https://github.com/addex12" target="_blank" rel="noopener noreferrer" title="GitHub">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" height="28" />
            </a>
          </div>
        </header>

        {/* ===== Revamped About Section ===== */}
        <section id="about" style={sectionStyle}>
          <header style={sectionHeader}>
            <h3 style={sectionTitle}>About Me</h3>
            <button style={ghostBtn} onClick={() => setAboutExpanded(a => !a)} aria-expanded={aboutExpanded}>
              {aboutExpanded ? 'Show Less' : 'Read More'}
            </button>
          </header>
          <div style={aboutGrid}>
            <div style={aboutMain}>
              <p style={{ marginTop: 0 }}>
                {summary.slice(0, aboutExpanded ? summary.length : 230)}
                {summary.length > 230 && !aboutExpanded && '...'}
              </p>
              {aboutExpanded && (
                <ul style={inlineList}>
                  {coreSkills.slice(0, 8).map((s, i) => (
                    <li key={i} style={pill}>{s}</li>
                  ))}
                </ul>
              )}
              <div style={{ marginTop: '1rem', display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                {links.website && <a href={links.website} target="_blank" rel="noopener" style={primaryBtn}>Portfolio</a>}
                {links.linkedin && <a href={links.linkedin} target="_blank" rel="noopener" style={outlineBtn}>LinkedIn</a>}
                {links.credly && <a href={links.credly} target="_blank" rel="noopener" style={outlineBtn}>Credly</a>}
              </div>
            </div>
            <aside style={aboutAside}>
              <h4 style={{ margin: '0 0 .75rem' }}>Quick Snapshot</h4>
              <ul style={factList}>
                <li><b>Experience:</b> {profileSafe.years || '9+'} yrs</li>
                <li><b>Focus:</b> IT Ops, Data, Transformation</li>
                <li><b>Location:</b> Addis Ababa (Global-ready)</li>
                <li><b>Open To:</b> Relocation / Sponsorship</li>
                <li><b>Certs:</b> {certificateCount}+</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* ===== Revamped Experience Section ===== */}
        <section id="workexp" style={sectionStyle}>
          <header style={sectionHeader}>
            <h3 style={sectionTitle}>Experience</h3>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              <input
                aria-label="Filter experience"
                placeholder="Filter (role, org, keyword)..."
                value={expFilter}
                onChange={e => setExpFilter(e.target.value)}
                style={input}
              />
              <button
                style={ghostBtn}
                onClick={() => setExpOpenAll(o => !o)}
              >
                {expOpenAll ? 'Collapse All' : 'Expand All'}
              </button>
            </div>
          </header>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredExperience.map((job, idx) => (
              <ExperienceAccordion
                key={idx}
                job={job}
                forceOpen={expOpenAll}
                index={idx}
              />
            ))}
            {!filteredExperience.length && (
              <em style={{ opacity: .6 }}>No matching roles.</em>
            )}
          </div>
        </section>

        {/* ===== Revamped Skills Section ===== */}
        <section id="skills" style={sectionStyle}>
          <header style={sectionHeader}>
            <h3 style={sectionTitle}>Core Skills</h3>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              <input
                aria-label="Search skills"
                placeholder="Search skills..."
                value={skillSearch}
                onChange={e => setSkillSearch(e.target.value)}
                style={input}
              />
              <div style={tabGroup}>
                <button
                  style={skillCategory === 'technical' ? tabActive : tab}
                  onClick={() => setSkillCategory('technical')}
                >Technical</button>
                <button
                  style={skillCategory === 'other' ? tabActive : tab}
                  onClick={() => setSkillCategory('other')}
                >Other</button>
              </div>
            </div>
          </header>

          {skillCategory === 'technical' && (
            <div style={{ display: 'grid', gap: '.85rem' }}>
              {technicalSkills.map((s, i) => (
                <SkillBar key={s.name + i} name={s.name} level={s.level} />
              ))}
              {!technicalSkills.length && <em style={{ opacity: .6 }}>No skills match.</em>}
            </div>
          )}

          {skillCategory === 'other' && (
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {normalizedOtherSkills.map((s, i) => (
                <span key={s + i} style={pill}>{s}</span>
              ))}
              {!normalizedOtherSkills.length && <em style={{ opacity: .6 }}>No skills match.</em>}
            </div>
          )}
        </section>

        {/* ===== Existing sections kept intact ===== */}
        <Education education={eduData} />
        <Languages languages={langList} />
        <Certifications certifications={certs} certificates={certNames} />
        <Stats stats={statsSafe} />
        <Projects projects={projects} filter={filter} setFilter={setFilter} />
        <Testimonials testimonials={testimonials} />
        <Blog blogs={blogs} />

        {/* Unique sections */}
        <section id="resume" className="portfolio-section">
          <h3>Resume</h3>
          <p>
            <a className="resume-btn" href="/resume.pdf" download>
              Download Resume (PDF)
            </a>{' '}
            or connect on{' '}
            <a href="https://linkedin.com/in/eleganceict" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>.
          </p>
        </section>

        <section id="contact" className="portfolio-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: <span className="copy-email" onClick={() => navigator.clipboard.writeText('adugna.gizaw@flipperschools.com')} title="Copy email">adugna.gizaw@flipperschools.com 📋</span></li>
            <li>Email: <span className="copy-email" onClick={() => navigator.clipboard.writeText('gizawadugna@gmail.com')} title="Copy email">gizawadugna@gmail.com 📋</span></li>
            <li>Location: Addis Ababa, Ethiopia</li>
            <li>LinkedIn: {links.linkedin ? <a href={links.linkedin} target="_blank" rel="noopener noreferrer">{links.linkedin.replace(/^https?:\/\//,'')}</a> : '—'}</li>
            <li>GitHub: <a href="https://github.com/addex12" target="_blank" rel="noopener noreferrer">github.com/addex12</a></li>
          </ul>
          <p>
            <a className="resume-btn" href="mailto:adugna.gizaw@flipperschools.com?subject=Contact%20from%20Portfolio">
              Contact Me
            </a>
          </p>
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

/* ===== Helper Components (inline for this revamp) ===== */
function ExperienceAccordion({ job, forceOpen, index }) {
  const [open, setOpen] = useState(false);
  const isOpen = forceOpen || open;
  return (
    <div style={expCard}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={isOpen}
        style={expHeader}
      >
        <div style={{ textAlign: 'left' }}>
          <strong>{job.title}</strong>
          <div style={{ fontSize: '.7rem', opacity: .75 }}>{job.org} • {job.location} • {job.period}</div>
        </div>
        <span style={{ transform: `rotate(${isOpen ? 90 : 0}deg)`, transition: '.3s' }}>›</span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? 500 : 0,
          overflow: 'hidden',
          transition: 'max-height .5s cubic-bezier(.7,0,.3,1)'
        }}
      >
        {isOpen && (
          <ul style={expList}>
            {job.bullets?.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}

function SkillBar({ name, level }) {
  return (
    <div style={skillRow}>
      <span style={{ flex: '0 0 160px', fontSize: '.8rem' }}>{name}</span>
      <div style={barOuter} aria-label={`${name} proficiency ${level}%`}>
        <div
          style={{
            ...barInner,
            width: level + '%'
          }}
        >
          <span style={barLabel}>{level}%</span>
        </div>
      </div>
    </div>
  );
}

/* ===== Inline Styles ===== */
const sectionStyle = { margin: '3rem 0', padding: '1.75rem 1.5rem', background: 'var(--section-bg, rgba(255,255,255,0.04))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.1rem', backdropFilter: 'blur(4px)' };
const sectionHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.1rem' };
const sectionTitle = { margin: 0, fontSize: '1.15rem', letterSpacing: '.5px' };
const ghostBtn = { background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)', color: 'inherit', padding: '.55rem .9rem', borderRadius: '.65rem', cursor: 'pointer', fontSize: '.7rem' };
const primaryBtn = { background: 'linear-gradient(135deg,#3aa9ff,#1274d8)', color: '#fff', padding: '.6rem 1rem', borderRadius: '.7rem', fontSize: '.7rem', textDecoration: 'none' };
const outlineBtn = { ...ghostBtn, textDecoration: 'none' };
const aboutGrid = { display: 'grid', gap: '2rem', gridTemplateColumns: 'minmax(0,1fr) 260px' };
const aboutMain = { minWidth: 0 };
const aboutAside = { background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', padding: '1rem 1rem 1.1rem', borderRadius: '.9rem', alignSelf: 'flex-start' };
const factList = { listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '.4rem', fontSize: '.75rem' };
const inlineList = { listStyle: 'none', margin: '1rem 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '.5rem' };
const pill = { background: 'rgba(255,255,255,.08)', padding: '.4rem .7rem', borderRadius: '999px', fontSize: '.62rem', letterSpacing: '.5px', border: '1px solid rgba(255,255,255,.15)' };
const input = { background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)', color: 'inherit', padding: '.55rem .8rem', borderRadius: '.6rem', fontSize: '.7rem', minWidth: '220px' };
const expCard = { border: '1px solid rgba(255,255,255,.15)', borderRadius: '.9rem', background: 'rgba(255,255,255,.04)' };
const expHeader = { width: '100%', background: 'none', border: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', padding: '.9rem 1rem', cursor: 'pointer', fontSize: '.8rem', textAlign: 'left' };
const expList = { margin: '0 0 1rem', padding: '0 1.35rem', fontSize: '.7rem', display: 'grid', gap: '.4rem', lineHeight: 1.4 };
const tabGroup = { display: 'flex', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.15)', borderRadius: '.7rem', overflow: 'hidden' };
const tab = { background: 'transparent', border: 'none', color: 'inherit', padding: '.55rem .9rem', fontSize: '.65rem', cursor: 'pointer' };
const tabActive = { ...tab, background: 'linear-gradient(135deg,#349bff,#185dbe)', fontWeight: 600 };
const skillRow = { display: 'flex', alignItems: 'center', gap: '.75rem' };
const barOuter = { flex: 1, background: 'rgba(255,255,255,.08)', height: '14px', borderRadius: '7px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,.12)' };
const barInner = { background: 'linear-gradient(90deg,#33b4ff,#1b74e4)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '4px', transition: 'width .9s cubic-bezier(.65,0,.35,1)' };
const barLabel = { fontSize: '9px', fontWeight: 600, letterSpacing: '.5px' };

export default App;
