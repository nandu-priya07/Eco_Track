import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const WHY_CARDS = [
  {
    icon: '🌱',
    title: 'Eco-Certified Products',
    desc: 'Every product is independently vetted for sustainability — from raw materials to packaging. Shop with confidence knowing your choices truly help the planet.',
    accent: '#10b981',
  },
  {
    icon: '📊',
    title: 'Transparency Scores',
    desc: 'Each product carries a science-backed sustainability score up to 100, so you can compare and make informed decisions at a glance.',
    accent: '#34d399',
  },
  {
    icon: '🏆',
    title: 'Earn Eco Points',
    desc: 'Turn green habits into real rewards. Earn points on every purchase, complete sustainability challenges, and unlock exclusive benefits.',
    accent: '#6ee7b7',
  },
  {
    icon: '🤖',
    title: 'AI Recommendations',
    desc: 'Our smart engine analyses your lifestyle, location, and preferences to suggest the most impactful eco swaps tailored just for you.',
    accent: '#a7f3d0',
  },
];

const IMPACT_STATS = [
  { value: '500+', label: 'Eco Products', icon: '🛒', desc: 'Vetted & certified' },
  { value: '50k+', label: 'Green Shoppers', icon: '🌍', desc: 'Worldwide community' },
  { value: '12t', label: 'CO₂ Saved', icon: '♻️', desc: 'Through green choices' },
  { value: '97%', label: 'Satisfaction', icon: '⭐', desc: 'Customer rated' },
];

const HOW_IT_WORKS = [
  { step: '01', icon: '🔎', title: 'Discover', desc: 'Browse 500+ eco-certified products or get AI-personalised recommendations based on your lifestyle.' },
  { step: '02', icon: '📊', title: 'Compare', desc: 'Use our detailed sustainability scores to compare products and choose what truly aligns with your values.' },
  { step: '03', icon: '🛒', title: 'Shop', desc: 'Add to cart and check out securely. Carbon-neutral delivery on every order, guaranteed.' },
  { step: '04', icon: '🏆', title: 'Earn & Impact', desc: 'Earn Eco Points with each purchase, track your real-world environmental impact over time.' },
];

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !observed.current) {
        observed.current = true;
        const numeric = parseInt(target.replace(/\D/g, ''));
        let start = 0;
        const step = Math.ceil(numeric / 40);
        const interval = setInterval(() => {
          start += step;
          if (start >= numeric) { setCount(numeric); clearInterval(interval); }
          else setCount(start);
        }, 40);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{target.replace(/[\d]/g, '').replace('.', '')}{suffix}</span>;
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(r => r.json())
      .then(data => { setProducts(data.slice(0, 3)); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  return (
    <div>

      {/* ── HERO SECTION ────────────────────────────────────── */}
      <section style={{
        minHeight: '94vh',
        background: `
          radial-gradient(ellipse at 25% 40%, rgba(16,185,129,0.18) 0%, transparent 55%),
          radial-gradient(ellipse at 80% 10%, rgba(52,211,153,0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 60% 90%, rgba(6,95,70,0.15) 0%, transparent 50%)
        `,
        display: 'flex', alignItems: 'center',
        padding: '5rem 1.5rem 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Floating orbs */}
        <div style={{ position: 'absolute', top: '15%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(16,185,129,0.06)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(52,211,153,0.08)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* Left — Text */}
          <div className="animate-fade-up">
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: '2rem', padding: '0.4rem 1.1rem',
              marginBottom: '1.75rem', fontSize: '0.85rem', color: '#34d399',
            }}>
              🌿 #1 Sustainability Platform
            </div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
              fontWeight: 900, lineHeight: 1.1,
              marginBottom: '1.5rem', color: '#f1f5f9',
              letterSpacing: '-0.02em',
            }}>
              Shop Smarter.<br />
              <span style={{
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Live Greener.
              </span>
            </h1>

            <p style={{
              fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.75,
              marginBottom: '2.25rem', maxWidth: '500px',
            }}>
              Discover eco-certified products, track your personal sustainability score, and earn rewards for every greener choice you make.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <Link to="/products" className="btn-eco" style={{
                textDecoration: 'none', fontSize: '1rem',
                padding: '0.9rem 2rem', borderRadius: '0.6rem',
              }}>
                🛒 Shop Now
              </Link>
              <Link to="/search" className="btn-outline-eco" style={{
                textDecoration: 'none', fontSize: '1rem',
                padding: '0.9rem 2rem', borderRadius: '0.6rem',
              }}>
                🔎 Get Recommendations
              </Link>
            </div>

            {/* Stats Row */}
            <div style={{
              display: 'flex', gap: '2rem', flexWrap: 'wrap',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(51,65,85,0.5)',
            }}>
              {[['500+', 'Eco Products'], ['97%', 'Satisfaction'], ['12t', 'CO₂ Saved']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#10b981', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Central Orb */}
            <div className="animate-pulse-glow" style={{
              width: 360, height: 360, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.06) 55%, transparent 75%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{ fontSize: '8rem', filter: 'drop-shadow(0 0 30px rgba(16,185,129,0.4))' }}>🌍</div>

              {/* Floating Cards */}
              {[
                { icon: '🌱', label: 'Eco Score 97', top: '5%', left: '-10%', delay: '0s' },
                { icon: '♻️', label: 'Zero Waste', top: '65%', left: '-15%', delay: '0.5s' },
                { icon: '⭐', label: '50k+ Users', top: '5%', right: '-10%', delay: '1s' },
                { icon: '🏆', label: '5k Points', top: '65%', right: '-15%', delay: '1.5s' },
              ].map(({ icon, label, top, left, right, delay }) => (
                <div key={label} style={{
                  position: 'absolute', top, left, right,
                  background: 'rgba(30,41,59,0.85)', backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  borderRadius: '0.75rem', padding: '0.5rem 0.85rem',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 600,
                  animation: `floatBadge 3s ease-in-out ${delay} infinite alternate`,
                  whiteSpace: 'nowrap',
                }}>
                  <span>{icon}</span> {label}
                </div>
              ))}
            </div>

            {/* Ring decoration */}
            <div style={{
              position: 'absolute', width: 420, height: 420, borderRadius: '50%',
              border: '1px dashed rgba(16,185,129,0.15)',
              animation: 'spin 30s linear infinite',
              pointerEvents: 'none',
            }} />
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            section > div > div:last-child { display: none !important; }
            section > div { grid-template-columns: 1fr !important; }
          }
          @keyframes floatBadge {
            from { transform: translateY(0px); }
            to   { transform: translateY(-8px); }
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </section>

      {/* ── IMPACT STATS ───────────────────────────────────── */}
      <section style={{
        padding: '4rem 1.5rem',
        background: 'linear-gradient(180deg, rgba(16,185,129,0.06) 0%, transparent 100%)',
        borderTop: '1px solid rgba(16,185,129,0.1)',
        borderBottom: '1px solid rgba(16,185,129,0.08)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="section-title">Our <span className="gradient-text">Real-World Impact</span></h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>Every purchase makes a measurable difference to the planet</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {IMPACT_STATS.map(({ value, label, icon, desc }) => (
              <div key={label} className="card-hover glass" style={{
                borderRadius: '1.25rem', padding: '2rem',
                textAlign: 'center', cursor: 'default',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{icon}</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#10b981', lineHeight: 1 }}>
                  <CountUp target={value} />
                </div>
                <div style={{ fontWeight: 700, color: '#f1f5f9', marginTop: '0.4rem', fontSize: '1rem' }}>{label}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ECOTRACK ───────────────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', background: 'rgba(15,23,42,0.8)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '2rem', padding: '0.35rem 1rem',
              fontSize: '0.82rem', color: '#34d399', marginBottom: '1rem',
            }}>
              ✨ Why Choose Us
            </div>
            <h2 className="section-title">Why <span className="gradient-text">EcoTrack?</span></h2>
            <p className="section-subtitle">Join thousands making a real difference, one product at a time.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {WHY_CARDS.map(({ icon, title, desc, accent }, i) => (
              <div
                key={title}
                className="card-hover glass"
                style={{
                  borderRadius: '1.25rem', padding: '2rem',
                  borderColor: hoveredCard === i ? `rgba(${accent === '#10b981' ? '16,185,129' : '52,211,153'},0.3)` : undefined,
                  cursor: 'default',
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: '1rem',
                  background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', marginBottom: '1.25rem',
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.6rem' }}>{title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">Your green journey in four simple steps</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', position: 'relative' }}>
            {HOW_IT_WORKS.map(({ step, icon, title, desc }, i) => (
              <div key={step} style={{ position: 'relative' }}>
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div style={{
                    position: 'absolute', top: '2.5rem', left: '60%', width: 'calc(100% - 20px)',
                    height: 2, background: 'linear-gradient(90deg, rgba(16,185,129,0.4), transparent)',
                    display: 'none',
                  }} className="step-connector" />
                )}
                <div style={{ textAlign: 'center', padding: '0 0.5rem' }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1))',
                    border: '2px solid rgba(16,185,129,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem', margin: '0 auto 1rem',
                    position: 'relative',
                  }}>
                    {icon}
                    <div style={{
                      position: 'absolute', top: -8, right: -8,
                      width: 24, height: 24, borderRadius: '50%',
                      background: '#10b981', color: '#fff',
                      fontSize: '0.65rem', fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {step}
                    </div>
                  </div>
                  <h3 style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '0.6rem' }}>{title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ───────────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', background: 'rgba(15,23,42,0.6)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section-title">Featured <span className="gradient-text">Products</span></h2>
              <p className="section-subtitle" style={{ marginBottom: 0 }}>Handpicked for maximum eco-impact &amp; top sustainability scores</p>
            </div>
            <Link to="/products" className="btn-outline-eco" style={{ textDecoration: 'none' }}>View All →</Link>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  background: 'rgba(30,41,59,0.4)', borderRadius: '1rem',
                  height: 380, animation: 'shimmer 1.5s ease-in-out infinite',
                  border: '1px solid rgba(51,65,85,0.3)',
                }} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {products.map((p, i) => (
                <Link key={p.id} to={`/products/${p.id}`} style={{ textDecoration: 'none' }}>
                  <div className="card-hover glass" style={{
                    borderRadius: '1.25rem', overflow: 'hidden', cursor: 'pointer',
                    animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
                  }}>
                    <div style={{ height: '140px', background: 'rgba(16,185,129,0.05)', position: 'relative' }}>
                      {/* Score badge */}
                      <div style={{
                        position: 'absolute', top: '0.75rem', right: '0.75rem',
                        background: p.score >= 95 ? '#059669' : '#10b981',
                        borderRadius: '0.5rem', padding: '0.25rem 0.65rem',
                        fontSize: '0.8rem', fontWeight: 700, color: '#fff',
                      }}>
                        ♻ {p.score}/100
                      </div>
                      {/* Category */}
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        background: 'linear-gradient(transparent, rgba(15,23,42,0.85))',
                        padding: '1.5rem 1rem 0.5rem',
                        fontSize: '0.75rem', color: '#94a3b8',
                      }}>
                        {p.category}
                      </div>
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                        {p.tags.map(t => (
                          <span key={t} style={{
                            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                            borderRadius: '1rem', padding: '0.15rem 0.6rem',
                            fontSize: '0.75rem', color: '#34d399',
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '0.75rem', fontSize: '1rem' }}>{p.name}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>₹{(p.price * 25).toFixed(2)}</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          🌱 Eco certified
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <style>{`
          @keyframes shimmer {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
        `}</style>
      </section>

      {/* ── TESTIMONIAL STRIP ───────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: '#0a1628' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="section-title">Loved by <span className="gradient-text">Eco Warriors</span></h2>
            <p className="section-subtitle">What our community of green shoppers is saying</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {[
              { name: 'Sarah M.', role: 'Zero-Waste Blogger', text: 'EcoTrack changed how I shop. The sustainability scores make it so easy to pick the right products without hours of research.', rating: 5, avatar: '👩‍💻' },
              { name: 'James K.', role: 'Sustainability Enthusiast', text: 'The AI recommendations are spot-on! It found bamboo alternatives I hadn\'t even considered. My carbon footprint is down 40%.', rating: 5, avatar: '👨‍🌾' },
              { name: 'Priya L.', role: 'Green Living Coach', text: 'I recommend EcoTrack to all my clients. The Eco Points system keeps them motivated and the product quality is genuinely top-tier.', rating: 5, avatar: '👩‍🏫' },
            ].map(({ name, role, text, rating, avatar }) => (
              <div key={name} className="glass card-hover" style={{ borderRadius: '1.25rem', padding: '1.75rem', cursor: 'default' }}>
                <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1rem' }}>
                  {[...Array(rating)].map((_, i) => <span key={i} style={{ color: '#f59e0b', fontSize: '1rem' }}>★</span>)}
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                  "{text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                  }}>
                    {avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.9rem' }}>{name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section style={{
        padding: '6rem 1.5rem',
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 80%, #059669 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: 350, height: 350, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.25rem' }}>🌎</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900,
            color: '#fff', marginBottom: '1.25rem', lineHeight: 1.15,
          }}>
            Start Your Green Journey Today
          </h2>
          <p style={{
            color: '#a7f3d0', fontSize: '1.1rem',
            marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 2.5rem',
          }}>
            Join 50,000+ eco-conscious shoppers making a real difference. Get personalised recommendations, earn points, and track your environmental impact.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/search" style={{
              background: '#fff', color: '#065f46',
              padding: '1rem 2.25rem', borderRadius: '0.6rem',
              fontWeight: 700, textDecoration: 'none', fontSize: '1.05rem',
              transition: 'transform 0.2s, box-shadow 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'; }}
            >
              🔎 Get My Recommendations
            </Link>
            <Link to="/gamification" style={{
              background: 'transparent', color: '#fff',
              border: '2px solid rgba(255,255,255,0.5)',
              padding: '1rem 2.25rem', borderRadius: '0.6rem',
              fontWeight: 700, textDecoration: 'none', fontSize: '1.05rem',
              transition: 'background 0.2s, border-color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
            >
              🏆 Join Challenges
            </Link>
          </div>

          {/* Trust indicators */}
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            {['🔒 Secure Checkout', '🌱 Carbon-Neutral Shipping', '♻️ Ethical Sourcing', '⭐ 50k+ Reviews'].map(badge => (
              <div key={badge} style={{ fontSize: '0.82rem', color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
