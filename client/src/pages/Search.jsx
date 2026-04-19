import { useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['Kitchen', 'Electronics', 'Accessories', 'Bathroom', 'Zero Waste', 'Renewable Energy'];

const ECO_TIPS = [
  { icon: '♻️', tip: 'Switching to reusables eliminates 700+ single-use items per year' },
  { icon: '💧', tip: 'A reusable bottle saves ~156 plastic bottles annually' },
  { icon: '🌱', tip: 'Bamboo products regenerate 30x faster than hardwood' },
  { icon: '⚡', tip: 'Solar power banks reduce your device carbon footprint by up to 80%' },
];

function StarRating({ value }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ color: s <= value ? '#f59e0b' : '#334155', fontSize: '0.85rem' }}>★</span>
      ))}
    </div>
  );
}

export default function Search() {
  const [form, setForm] = useState({ name: '', email: '', category: '', location: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(null);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/recommend', {
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

  const filledFields = Object.values(form).filter(Boolean).length;
  const progress = (filledFields / 4) * 100;

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>

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
          color: '#f1f5f9', lineHeight: 1.2, marginBottom: '1rem',
        }}>
          Get Your{' '}
          <span style={{
            background: 'linear-gradient(135deg, #10b981, #34d399, #6ee7b7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Personalised
          </span>{' '}
          Eco Picks
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
          Tell us a little about yourself and we'll match you with the perfect sustainable products for your lifestyle and location.
        </p>

        {/* Quick Eco Tips */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
          {ECO_TIPS.map(({ icon, tip }) => (
            <div key={tip} style={{
              background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(51,65,85,0.5)',
              borderRadius: '0.75rem', padding: '0.5rem 0.85rem',
              fontSize: '0.78rem', color: '#64748b', maxWidth: 200, textAlign: 'left',
              display: 'flex', gap: '0.4rem', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Form Card */}
        <div style={{
          background: 'rgba(30,41,59,0.5)',
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
              <h2 style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                📋 Your Preferences
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Fill in the details below to get matched products</p>
            </div>
            {/* Progress */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.78rem', color: '#34d399', marginBottom: '0.4rem', fontWeight: 600 }}>
                {filledFields}/4 fields completed
              </div>
              <div style={{ width: 160, height: 6, background: '#1e293b', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #10b981, #34d399)',
                  borderRadius: 99,
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </div>
          </div>

          <div style={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

                {/* Name */}
                <div>
                  <label style={{
                    display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8',
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
                    display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8',
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
                  <p style={{ fontSize: '0.73rem', color: '#475569', marginTop: '0.3rem' }}>We'll send your personalised recommendations here</p>
                </div>

                {/* Category */}
                <div>
                  <label style={{
                    display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8',
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
                  {/* Category chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.6rem' }}>
                    {CATEGORIES.slice(0, 4).map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setForm(f => ({ ...f, category: c }))}
                        style={{
                          background: form.category === c ? 'rgba(16,185,129,0.2)' : 'rgba(30,41,59,0.8)',
                          border: `1px solid ${form.category === c ? '#10b981' : '#334155'}`,
                          borderRadius: '2rem', padding: '0.2rem 0.6rem',
                          color: form.category === c ? '#34d399' : '#64748b',
                          fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.2s',
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label style={{
                    display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8',
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
                  <p style={{ fontSize: '0.73rem', color: '#475569', marginTop: '0.3rem' }}>Helps us show locally available products</p>
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
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                      Finding products…
                    </span>
                  ) : '🔎 Get My Recommendations'}
                </button>
                <div style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  🔒 We never share your data
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Results */}
        {submitted && (
          <div style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}>
            {/* Results Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.3rem' }}>
                  {results.length > 0
                    ? `🌿 ${results.length} Eco Products Matched`
                    : '😔 No matches found'}
                </h2>
                {form.name && (
                  <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Personalised for <strong style={{ color: '#34d399' }}>{form.name}</strong>
                    {form.location && <> in <strong style={{ color: '#34d399' }}>{form.location}</strong></>}
                  </p>
                )}
              </div>
              {results.length > 0 && (
                <button
                  onClick={() => { setSubmitted(false); setResults([]); }}
                  className="btn-outline-eco"
                  style={{ fontSize: '0.875rem', padding: '0.5rem 1.2rem' }}
                >
                  🔄 New Search
                </button>
              )}
            </div>

            {/* Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.5rem' }}>
              {results.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="card-hover"
                    style={{
                      background: 'rgba(30,41,59,0.6)',
                      border: '1px solid rgba(51,65,85,0.5)',
                      borderRadius: '1.25rem', overflow: 'hidden',
                      animation: `fadeInUp 0.5s ease-out ${i * 0.07}s both`,
                    }}
                  >
                    <div style={{ position: 'relative', height: 140, background: 'rgba(16,185,129,0.05)' }}>
                      {/* Score badge */}
                      <div style={{
                        position: 'absolute', top: '0.75rem', right: '0.75rem',
                        background: p.score >= 90 ? '#10b981' : p.score >= 75 ? '#f59e0b' : '#ef4444',
                        borderRadius: '0.5rem', padding: '0.25rem 0.65rem',
                        fontSize: '0.8rem', fontWeight: 700, color: '#fff',
                      }}>
                        ♻ {p.score}/100
                      </div>
                      {/* Category badge */}
                      <div style={{
                        position: 'absolute', top: '0.75rem', left: '0.75rem',
                        background: 'rgba(15,23,42,0.85)', borderRadius: '0.4rem',
                        padding: '0.2rem 0.6rem', fontSize: '0.75rem', color: '#94a3b8',
                      }}>
                        {p.category}
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding: '1.25rem' }}>
                      {/* Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
                        {p.tags.map(t => (
                          <span key={t} style={{
                            background: 'rgba(16,185,129,0.1)',
                            border: '1px solid rgba(16,185,129,0.25)',
                            borderRadius: '2rem', padding: '0.1rem 0.55rem',
                            fontSize: '0.72rem', color: '#34d399',
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <h3 style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem', fontSize: '1rem' }}>{p.name}</h3>

                      {/* Features preview */}
                      {p.features?.[0] && (
                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <span style={{ color: '#10b981' }}>✔</span> {p.features[0]}
                        </p>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, color: '#10b981', fontSize: '1.15rem' }}>₹{(p.price * 25).toFixed(2)}</span>
                        <span style={{
                          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                          borderRadius: '0.4rem', padding: '0.2rem 0.6rem',
                          fontSize: '0.75rem', color: '#34d399',
                        }}>
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            {results.length > 0 && (
              <div style={{
                marginTop: '3rem', textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.05))',
                border: '1px solid rgba(16,185,129,0.12)',
                borderRadius: '1rem', padding: '2rem',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🌍</div>
                <h3 style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem' }}>Want Even More Options?</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Browse our full catalogue of 500+ eco-certified products</p>
                <Link to="/products" className="btn-eco" style={{ textDecoration: 'none', display: 'inline-flex' }}>
                  🛒 Browse All Products
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        option { background: #1e293b; color: #e2e8f0; }
      `}</style>
    </div>
  );
}
