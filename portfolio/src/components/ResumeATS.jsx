import React, { useMemo } from 'react'
import {
  PROFILE,
  WORK_EXPERIENCE,
  CERTIFICATIONS,
  EDUCATION as EDUCATION_DATA,
  LANGUAGES_LIST,
  STATS
} from '../data/profileData'

export default function ResumeATS({ collapsed }) {
  const safeArr = (v) => Array.isArray(v) ? v : []
  const profile = PROFILE || {}
  const experience = safeArr(WORK_EXPERIENCE)
  const certs = safeArr(CERTIFICATIONS).slice(0, 12)
  const education = safeArr(EDUCATION_DATA)
  const langs = safeArr(LANGUAGES_LIST)
  const stats = STATS || {}

  const plainText = useMemo(() => {
    return [
      `Name: ${profile.name || ''}`,
      `Title: ${profile.title || ''}`,
      '',
      'SUMMARY',
      (profile.summary || '').replace(/\s+/g, ' ').trim(),
      '',
      'CORE SKILLS',
      (profile.coreSkills || []).join('; '),
      '',
      'EXPERIENCE',
      ...experience.map(e => [
        `${e.title} – ${e.org}`,
        ...(e.bullets || []).map(b => `- ${b}`)
      ].join('\n')),
      '',
      'CERTIFICATIONS',
      certs.map(c => c.name || c.title).join('; '),
      '',
      'EDUCATION',
      education.map(e => `${e.degree} – ${e.school}`).join('\n'),
      '',
      'LANGUAGES',
      langs.map(l => `${l.name} (${l.level})`).join('; '),
      '',
      'IMPACT',
      `Productivity ${stats.productivity || '98%'} | Cost Reduction ${stats.cost || '92%'} | Assets ${stats.assets || '92%'}`,
      '',
      'CONTACT',
      `Email: ${profile.email || ''}`,
      `LinkedIn: ${(profile.links && profile.links.linkedin) || ''}`,
      `GitHub: https://github.com/addex12`,
      `Location: Addis Ababa, Ethiopia`
    ].join('\n')
  }, [profile, experience, certs, education, langs, stats])

  return (
    <div style={{ display: collapsed ? 'none' : 'block' }}>
      <h4 style={{ margin: '0 0 .75rem' }}>ATS-Friendly Resume Preview</h4>
      <div style={box}>
        <div style={gridTwo}>
          <div>
            <h5 style={h5}>{profile.name}</h5>
            <p style={muted}>{profile.title}</p>
            <p style={p}>{profile.summary}</p>
          </div>
          <div>
            <h6 style={h6}>Core Skills</h6>
            <ul style={list}>
              {(profile.coreSkills || []).slice(0, 14).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>

        <h6 style={h6}>Experience</h6>
        {experience.map((e, i) => (
          <div key={i} style={{ marginBottom: '.85rem' }}>
            <strong>{e.title}</strong> – {e.org}
            <ul style={bulletList}>
              {(e.bullets || []).slice(0, 6).map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        ))}

        <h6 style={h6}>Certifications (Selected)</h6>
        <p style={p}>{certs.map(c => c.name || c.title).join(' • ')}</p>

        <h6 style={h6}>Education</h6>
        <ul style={list}>
          {education.map((e, i) => <li key={i}>{e.degree} – {e.school}</li>)}
        </ul>

        <h6 style={h6}>Languages</h6>
        <p style={p}>{langs.map(l => `${l.name} (${l.level})`).join(' • ')}</p>

        <h6 style={h6}>Contact</h6>
        <p style={p}>
          Email: {profile.email} | GitHub: addex12 | LinkedIn: {(profile.links && profile.links.linkedin) || ''}
        </p>
      </div>

      <textarea
        readOnly
        value={plainText}
        style={textarea}
        aria-label="Plain text resume for ATS"
      />
    </div>
  )
}

const box = {
  background: 'rgba(255,255,255,.04)',
  border: '1px solid rgba(255,255,255,.15)',
  padding: '1rem 1.1rem 1.2rem',
  borderRadius: '.85rem',
  marginBottom: '1.25rem'
}
const gridTwo = { display: 'grid', gap: '1.25rem', gridTemplateColumns: 'minmax(0,1fr) 260px' }
const h5 = { margin: 0, fontSize: '1.05rem' }
const h6 = { margin: '1.2rem 0 .35rem', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.8px', opacity: .75 }
const p = { margin: '.35rem 0', fontSize: '.72rem', lineHeight: 1.4 }
const muted = { ...p, opacity: .75, marginTop: '.25rem' }
const list = { margin: 0, padding: '0 0 0 1rem', columns: 2, fontSize: '.68rem', lineHeight: 1.35 }
const bulletList = { margin: '.25rem 0 0', padding: '0 0 0 1.05rem', fontSize: '.65rem', lineHeight: 1.35 }
const textarea = {
  width: '100%',
  minHeight: '240px',
  background: 'rgba(0,0,0,.35)',
  border: '1px solid rgba(255,255,255,.2)',
  color: 'inherit',
  fontFamily: 'ui-monospace, monospace',
  fontSize: '.65rem',
  padding: '.7rem .8rem',
  borderRadius: '.6rem'
}
