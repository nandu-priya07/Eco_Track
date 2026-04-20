import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CATEGORIES = ['All', 'Kitchen', 'Electronics', 'Accessories', 'Bathroom'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cartNotif, setCartNotif] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setCartNotif(`✓ ${product.name} added to cart!`);
    setTimeout(() => setCartNotif(''), 3000);
  };

  const handleBuyNow = (product) => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  // Get top eco-rated products for recommendations
  const topRecommendations = products
    .filter(p => p.score >= 90)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Cart Notification */}
      {cartNotif && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
          background: '#10b981', color: '#fff', padding: '1rem 1.5rem',
          borderRadius: '0.75rem', fontWeight: 600, animation: 'slideIn 0.3s ease',
        }}>
          {cartNotif}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="section-title">Eco-Friendly <span className="gradient-text">Products</span></h1>
        <p className="section-subtitle">Sustainable choices for every area of your life</p>
      </div>

      {/* Top Recommendations Section */}
      {topRecommendations.length > 0 && (
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>⭐ Our Top Eco Picks</span>
            <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, #10b981, transparent)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {topRecommendations.map((p, idx) => (
              <div key={p.id} className="glass" style={{
                borderRadius: '1rem', overflow: 'hidden',
                border: '2px solid #10b981', background: 'rgba(16,185,129,0.05)',
              }}>
                <div style={{ position: 'relative', height: '200px' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    background: '#10b981', color: '#fff', padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 700,
                  }}>
                    #{idx + 1} Pick • ♻ {p.score}/100
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted-dark)', marginBottom: '1rem' }}>
                    {p.category} • Sustainability Score: {p.score}/100
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981' }}>₹{(p.price * 25).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => handleBuyNow(p)}
                      className="btn-eco"
                      style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}
                    >
                      🚀 Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(p)}
                      style={{
                        flex: 1, padding: '0.5rem', fontSize: '0.85rem',
                        background: 'transparent', border: '1px solid #10b981',
                        borderRadius: '0.5rem', color: '#10b981', fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(16,185,129,0.1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      🛒 Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center' }}>
        <input
          className="eco-input"
          style={{ maxWidth: '280px' }}
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.45rem 1rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                background: activeCategory === cat ? '#10b981' : 'var(--color-eco-card)',
                color: activeCategory === cat ? '#fff' : 'var(--color-text-muted)',
                transition: 'all 0.2s',
              }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', color: '#10b981', padding: '4rem', fontSize: '1.1rem' }}>🌱 Loading eco products...</div>
      ) : (
        <>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
            All Products ({filtered.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {filtered.map(p => (
              <div key={p.id} className="card-hover glass" style={{ borderRadius: '1rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '210px', overflow: 'hidden', position: 'relative' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    background: p.score >= 90 ? '#10b981' : '#f59e0b',
                    borderRadius: '0.5rem', padding: '0.25rem 0.6rem', fontSize: '0.8rem', fontWeight: 700, color: '#fff',
                  }}>
                    ♻ {p.score}/100
                  </div>
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(var(--color-eco-bg-rgb),0.8)', borderRadius: '0.5rem', padding: '0.25rem 0.6rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {p.category}
                  </div>
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '1rem', padding: '0.15rem 0.6rem', fontSize: '0.75rem', color: '#34d399' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.75rem', fontSize: '1.05rem' }}>{p.name}</h3>
                  <div style={{ marginBottom: '1rem', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>₹{(p.price * 25).toFixed(2)}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button
                      onClick={() => handleBuyNow(p)}
                      className="btn-eco"
                      style={{ flex: 1, padding: '0.45rem', fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      🚀 Buy
                    </button>
                    <button
                      onClick={() => handleAddToCart(p)}
                      style={{
                        flex: 1, padding: '0.45rem', fontSize: '0.85rem',
                        background: 'transparent', border: '1px solid #10b981',
                        borderRadius: '0.5rem', color: '#10b981', fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(16,185,129,0.1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      🛒 Cart
                    </button>
                    <Link to={`/products/${p.id}`} style={{
                      flex: 0.8, padding: '0.45rem', fontSize: '0.85rem',
                      background: 'transparent', border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem', color: 'var(--color-text-muted)', fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--color-text-body)';
                        e.currentTarget.style.color = 'var(--color-text-body)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.color = 'var(--color-text-muted)';
                      }}
                    >
                      ℹ️
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted-dark)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
