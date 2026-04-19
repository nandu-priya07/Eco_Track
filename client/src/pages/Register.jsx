import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [role, setRole] = useState('customer');
  const [form, setForm] = useState({ name: '', email: '', password: '', storeName: '' });
  const [showPass, setShowPass] = useState(false);
  const { register, authLoading, authError, setAuthError } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setAuthError('');
    if (form.password.length < 6) { setAuthError('Password must be at least 6 characters.'); return; }
    try {
      const user = await register({ ...form, role });
      navigate(user.role === 'merchant' ? '/merchant/dashboard' : '/');
    } catch {}
  };

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ['#ef4444', '#f59e0b', '#10b981'];
  const strengthLabels = ['Weak', 'Fair', 'Strong'];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem',
      background: `
        radial-gradient(ellipse at 75% 30%, rgba(16,185,129,0.12) 0%, transparent 55%),
        radial-gradient(ellipse at 20% 80%, rgba(52,211,153,0.08) 0%, transparent 50%),
        #0f172a
      `,
    }}>
      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);} }
        .auth-input:focus{outline:none;border-color:#10b981;box-shadow:0 0 0 3px rgba(16,185,129,0.12);}
        @keyframes spin{to{transform:rotate(360deg);}}
      `}</style>

      <div style={{ width: '100%', maxWidth: 500, animation: 'slideUp 0.5s ease-out' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '2.2rem' }}>🌿</span>
            <span style={{ fontWeight: 900, fontSize: '1.6rem', color: '#10b981' }}>EcoTrack</span>
          </Link>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>Join the sustainability movement</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(30,41,59,0.8)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(51,65,85,0.6)', borderRadius: '1.5rem',
          padding: '2.25rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}>

          {/* Role Selector */}
          <div style={{ marginBottom: '1.75rem' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              I am joining as a…
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { key: 'customer', icon: '🌿', label: 'Customer', desc: 'Shop, earn points & track impact' },
                { key: 'merchant', icon: '🏪', label: 'Merchant', desc: 'List & sell eco products' },
              ].map(({ key, icon, label, desc }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => { setRole(key); setAuthError(''); }}
                  style={{
                    padding: '1rem', borderRadius: '0.85rem',
                    border: `2px solid ${role === key ? '#10b981' : 'rgba(51,65,85,0.5)'}`,
                    background: role === key ? 'rgba(16,185,129,0.1)' : 'rgba(15,23,42,0.4)',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>{icon}</div>
                  <div style={{ fontWeight: 700, color: role === key ? '#34d399' : '#94a3b8', fontSize: '0.9rem' }}>{label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.15rem', lineHeight: 1.4 }}>{desc}</div>
                </button>
              ))}
            </div>
          </div>

          <h2 style={{ fontWeight: 800, color: '#f1f5f9', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
            Create Your {role === 'customer' ? 'Customer' : 'Merchant'} Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Full Name
                </label>
                <input
                  className="auth-input"
                  name="name" required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1.5px solid #334155', borderRadius: '0.6rem', color: '#e2e8f0', padding: '0.75rem 1rem', fontSize: '0.95rem', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box' }}
                />
              </div>

              {/* Store Name — merchants only */}
              {role === 'merchant' && (
                <div style={{ animation: 'slideUp 0.3s ease-out' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    🏪 Store / Brand Name
                  </label>
                  <input
                    className="auth-input"
                    name="storeName" required={role === 'merchant'}
                    value={form.storeName}
                    onChange={handleChange}
                    placeholder="e.g. Green Leaf Co."
                    style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1.5px solid #334155', borderRadius: '0.6rem', color: '#e2e8f0', padding: '0.75rem 1rem', fontSize: '0.95rem', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box' }}
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Email Address
                </label>
                <input
                  className="auth-input"
                  name="email" type="email" required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1.5px solid #334155', borderRadius: '0.6rem', color: '#e2e8f0', padding: '0.75rem 1rem', fontSize: '0.95rem', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box' }}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="auth-input"
                    name="password" type={showPass ? 'text' : 'password'} required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1.5px solid #334155', borderRadius: '0.6rem', color: '#e2e8f0', padding: '0.75rem 2.75rem 0.75rem 1rem', fontSize: '0.95rem', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box' }}
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '1rem' }}>
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
                {/* Password Strength */}
                {form.password.length > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.25rem' }}>
                      {[1, 2, 3].map(i => (
                        <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= strength ? strengthColors[strength - 1] : '#1e293b', transition: 'background 0.3s' }} />
                      ))}
                    </div>
                    <p style={{ fontSize: '0.73rem', color: strengthColors[strength - 1] }}>
                      {strengthLabels[strength - 1]} password
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Error */}
            {authError && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem', padding: '0.65rem 0.9rem', color: '#f87171', fontSize: '0.875rem', margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                ⚠️ {authError}
              </div>
            )}

            {/* Benefits reminder */}
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: '0.6rem', padding: '0.75rem 1rem', margin: '1.25rem 0', fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6 }}>
              {role === 'customer'
                ? '🌱 Free account · Earn 100 welcome points · Personalised recommendations · Order history'
                : '🏪 Free to list · Dashboard analytics · Multi-image products · Direct customer reach'}
            </div>

            <button
              type="submit"
              disabled={authLoading}
              style={{
                width: '100%', padding: '0.9rem',
                background: authLoading ? 'rgba(16,185,129,0.5)' : 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none', borderRadius: '0.6rem', color: '#fff',
                fontWeight: 700, fontSize: '1rem', cursor: authLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}
            >
              {authLoading ? (
                <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Creating Account…</>
              ) : `🚀 Create ${role === 'customer' ? 'Customer' : 'Merchant'} Account`}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#475569' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>Sign in →</Link>
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#334155', fontSize: '0.78rem', marginTop: '1.5rem' }}>
          By registering you agree to our Terms of Service & Privacy Policy
        </p>
      </div>
    </div>
  );
}
