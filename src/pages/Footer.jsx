import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: '#0b1c3d',
      borderTop: '1px solid rgba(201,169,110,0.2)',
      padding: '3rem 2.5rem 1.5rem',
      color: 'rgba(255,255,255,0.7)',
      fontFamily: 'Georgia, serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: '-50px', left: '-50px',
        width: '200px', height: '200px',
        background: 'radial-gradient(circle, rgba(201,169,110,0.15), transparent)',
        filter: 'blur(60px)'
      }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2.5rem', marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#c9a96e" opacity="0.15"/>
              <line x1="18" y1="6" x2="18" y2="30" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="8" y1="12" x2="28" y2="12" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M14 30 H22" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#c9a96e', letterSpacing: '2px' }}>MIZAN</span>
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.55)' }}>
            Your Legal Knowledge Journey.<br/>A digital library for law students and academics worldwide.
          </p>
        </div>

        <div>
          <h4 style={{ color: '#c9a96e', marginBottom: '1rem', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[{ to: '/', label: 'Home' }, { to: '/books', label: 'Books' }, { to: '/categories', label: 'Categories' }, { to: '/login', label: 'Login' }].map(link => (
              <Link key={link.to} to={link.to} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem', transition: '0.3s' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ color: '#c9a96e', marginBottom: '1rem', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Law Fields</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['Criminal Law', 'Civil Law', 'Constitutional Law', 'International Law', 'Commercial Law'].map(cat => (
              <span key={cat} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem' }}>{cat}</span>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ color: '#c9a96e', marginBottom: '1rem', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>About</h4>
          <p style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.55)' }}>
            Mizan is an academic legal library platform providing access to essential legal texts, references, and educational resources for law students.
          </p>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(201,169,110,0.15)', paddingTop: '1.2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', position: 'relative'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '1px', width: '100%',
          background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
          animation: 'lineMove 4s linear infinite'
        }} />
        <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>© {year} Mizan Legal Library. All rights reserved.</span>
        <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: '6px', transition: '0.3s' }}>
          ✉️ sarasamir9202@gmail.com
        </span>
      </div>

      <style>{`
        @keyframes lineMove { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </footer>
  );
}