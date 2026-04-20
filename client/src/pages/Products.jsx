import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Kitchen', 'Electronics', 'Accessories', 'Bathroom'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

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

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="section-title">Eco-Friendly <span className="gradient-text">Products</span></h1>
        <p className="section-subtitle">Sustainable choices for every area of your life</p>
      </div>

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
          <p style={{ color: 'var(--color-text-muted-dark)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {filtered.map(p => (
              <div key={p.id} className="card-hover glass" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
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
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '1rem', padding: '0.15rem 0.6rem', fontSize: '0.75rem', color: '#34d399' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.75rem', fontSize: '1.05rem' }}>{p.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>₹{(p.price * 25).toFixed(2)}</span>
                    <Link to={`/products/${p.id}`} className="btn-eco" style={{ textDecoration: 'none', padding: '0.4rem 1rem', fontSize: '0.875rem' }}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted-dark)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍃</div>
              <p>No products found. Try a different filter.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
