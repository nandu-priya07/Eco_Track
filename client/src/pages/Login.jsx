import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login, authLoading, authError, setAuthError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setAuthError('');
    try {
      const user = await login(email, password, role);
      navigate(user.role === 'merchant' ? '/merchant/dashboard' : '/');
    } catch {}
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem',
      background: `
        radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.12) 0%, transparent 55%),
        radial-gradient(ellipse at 80% 20%, rgba(52,211,153,0.08) 0%, transparent 50%),
        var(--color-eco-bg)
      `,
    }}>
      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        .auth-input:focus { outline:none; border-color:#10b981; box-shadow:0 0 0 3px rgba(16,185,129,0.12); }
        .role-tab:hover { border-color:rgba(16,185,129,0.5)!important; }
      `}</style>

      <div style={{ width: '100%', maxWidth: 460, animation: 'slideUp 0.5s ease-out' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '2.2rem' }}>🌿</span>
            <span style={{ fontWeight: 900, fontSize: '1.6rem', color: '#10b981' }}>EcoTrack</span>
          </Link>
          <p style={{ color: 'var(--color-text-muted-dark)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Welcome back, eco warrior!</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(var(--color-eco-card-rgb),0.8)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(51,65,85,0.6)', borderRadius: '1.5rem',
          padding: '2.25rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}>

          {/* Role Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '2rem' }}>
            {[
              { key: 'customer', label: 'Customer', icon: '🌿' },
              { key: 'merchant', label: 'Merchant', icon: '🏪' },
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                className="role-tab"
                onClick={() => { setRole(key); setAuthError(''); }}
                style={{
                  padding: '0.75rem', borderRadius: '0.75rem', border: '1.5px solid',
                  borderColor: role === key ? '#10b981' : 'rgba(51,65,85,0.5)',
                  background: role === key ? 'rgba(16,185,129,0.12)' : 'rgba(var(--color-eco-bg-rgb),0.4)',
                  color: role === key ? '#34d399' : 'var(--color-text-muted-dark)',
                  cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  transition: 'all 0.2s',
                }}
              >
                <span>{icon}</span> {label}
              </button>
            ))}
          </div>

          <h2 style={{ fontWeight: 800, color: 'var(--color-text-main)', fontSize: '1.3rem', marginBottom: '0.3rem' }}>
            {role === 'customer' ? '🌱 Customer Sign In' : '🏪 Merchant Sign In'}
          </h2>
          <p style={{ color: 'var(--color-text-muted-dark)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
            {role === 'customer'
              ? 'Access your eco journey, orders & rewards'
              : 'Manage your products & storefronts'}
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '1.1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Email Address
              </label>
              <input
                className="auth-input"
                type="email" required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%', background: 'rgba(var(--color-eco-bg-rgb),0.8)', border: '1.5px solid var(--color-border)',
                  borderRadius: '0.6rem', color: 'var(--color-text-body)', padding: '0.75rem 1rem',
                  fontSize: '0.95rem', transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="auth-input"
                  type={showPass ? 'text' : 'password'} required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%', background: 'rgba(var(--color-eco-bg-rgb),0.8)', border: '1.5px solid var(--color-border)',
                    borderRadius: '0.6rem', color: 'var(--color-text-body)', padding: '0.75rem 2.75rem 0.75rem 1rem',
                    fontSize: '0.95rem', transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxSizing: 'border-box',
                  }}
                />
                <button type="button" onClick={() => setShowPass(s => !s)} style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted-dark)', fontSize: '1rem',
                }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
              <div style={{ textAlign: 'right', marginTop: '0.4rem' }}>
                <a href="#" style={{ fontSize: '0.8rem', color: '#10b981', textDecoration: 'none' }}>Forgot password?</a>
              </div>
            </div>

            {/* Error */}
            {authError && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '0.5rem', padding: '0.65rem 0.9rem',
                color: '#f87171', fontSize: '0.875rem', marginBottom: '1rem',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}>
                ⚠️ {authError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={authLoading}
              style={{
                width: '100%', padding: '0.875rem',
                background: authLoading ? 'rgba(16,185,129,0.5)' : 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none', borderRadius: '0.6rem', color: '#fff',
                fontWeight: 700, fontSize: '1rem', cursor: authLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                marginTop: '0.5rem',
              }}
            >
              {authLoading ? (
                <>
                  <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                  Signing In…
                </>
              ) : `Sign In as ${role === 'customer' ? 'Customer' : 'Merchant'}`}
            </button>
            <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
          </form>

          {/* Removed divider and create account */}
        </div>

        <p style={{ textAlign: 'center', color: 'var(--color-border)', fontSize: '0.78rem', marginTop: '1.5rem' }}>
          🔒 Secured with end-to-end encryption · EcoTrack®
        </p>
      </div>
    </div>
  );
}
