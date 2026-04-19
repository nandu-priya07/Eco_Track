import { Link } from 'react-router-dom';
import { useState } from 'react';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Discover', to: '/search' },
  { label: 'Challenges', to: '/gamification' },
  { label: 'Contact Us', to: '/contact' },
];

const CATEGORIES = [
  { label: '🍽️ Kitchen', to: '/products' },
  { label: '🚿 Bathroom', to: '/products' },
  { label: '⚡ Electronics', to: '/products' },
  { label: '👜 Accessories', to: '/products' },
  { label: '🌿 Zero Waste', to: '/products' },
  { label: '☀️ Renewable Energy', to: '/products' },
];

const MISSION_STATS = [
  { value: '500+', label: 'Eco Products', icon: '🛒' },
  { value: '50k+', label: 'Green Shoppers', icon: '🌍' },
  { value: '12t', label: 'CO₂ Saved', icon: '♻️' },
  { value: '97%', label: 'Satisfaction', icon: '⭐' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subMsg, setSubMsg] = useState('');

  const handleNewsletter = e => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubMsg('🎉 You\'re subscribed! Check your inbox for eco tips.');
    setEmail('');
    setTimeout(() => setSubMsg(''), 5000);
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0a1628 0%, #060e1a 100%)',
      borderTop: '1px solid rgba(16,185,129,0.15)',
      color: '#94a3b8',
      marginTop: 'auto',
    }}>

      {/* Mission Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(5,150,105,0.08) 100%)',
        borderBottom: '1px solid rgba(16,185,129,0.1)',
        padding: '2.5rem 1.5rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '2rem', padding: '0.4rem 1.1rem', fontSize: '0.82rem', color: '#34d399', marginBottom: '1rem' }}>
              🌿 Our Sustainability Mission
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.75rem' }}>
              Every Purchase Powers a{' '}
              <span style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Greener Planet
              </span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
              EcoTrack is built on the belief that everyday shopping decisions can reshape the world. We rigorously vet every product for sustainability, carbon impact, and ethical sourcing — so you never have to compromise.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            {MISSION_STATS.map(({ value, label, icon }) => (
              <div key={label} style={{
                background: 'rgba(15,23,42,0.6)',
                border: '1px solid rgba(16,185,129,0.15)',
                borderRadius: '1rem',
                padding: '1.25rem',
                textAlign: 'center',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{icon}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>{value}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.15rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>

          {/* Brand + Newsletter */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.8rem' }}>🌿</span>
              <span style={{ fontWeight: 800, fontSize: '1.3rem', color: '#10b981', letterSpacing: '-0.5px' }}>EcoTrack</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem', color: '#64748b' }}>
              Empowering sustainable choices for a greener tomorrow. Certified eco-products, transparency scores, and green rewards — all in one place.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {[
                { icon: '🐦', label: 'Twitter' },
                { icon: '📸', label: 'Instagram' },
                { icon: '💼', label: 'LinkedIn' },
                { icon: '▶️', label: 'YouTube' },
              ].map(({ icon, label }) => (
                <a key={label} href="#" title={label} style={{
                  width: 36, height: 36,
                  background: 'rgba(30,41,59,0.8)', border: '1px solid #334155',
                  borderRadius: '0.5rem', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '0.9rem', textDecoration: 'none',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '0.75rem', padding: '1rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.5rem' }}>📬 Eco Newsletter</div>
              <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: '0.4rem' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    flex: 1, background: '#0f172a', border: '1px solid #334155',
                    borderRadius: '0.4rem', color: '#e2e8f0', padding: '0.45rem 0.6rem',
                    fontSize: '0.8rem', minWidth: 0,
                  }}
                />
                <button type="submit" style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: 'none', borderRadius: '0.4rem', color: '#fff',
                  padding: '0.45rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>
                  Join
                </button>
              </form>
              {subMsg && <div style={{ color: '#34d399', fontSize: '0.78rem', marginTop: '0.5rem' }}>{subMsg}</div>}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '1.25rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#10b981' }}>⚡</span> Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {QUICK_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s, gap 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#34d399'; e.currentTarget.style.gap = '0.6rem'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.gap = '0.4rem'; }}>
                    <span style={{ color: '#10b981', fontSize: '0.6rem' }}>▶</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '1.25rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#10b981' }}>🛒</span> Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {CATEGORIES.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s, gap 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#34d399'; e.currentTarget.style.gap = '0.6rem'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.gap = '0.4rem'; }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '1.25rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#10b981' }}>📞</span> Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {[
                { icon: '📍', title: 'Address', detail: '12 Green Lane, Eco Quarter\nLondon, EC1A 1BB, UK' },
                { icon: '📧', title: 'Email', detail: 'hello@ecotrack.green' },
                { icon: '📞', title: 'Phone', detail: '+44 20 7946 0123' },
                { icon: '🕒', title: 'Hours', detail: 'Mon–Fri: 9am – 6pm GMT' },
              ].map(({ icon, title, detail }) => (
                <div key={title} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '0.4rem',
                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', flexShrink: 0,
                  }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '1.25rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#10b981' }}>🏅</span> Certifications
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: '🌱', label: 'B Corp Certified', desc: 'Meets highest social & environmental standards' },
                { icon: '♻️', label: 'Carbon Neutral', desc: 'All operations & shipping offset' },
                { icon: '🌊', label: '1% for the Planet', desc: '1% of revenue donated to eco causes' },
                { icon: '🐝', label: 'Bee Friendly', desc: 'Pollinator-safe sourcing standards' },
              ].map(({ icon, label, desc }) => (
                <div key={label} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>{label}</div>
                    <div style={{ fontSize: '0.76rem', color: '#475569' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sustainability Pledge Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.05))',
          border: '1px solid rgba(16,185,129,0.12)',
          borderRadius: '1rem', padding: '1.5rem',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
          flexWrap: 'wrap', marginBottom: '2rem',
        }}>
          <div style={{ fontSize: '2.5rem' }}>🌏</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '0.25rem' }}>Our Sustainability Pledge</div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
              We commit to only listing products scoring 80+ on our eco rating system, partnering exclusively with ethical suppliers, and planting one tree for every 10 orders placed.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {['🌳 Trees Planted: 5,200', '🚚 Carbon-Neutral Shipping', '🤝 Fair Trade Partners'].map(badge => (
              <div key={badge} style={{
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: '2rem', padding: '0.3rem 0.75rem', fontSize: '0.78rem', color: '#34d399', whiteSpace: 'nowrap',
              }}>
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(30,41,59,0.8)',
          paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.82rem',
          alignItems: 'center',
        }}>
          <span style={{ color: '#475569' }}>© {new Date().getFullYear()} EcoTrack® — All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map(item => (
              <a key={item} href="#" style={{ color: '#475569', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#34d399'}
                onMouseLeave={e => e.target.style.color = '#475569'}>
                {item}
              </a>
            ))}
          </div>
          <span style={{ color: '#10b981', fontWeight: 600 }}>🌱 Carbon neutral since 2022</span>
        </div>
      </div>
    </footer>
  );
}
