import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CATEGORIES = ['Kitchen', 'Electronics', 'Accessories', 'Bathroom', 'Zero Waste', 'Renewable Energy'];

const ECO_TIPS = [
  { icon: '♻️', tip: 'Switching to reusables eliminates 700+ single-use items per year' },
  { icon: '💧', tip: 'A reusable bottle saves ~156 plastic bottles annually' },
  { icon: '🌱', tip: 'Bamboo products regenerate 30x faster than hardwood' },
  { icon: '⚡', tip: 'Solar power banks reduce your device carbon footprint by up to 80%' },
];

export default function Search() {
  const [form, setForm] = useState({ name: '', email: '', category: '', location: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(null);
  const [cartMsg, setCartMsg] = useState('');
  const { addToCart } = useCart();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleAddToCart = p => {
    addToCart(p, 1);
    setCartMsg(`✅ Added ${p.name} to cart!`);
    setTimeout(() => setCartMsg(''), 3000);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResults(data);
      setSubmitted(true);
    } catch {
      setError('Unable to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--color-eco-bg)', minHeight: '100vh' }}>

      {/* Cart Notification */}
      {cartMsg && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
          background: '#10b981', color: '#fff', padding: '1rem 1.5rem',
          borderRadius: '0.75rem', fontWeight: 600, animation: 'slideIn 0.3s ease',
        }}>
          {cartMsg}
        </div>
      )}

      {/* Hero Header */}
      <div style={{
        background: 'radial-gradient(ellipse at 50% -10%, rgba(16,185,129,0.2) 0%, transparent 60%)',
        borderBottom: '1px solid rgba(16,185,129,0.1)',
        padding: '4rem 1.5rem 3rem',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
          borderRadius: '2rem', padding: '0.4rem 1.1rem',
          fontSize: '0.82rem', color: '#34d399', marginBottom: '1.25rem',
        }}>
          🤖 AI-Powered Recommendations
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900,
          color: 'var(--color-text-main)', lineHeight: 1.2, marginBottom: '1rem',
        }}>
          Get Your{' '}
          <span style={{
            background: 'linear-gradient(135deg, #10b981, #34d399, #6ee7b7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Perfect Eco Match
          </span>
        </h1>
        <p style={{ color: 'var(--color-text-muted-dark)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
          Tell us a little about yourself and we'll match you with the perfect sustainable products for your lifestyle and location.
        </p>

        {/* Quick Eco Tips */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
          {ECO_TIPS.map(({ icon, tip }) => (
            <div key={tip} style={{
              background: 'rgba(var(--color-eco-bg-rgb),0.7)', border: '1px solid rgba(51,65,85,0.5)',
              borderRadius: '0.75rem', padding: '0.5rem 0.85rem',
              fontSize: '0.78rem', color: 'var(--color-text-muted-dark)', maxWidth: 200, textAlign: 'left',
              display: 'flex', gap: '0.4rem', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', marginTop: '3rem' }}>
        {!submitted && (
          <div style={{
            background: 'rgba(var(--color-eco-card-rgb),0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(51,65,85,0.6)',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            marginBottom: '3rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          }}>
            {/* Form Header */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.06))',
              borderBottom: '1px solid rgba(16,185,129,0.12)',
              padding: '1.5rem 2rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <h2 style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                  📋 Tell Us About You
                </h2>
                <p style={{ color: 'var(--color-text-muted-dark)', fontSize: '0.85rem' }}>Quick questions to find your perfect sustainable products</p>
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

                  {/* Name */}
                  <div>
                    <label style={{
                      display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)',
                      marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                    }}>
                      🙂 Your Name
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        className="eco-input"
                        name="name"
                        placeholder="e.g. Alex Green"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setActiveStep('name')}
                        onBlur={() => setActiveStep(null)}
                        style={{
                          borderColor: activeStep === 'name' ? '#10b981' : form.name ? 'rgba(16,185,129,0.4)' : undefined,
                        }}
                      />
                      {form.name && (
                        <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#10b981', fontSize: '0.9rem' }}>✔</span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{
                      display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)',
                      marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                      📧 Email Address
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        className="eco-input"
                        name="email"
                        type="email"
                        placeholder="alex@example.com"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setActiveStep('email')}
                        onBlur={() => setActiveStep(null)}
                        style={{
                          borderColor: activeStep === 'email' ? '#10b981' : form.email ? 'rgba(16,185,129,0.4)' : undefined,
                        }}
                      />
                      {form.email && (
                        <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#10b981', fontSize: '0.9rem' }}>✔</span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.73rem', color: 'var(--color-border-light)', marginTop: '0.3rem' }}>We'll send your personalised recommendations here</p>
                  </div>

                  {/* Category */}
                  <div>
                    <label style={{
                      display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)',
                      marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                      🛒 Product Category
                    </label>
                    <select
                      className="eco-input"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      onFocus={() => setActiveStep('category')}
                      onBlur={() => setActiveStep(null)}
                      style={{
                        cursor: 'pointer',
                        borderColor: activeStep === 'category' ? '#10b981' : form.category ? 'rgba(16,185,129,0.4)' : undefined,
                      }}
                    >
                      <option value="">— Select a category —</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label style={{
                      display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)',
                      marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                      📍 Your Location
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        className="eco-input"
                        name="location"
                        placeholder="e.g. London, UK"
                        value={form.location}
                        onChange={handleChange}
                        onFocus={() => setActiveStep('location')}
                        onBlur={() => setActiveStep(null)}
                        style={{
                          borderColor: activeStep === 'location' ? '#10b981' : form.location ? 'rgba(16,185,129,0.4)' : undefined,
                        }}
                      />
                      {form.location && (
                        <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#10b981', fontSize: '0.9rem' }}>✔</span>
                      )}
                    </div>
                  </div>
                </div>

                {error && (
                  <div style={{
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#f87171',
                    fontSize: '0.9rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}>
                    ⚠️ {error}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <button
                    className="btn-eco"
                    type="submit"
                    disabled={loading}
                    style={{ fontSize: '1rem', padding: '0.85rem 2.25rem', opacity: loading ? 0.75 : 1, position: 'relative' }}
                  >
                    {loading ? 'Finding products...' : '🔎 Get My Recommendations'}
                  </button>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-border-light)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    🔒 We never share your data
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Results */}
        {submitted && (
          <div style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}>
            {/* Results Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.3rem' }}>
                  {results.length > 0
                    ? `🌿 ${results.length} Eco Products Matched`
                    : '😔 No matches found'}
                </h2>
                {form.name && (
                  <p style={{ color: 'var(--color-text-muted-dark)', fontSize: '0.875rem' }}>
                    Personalised for <strong style={{ color: '#34d399' }}>{form.name}</strong>
                  </p>
                )}
              </div>
              <button
                onClick={() => { setSubmitted(false); setResults([]); }}
                className="btn-outline-eco"
                style={{ fontSize: '0.875rem', padding: '0.5rem 1.2rem' }}
              >
                🔄 New Search
              </button>
            </div>

            {/* Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.5rem' }}>
              {results.map((p, i) => (
                <div
                  key={p.id}
                  className="card-hover glass"
                  style={{
                    background: 'rgba(var(--color-eco-card-rgb),0.6)',
                    border: '1px solid rgba(51,65,85,0.5)',
                    borderRadius: '1.25rem', overflow: 'hidden',
                    animation: `fadeInUp 0.5s ease-out ${i * 0.07}s both`,
                    display: 'flex', flexDirection: 'column',
                    position: 'relative'
                  }}
                >
                  <Link to={`/products/${p.id}`} style={{ textDecoration: 'none', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
                      <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {/* Score badge */}
                      <div style={{
                        position: 'absolute', top: '0.75rem', right: '0.75rem',
                        background: p.score >= 90 ? '#10b981' : p.score >= 75 ? '#f59e0b' : '#ef4444',
                        borderRadius: '0.5rem', padding: '0.25rem 0.65rem',
                        fontSize: '0.8rem', fontWeight: 700, color: '#fff', zIndex: 2
                      }}>
                        ♻ {p.score}/100
                      </div>
                      {/* Match Badge */}
                      <div style={{
                        position: 'absolute', top: '0.75rem', left: '0.75rem',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: '#fff', borderRadius: '0.5rem', padding: '0.25rem 0.6rem',
                        fontSize: '0.7rem', fontWeight: 800, boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                        display: 'flex', alignItems: 'center', gap: '0.2rem', zIndex: 2
                      }}>
                        ⭐ {p.score > 90 ? 'TOP MATCH' : 'GREAT MATCH'}
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
                        <span style={{
                          background: 'rgba(16,185,129,0.1)',
                          border: '1px solid rgba(16,185,129,0.25)',
                          borderRadius: '2rem', padding: '0.1rem 0.55rem',
                          fontSize: '0.72rem', color: '#34d399',
                        }}>
                          {p.category}
                        </span>
                      </div>

                      <h3 style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.5rem', fontSize: '1rem' }}>{p.name}</h3>

                      <div style={{ marginTop: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, color: '#10b981', fontSize: '1.15rem' }}>₹{(p.price * 25).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Action Buttons */}
                  <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', gap: '0.6rem' }}>
                    <Link to={`/products/${p.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                      <button style={{
                        width: '100%', padding: '0.5rem', borderRadius: '0.5rem',
                        border: '1px solid #10b981', background: 'transparent',
                        color: '#10b981', cursor: 'pointer', fontSize: '0.85rem',
                        fontWeight: 600, transition: 'all 0.2s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        ℹ️ Details
                      </button>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(p);
                      }}
                      className="btn-eco"
                      style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}
                    >
                      🛒 Add
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              marginTop: '3rem', textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.05))',
              border: '1px solid rgba(16,185,129,0.12)',
              borderRadius: '1rem', padding: '2rem',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🌍</div>
              <h3 style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Want Even More Sustainable Options?</h3>
              <p style={{ color: 'var(--color-text-muted-dark)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Browse our full catalogue of 500+ eco-certified products matched for your lifestyle</p>
              <Link to="/products" className="btn-eco" style={{ textDecoration: 'none', display: 'inline-flex' }}>
                🛒 Browse All Products
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        option { background: var(--color-eco-card); color: var(--color-text-body); }
      `}</style>
    </div>
  );
}
