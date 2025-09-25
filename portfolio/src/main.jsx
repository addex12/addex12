import React, { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

function Root() {
  const [resetKey, setResetKey] = useState(0)
  return (
    <StrictMode>
      <ErrorBoundary
        onReset={() => setResetKey(k => k + 1)}
        onError={(err) => console.log('[Root boundary] error:', err)}
      >
        <App key={resetKey} />
      </ErrorBoundary>
    </StrictMode>
  )
}

const el = document.getElementById('root')
if (!el) {
  console.error('#root not found')
} else {
  createRoot(el).render(<Root />)
}



