import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ─── Star Picker ─────────────────────────────── */
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '0.25rem' }}>
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s} type="button"
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.6rem', padding: '0.1rem',
            color: s <= (hovered || value) ? '#f59e0b' : '#334155',
            transition: 'color 0.15s, transform 0.15s',
            transform: s <= (hovered || value) ? 'scale(1.15)' : 'scale(1)',
          }}
        >★</button>
      ))}
    </div>
  );
}

/* ─── Lightbox ─────────────────────────────────── */
function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [images.length, onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
        zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem',
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%', width: 40, height: 40, color: '#fff', fontSize: '1.1rem',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >✕</button>

      {/* Counter */}
      <div style={{ position: 'absolute', top: '1.25rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); setCurrent(c => (c - 1 + images.length) % images.length); }}
          style={{
            position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%', width: 48, height: 48, color: '#fff', fontSize: '1.4rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >‹</button>
      )}

      {/* Image */}
      <img
        src={images[current]}
        alt={`Photo ${current + 1}`}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 'min(90vw, 900px)', maxHeight: '80vh',
          objectFit: 'contain', borderRadius: '0.75rem',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          animation: 'scaleIn 0.2s ease',
        }}
      />

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); setCurrent(c => (c + 1) % images.length); }}
          style={{
            position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%', width: 48, height: 48, color: '#fff', fontSize: '1.4rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >›</button>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{
          position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '0.5rem',
        }}>
          {images.map((img, i) => (
            <div
              key={i}
              onClick={e => { e.stopPropagation(); setCurrent(i); }}
              style={{
                width: 52, height: 40, borderRadius: '0.4rem', overflow: 'hidden',
                border: `2px solid ${i === current ? '#10b981' : 'rgba(255,255,255,0.2)'}`,
                cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s',
                transform: i === current ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Reviews Section ─────────────────────────── */
function ReviewsSection({ productId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchReviews(); }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/products/${productId}/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch { }
    finally { setLoading(false); }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.rating === 0) { setError('Please select a star rating.'); return; }
    setSubmitting(true); setError('');
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': user.id },
        body: JSON.stringify({ rating: form.rating, comment: form.comment, reviewerName: user.name }),
      });
      if (!res.ok) throw new Error();
      await fetchReviews();
      setSubmitted(true);
      setForm({ rating: 0, comment: '' });
    } catch { setError('Failed to submit review. Please try again.'); }
    finally { setSubmitting(false); }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const dist = [5, 4, 3, 2, 1].map(s => ({
    star: s,
    count: reviews.filter(r => r.rating === s).length,
    pct: reviews.length ? Math.round((reviews.filter(r => r.rating === s).length / reviews.length) * 100) : 0,
  }));

  return (
    <div style={{ marginTop: '4rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        ⭐ Customer Reviews
        {avgRating && <span style={{ fontSize: '1rem', fontWeight: 600, color: '#f59e0b' }}>({avgRating}/5)</span>}
      </h2>

      {/* Summary */}
      {reviews.length > 0 && (
        <div className="glass" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', minWidth: 80 }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#f59e0b', lineHeight: 1 }}>{avgRating}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 2, margin: '0.4rem 0' }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= Math.round(parseFloat(avgRating)) ? '#f59e0b' : '#334155', fontSize: '1rem' }}>★</span>)}
            </div>
            <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            {dist.map(({ star, count, pct }) => (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem', width: 18, textAlign: 'right' }}>{star}</span>
                <span style={{ color: '#f59e0b', fontSize: '0.75rem' }}>★</span>
                <div style={{ flex: 1, height: 6, background: '#1e293b', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: '#f59e0b', borderRadius: 99, transition: 'width 0.5s ease' }} />
                </div>
                <span style={{ color: '#64748b', fontSize: '0.75rem', width: 20 }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Write a Review */}
      {user && user.role === 'customer' && !submitted && (
        <div className="glass" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem', border: '1px solid rgba(16,185,129,0.15)' }}>
          <h3 style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '1.25rem', fontSize: '1rem' }}>✍️ Write a Review</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label className="eco-label">Your Rating</label>
              <StarPicker value={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label className="eco-label">Your Review</label>
              <textarea
                className="eco-input"
                rows={3}
                value={form.comment}
                onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                placeholder="Share your experience with this product…"
                required
                style={{ resize: 'vertical', minHeight: 80 }}
              />
            </div>
            {error && <div style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '0.75rem' }}>⚠️ {error}</div>}
            <button
              type="submit"
              disabled={submitting}
              className="btn-eco"
              style={{ opacity: submitting ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              {submitting
                ? <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />Submitting…</>
                : '⭐ Submit Review'}
            </button>
          </form>
        </div>
      )}

      {submitted && (
        <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '0.75rem', padding: '1rem 1.25rem', color: '#34d399', marginBottom: '2rem', fontWeight: 600 }}>
          ✅ Thank you! Your review has been posted.
        </div>
      )}

      {!user && (
        <div className="glass" style={{ borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '2rem', textAlign: 'center', color: '#64748b' }}>
          <a href="/login" style={{ color: '#10b981', fontWeight: 700, textDecoration: 'none' }}>Sign in</a> to leave a review
        </div>
      )}

      {/* Review List */}
      {loading ? (
        <div style={{ color: '#10b981', padding: '2rem 0' }}>Loading reviews…</div>
      ) : reviews.length === 0 ? (
        <div style={{ color: '#475569', padding: '2rem', textAlign: 'center', border: '1px dashed #334155', borderRadius: '0.75rem' }}>
          No reviews yet. Be the first to review this product!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reviews.map((r, i) => (
            <div key={i} className="glass" style={{ borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#10b981', fontSize: '0.9rem' }}>
                    {r.reviewerName?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.9rem' }}>{r.reviewerName || 'Anonymous'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                      {new Date(r.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= r.rating ? '#f59e0b' : '#334155', fontSize: '0.95rem' }}>★</span>)}
                </div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.65 }}>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main ProductDetail ─────────────────────── */
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(false);
  const [cartMsg, setCartMsg] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        const found = data.find(p => p.id === parseInt(id));
        setProduct(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleCart = () => {
    setCartMsg('✅ Added to cart!');
    setTimeout(() => setCartMsg(''), 2500);
  };

  if (loading) return <div style={{ textAlign: 'center', color: '#10b981', padding: '5rem', fontSize: '1.2rem' }}>🌱 Loading…</div>;
  if (!product) return (
    <div style={{ textAlign: 'center', padding: '5rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍃</div>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Product not found.</p>
      <button className="btn-eco" onClick={() => navigate('/products')}>← Back to Products</button>
    </div>
  );



  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <style>{`
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.9);}to{opacity:1;transform:scale(1);}}
        @keyframes spin{to{transform:rotate(360deg);}}
      `}</style>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b', marginBottom: '2rem', alignItems: 'center' }}>
        <span style={{ cursor: 'pointer', color: '#10b981' }} onClick={() => navigate('/')}>Home</span>
        <span>›</span>
        <span style={{ cursor: 'pointer', color: '#10b981' }} onClick={() => navigate('/products')}>Products</span>
        <span>›</span>
        <span style={{ color: '#94a3b8' }}>{product.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'start' }}>

        {/* ─── Right: Info ─── */}
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {product.tags.map(t => (
              <span key={t} style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '1rem', padding: '0.2rem 0.7rem', fontSize: '0.8rem', color: '#34d399' }}>{t}</span>
            ))}
          </div>

          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.75rem' }}>{product.name}</h1>

          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#10b981', marginBottom: '1.5rem' }}>₹{(product.price * 25).toFixed(2)}</div>

          {/* Eco Score */}
          <div className="glass" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              🌿 Sustainability Score
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ position: 'relative', width: '90px', height: '90px', flexShrink: 0 }}>
                <svg viewBox="0 0 36 36" style={{ width: '90px', height: '90px', transform: 'rotate(-90deg)' }}>
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#1e293b" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10b981" strokeWidth="3"
                    strokeDasharray={`${product.score} 100`} strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', color: '#10b981' }}>
                  {product.score}
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '0.25rem' }}>
                  {product.score >= 90 ? 'Excellent 🌟' : product.score >= 75 ? 'Good 👍' : 'Fair ⚠️'}
                </div>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Out of 100 possible eco points</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '0.75rem' }}>Eco Features</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {product.features.map(feat => (
                <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#94a3b8', fontSize: '0.95rem' }}>
                  <span style={{ color: '#10b981' }}>✔</span> {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Cart message */}
          {cartMsg && (
            <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '0.5rem', padding: '0.5rem 1rem', color: '#34d399', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {cartMsg}
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-eco" style={{ flex: 1 }} onClick={handleCart}>🛒 Add to Cart</button>
              <button
                onClick={() => setWishlist(w => !w)}
                style={{
                  padding: '0.6rem 1rem', borderRadius: '0.5rem',
                  border: '1px solid #334155',
                  background: wishlist ? 'rgba(239,68,68,0.1)' : '#1e293b',
                  color: wishlist ? '#ef4444' : '#94a3b8',
                  cursor: 'pointer', fontSize: '1.2rem', transition: 'all 0.2s',
                }}
              >
                {wishlist ? '❤️' : '🤍'}
              </button>
            </div>
            <button style={{
              width: '100%', padding: '0.85rem', borderRadius: '0.5rem', border: 'none',
              background: 'linear-gradient(135deg,#065f46,#047857)',
              color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '1rem',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.target.style.opacity = '0.9'}
              onMouseLeave={e => e.target.style.opacity = '1'}>
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ReviewsSection productId={parseInt(id)} />



      <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
