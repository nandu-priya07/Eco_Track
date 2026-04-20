import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/search', label: 'Discover' },
  { to: '/gamification', label: 'Challenges' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isLight, setIsLight] = useState(() => localStorage.getItem('theme') === 'light');
  const dropRef = useRef(null);
  const totalItems = getTotalItems();

  useEffect(() => {
    document.body.className = isLight ? 'light-theme' : '';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }, [isLight]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setDropOpen(false);
    navigate('/');
  };

  return (
    <nav className="glass" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: '1px solid rgba(51,65,85,0.5)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <span style={{ fontSize: '1.8rem' }}>🌿</span>
            <span style={{ fontWeight: 800, fontSize: '1.4rem', color: '#10b981', letterSpacing: '-0.5px' }}>EcoTrack</span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to}
                style={{
                  textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem',
                  color: pathname === l.to ? '#10b981' : 'var(--color-text-muted)',
                  borderBottom: pathname === l.to ? '2px solid #10b981' : '2px solid transparent',
                  paddingBottom: '2px', transition: 'color 0.2s',
                }}
                onMouseEnter={e => { if (pathname !== l.to) e.currentTarget.style.color = 'var(--color-text-body)'; }}
                onMouseLeave={e => { if (pathname !== l.to) e.currentTarget.style.color = 'var(--color-text-muted)'; }}
              >
                {l.label}
              </Link>
            ))}
            {/* Cart Icon */}
            <Link
              to="/checkout"
              style={{
                position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, borderRadius: '0.5rem', textDecoration: 'none',
                background: 'rgba(16,185,129,0.1)', transition: 'all 0.2s', fontSize: '1.3rem',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(16,185,129,0.1)'}
            >
              🛒
              {cartCount > 0 && (
                <div style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  background: '#10b981', color: '#fff', width: 22, height: 22,
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800,
                  border: '2px solid var(--color-eco-bg)',
                }}>
                  {cartCount}
                </div>
              )}
            </Link>

            {/* 

            {/* Theme Toggle */}
            <button
              onClick={() => setIsLight(prev => !prev)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '1.2rem', color: isLight ? '#f59e0b' : '#94a3b8',
                padding: '0.2rem', transition: 'color 0.2s', display: 'flex', alignItems: 'center'
              }}
              aria-label="Toggle Theme"
            >
              {isLight ? '☀️' : '🌙'}
            </button>

            {/* Auth section */}
            {user ? (
              <div ref={dropRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setDropOpen(d => !d)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                    borderRadius: '2rem', padding: '0.35rem 0.9rem 0.35rem 0.4rem',
                    cursor: 'pointer', transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#10b981'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,0.25)'}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#10b981,#059669)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, color: '#fff', fontSize: '0.85rem',
                  }}>
                    {user.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-body)', fontSize: '0.875rem', maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name}
                  </span>
                  <span style={{ color: 'var(--color-text-muted-dark)', fontSize: '0.7rem', transform: dropOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
                </button>

                {/* Dropdown */}
                {dropOpen && (
                  <div style={{
                    position: 'absolute', right: 0, top: 'calc(100% + 0.5rem)',
                    background: 'var(--color-eco-card)', border: '1px solid rgba(51,65,85,0.6)',
                    borderRadius: '0.85rem', padding: '0.5rem',
                    minWidth: 200, boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
                    animation: 'dropIn 0.15s ease',
                  }}>
                    {/* Role badge */}
                    <div style={{ padding: '0.5rem 0.75rem', marginBottom: '0.25rem' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-border-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Signed in as</div>
                      <div style={{ fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{user.email}</div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '1rem', padding: '0.15rem 0.55rem', fontSize: '0.72rem', color: '#34d399', marginTop: '0.3rem' }}>
                        {user.role === 'merchant' ? '🏪' : '🌿'} {user.role}
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid var(--color-border)', margin: '0.25rem 0' }} />
                    {user.role === 'merchant' && (
                      <Link
                        to="/merchant/dashboard"
                        onClick={() => setDropOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.75rem', borderRadius: '0.5rem', textDecoration: 'none', color: 'var(--color-text-body)', fontSize: '0.875rem', fontWeight: 600, transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        📊 My Dashboard
                      </Link>
                    )}
                    {user.role === 'customer' && (
                      <Link
                        to="/gamification"
                        onClick={() => setDropOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.75rem', borderRadius: '0.5rem', textDecoration: 'none', color: 'var(--color-text-body)', fontSize: '0.875rem', fontWeight: 600, transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        🏆 My Challenges
                      </Link>
                    )}
                    <div style={{ borderTop: '1px solid var(--color-border)', margin: '0.25rem 0' }} />
                    <button
                      onClick={handleLogout}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.75rem', borderRadius: '0.5rem', background: 'none', border: 'none', color: '#f87171', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Link to="/login" className="btn-outline-eco" style={{ padding: '0.42rem 1rem', fontSize: '0.875rem', textDecoration: 'none' }}>
                  Sign In
                </Link>
                <Link to="/register" className="btn-eco" style={{ padding: '0.42rem 1.1rem', fontSize: '0.875rem', textDecoration: 'none' }}>
{/* Removed */}
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '1.5rem' }}
            className="hamburger"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'var(--color-eco-card)', borderTop: '1px solid var(--color-border)',
          padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem',
        }}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              style={{ textDecoration: 'none', fontWeight: 600, color: pathname === l.to ? '#10b981' : 'var(--color-text-muted)' }}>
              {l.label}
            </Link>
          ))}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', display: 'flex', gap: '0.75rem' }}>
            {user ? (
              <button onClick={() => { handleLogout(); setOpen(false); }} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '0.5rem', padding: '0.5rem 1rem', color: '#f87171', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
                🚪 Sign Out
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="btn-outline-eco" style={{ textDecoration: 'none', flex: 1, textAlign: 'center' }}>Sign In</Link>
                {/* Join Free removed */}
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropIn { from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);} }
        @media(max-width:768px){.desktop-nav{display:none!important;}.hamburger{display:block!important;}}
      `}</style>
    </nav>
  );
}
