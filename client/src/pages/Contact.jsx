import { useState } from 'react';

const CONTACT_INFO = [
  { icon: '📧', label: 'Email', value: 'hello@ecotrack.io' },
  { icon: '📞', label: 'Phone', value: '+1 (800) ECO-TRACK' },
  { icon: '📍', label: 'Location', value: 'San Francisco, CA' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Fri, 9am–6pm PST' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSent(true);
      setSending(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="section-title">📬 Get in <span className="gradient-text">Touch</span></h1>
        <p className="section-subtitle">We'd love to hear from you. Let's make the planet greener together.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
        {/* Contact Info */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {CONTACT_INFO.map(({ icon, label, value }) => (
              <div key={label} className="glass" style={{ borderRadius: '1rem', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{label}</div>
                  <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="glass" style={{ borderRadius: '1rem', padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>❓ Frequently Asked</h3>
            {[
              ['Are all products eco-certified?', 'Yes! Every product undergoes our rigorous sustainability audit.'],
              ['How do I earn eco points?', 'You earn points on every purchase and completed challenge.'],
              ['Do you ship internationally?', 'We ship to 40+ countries with carbon-neutral delivery.'],
            ].map(([q, a]) => (
              <div key={q} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(51,65,85,0.5)' }}>
                <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '0.3rem', fontSize: '0.9rem' }}>{q}</div>
                <div style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          <div className="glass" style={{ borderRadius: '1.25rem', padding: '2rem' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button className="btn-eco" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="eco-label">Name</label>
                    <input className="eco-input" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="eco-label">Email</label>
                    <input className="eco-input" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div>
                  <label className="eco-label">Subject</label>
                  <input className="eco-input" name="subject" placeholder="How can we help?" value={form.subject} onChange={handleChange} required />
                </div>
                <div>
                  <label className="eco-label">Message</label>
                  <textarea className="eco-input" name="message" rows={5} placeholder="Tell us more..." value={form.message} onChange={handleChange} required
                    style={{ resize: 'vertical' }} />
                </div>
                <button className="btn-eco" type="submit" disabled={sending} style={{ fontSize: '1rem', padding: '0.8rem', justifyContent: 'center', opacity: sending ? 0.7 : 1 }}>
                  {sending ? '📤 Sending...' : '📩 Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Social links */}
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {[['🐦', 'Twitter'], ['📸', 'Instagram'], ['💼', 'LinkedIn'], ['📘', 'Facebook']].map(([icon, name]) => (
              <a key={name} href="#" title={name} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
                background: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem',
                padding: '0.75rem 1rem', textDecoration: 'none', color: '#94a3b8', fontSize: '0.75rem',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.color = '#10b981'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#94a3b8'; }}>
                <span style={{ fontSize: '1.3rem' }}>{icon}</span>
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
