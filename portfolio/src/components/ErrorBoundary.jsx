import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // Log for debugging
    console.error('[ErrorBoundary] Caught error:', error, info);
    this.setState({ info });
    // Hook for external logging (Sentry, etc.)
    if (this.props.onError) {
      try { this.props.onError(error, info); } catch {}
    }
  }
  handleReset = () => {
    this.setState({ hasError: false, error: null, info: null }, () => {
      if (this.props.onReset) this.props.onReset();
    });
  };
  copyDetails = () => {
    const { error, info } = this.state;
    const payload = [
      '--- Error Boundary Report ---',
      'Message: ' + (error?.message || String(error)),
      'Stack:\n' + (error?.stack || 'n/a'),
      'Component Stack:\n' + (info?.componentStack || 'n/a')
    ].join('\n\n');
    navigator.clipboard.writeText(payload).catch(() => {});
  };
  render() {
    if (this.state.hasError) {
      const { error, info } = this.state;
      return (
        <div style={fallbackStyle}>
          <h2 style={{ marginTop: 0 }}>Something went wrong.</h2>
          <p style={{ opacity: .75, fontSize: '.85rem' }}>
            The interface failed to render. You can try resetting the view below.
          </p>
          <details style={detailsStyle}>
            <summary style={summaryStyle}>Error Details</summary>
            <pre style={preStyle}>{error?.message || String(error)}</pre>
            {error?.stack && (
              <pre style={preStyle}>{error.stack}</pre>
            )}
            {info?.componentStack && (
              <pre style={preStyle}>{info.componentStack}</pre>
            )}
          </details>
          <div style={{ display: 'flex', gap: '.65rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <button style={btnPrimary} onClick={this.handleReset}>Reset View</button>
            <button style={btnOutline} onClick={this.copyDetails}>Copy Details</button>
            <button style={btnOutline} onClick={() => window.location.reload()}>Full Reload</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const fallbackStyle = {
  maxWidth: 720,
  margin: '4rem auto',
  padding: '2rem 1.75rem',
  background: 'rgba(255,255,255,.05)',
  border: '1px solid rgba(255,255,255,.15)',
  borderRadius: '1rem',
  fontFamily: 'system-ui, sans-serif'
};
const preStyle = {
  background: 'rgba(0,0,0,.45)',
  padding: '.8rem 1rem',
  borderRadius: '.6rem',
  fontSize: '.7rem',
  lineHeight: 1.3,
  whiteSpace: 'pre-wrap',
  overflow: 'auto',
  maxHeight: 260
};
const detailsStyle = { background: 'rgba(255,255,255,.04)', padding: '.75rem 1rem', borderRadius: '.75rem' };
const summaryStyle = { cursor: 'pointer', fontSize: '.8rem', marginBottom: '.6rem', fontWeight: 600 };
const btnPrimary = {
  background: 'linear-gradient(135deg,#3aa9ff,#1274d8)',
  color: '#fff',
  padding: '.6rem 1rem',
  border: 'none',
  borderRadius: '.65rem',
  fontSize: '.75rem',
  cursor: 'pointer'
};
const btnOutline = {
  background: 'rgba(255,255,255,.08)',
  border: '1px solid rgba(255,255,255,.25)',
  color: 'inherit',
  padding: '.6rem 1rem',
  borderRadius: '.65rem',
  fontSize: '.75rem',
  cursor: 'pointer'
};
