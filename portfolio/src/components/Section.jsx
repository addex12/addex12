import React, { useState } from 'react'

export function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section style={{ marginBottom: '2rem' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={btnStyle}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span style={{ transition: '.25s', transform: `rotate(${open ? 90 : 0}deg)` }}>›</span>
      </button>
      <div
        style={{
          maxHeight: open ? '1500px' : '0px',
          overflow: 'hidden',
          transition: 'max-height .45s cubic-bezier(.75,0,.25,1)'
        }}
      >
        {open && <div style={{ paddingTop: '.9rem' }}>{children}</div>}
      </div>
    </section>
  )
}

const btnStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(255,255,255,.09)',
  backdropFilter: 'blur(6px)',
  color: 'inherit',
  border: '1px solid rgba(255,255,255,.2)',
  borderRadius: '.85rem',
  padding: '.85rem 1rem',
  fontSize: '.9rem',
  cursor: 'pointer',
  fontWeight: 600,
  letterSpacing: '.5px'
}
