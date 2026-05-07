import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdminLoggedIn  = !!localStorage.getItem('adminToken');
  const isStudentLoggedIn = !!localStorage.getItem('studentToken');
  const isLoggedIn = isAdminLoggedIn || isStudentLoggedIn;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('studentToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('studentName');
    window.location.href = '/';
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
      background: 'rgba(11,28,61,0.97)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(201,169,110,0.25)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.75rem 2.5rem', boxSizing: 'border-box'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#c9a96e" opacity="0.15"/>
          <line x1="18" y1="6" x2="18" y2="30" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="8" y1="12" x2="28" y2="12" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 12 L5 19 Q8 21 11 19 Z" fill="none" stroke="#c9a96e" strokeWidth="1.2"/>
          <path d="M28 12 L25 19 Q28 21 31 19 Z" fill="none" stroke="#c9a96e" strokeWidth="1.2"/>
          <path d="M14 30 H22" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span style={{
          fontSize: '1.6rem', fontWeight: '700', color: '#c9a96e',
          letterSpacing: '2px', fontFamily: 'Georgia, serif'
        }}>MIZAN</span>
      </Link>

      <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: '#c9a96e', fontSize: '1.8rem', cursor: 'pointer' }} className="navbar-toggler">
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '0.95rem', transition: '0.3s', letterSpacing: '0.5px' }}>Home</Link>
        <Link to="/books" style={linkStyle}>Books</Link>
        <Link to="/categories" style={linkStyle}>Categories</Link>

        {isLoggedIn ? (
          <button onClick={handleLogout} style={btnStyle}>Logout</button>
        ) : (
          <Link to="/login" style={btnStyle}>Login</Link>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .navbar-toggler { display: block !important; }
          .navbar-menu {
            position: fixed; top: 60px; left: -100%; width: 70%;
            max-width: 280px; height: calc(100vh - 60px);
            background: rgba(11,28,61,0.98); backdrop-filter: blur(12px);
            flex-direction: column !important; align-items: flex-start !important;
            padding: 2rem 1.5rem; gap: 1.5rem !important;
            border-right: 1px solid #c9a96e; transition: left 0.3s ease; z-index: 999;
          }
          .navbar-menu.active { left: 0 !important; }
        }
      `}</style>
    </nav>
  );
}

const linkStyle = {
  color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
  fontSize: '0.95rem', transition: '0.3s', letterSpacing: '0.5px'
};

const btnStyle = {
  background: 'transparent', border: '1px solid #c9a96e',
  padding: '0.4rem 1.4rem', borderRadius: '2rem', color: '#c9a96e',
  textDecoration: 'none', fontSize: '0.9rem', cursor: 'pointer',
  transition: '0.3s', letterSpacing: '0.5px'
};