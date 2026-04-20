import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['Kitchen', 'Electronics', 'Accessories', 'Bathroom', 'Zero Waste', 'Renewable Energy'];
const EMPTY_FORM = { name: '', category: 'Kitchen', price: '', score: '', tags: '', features: '' };

function Modal({ title, children, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--color-eco-card)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '1.25rem', width: '100%', maxWidth: 560, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(51,65,85,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16,185,129,0.06)' }}>
          <h3 style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '1.1rem' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

function ProductForm({ form, setForm, onSubmit, loading, submitLabel }) {


  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Name */}
        <div>
          <label className="eco-label">Product Name</label>
          <input className="eco-input" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Bamboo Toothbrush Set" />
        </div>
        {/* Category + Price + Score row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label className="eco-label">Category</label>
            <select className="eco-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ cursor: 'pointer' }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="eco-label">Price (₹)</label>
            <input className="eco-input" type="number" min="0" step="0.01" required value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="0.00" />
          </div>
          <div>
            <label className="eco-label">Eco Score (0–100)</label>
            <input className="eco-input" type="number" min="0" max="100" required value={form.score} onChange={e => setForm(f => ({ ...f, score: e.target.value }))} placeholder="85" />
            {form.score && (
              <div style={{ marginTop: '0.3rem', height: 4, borderRadius: 99, background: 'var(--color-eco-bg)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${form.score}%`, background: form.score >= 80 ? '#10b981' : form.score >= 60 ? '#f59e0b' : '#ef4444', transition: 'width 0.3s' }} />
              </div>
            )}
          </div>
        </div>
        {/* Tags */}
        <div>
          <label className="eco-label">Tags (comma-separated)</label>
          <input className="eco-input" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="bamboo, zero-waste, organic" />
        </div>
        {/* Features */}
        <div>
          <label className="eco-label">Features (comma-separated)</label>
          <input className="eco-input" value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} placeholder="Biodegradable handle, BPA-free" />
        </div>


        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.85rem', background: loading ? 'rgba(16,185,129,0.5)' : 'linear-gradient(135deg,#10b981,#059669)',
            border: 'none', borderRadius: '0.6rem', color: '#fff', fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}
        >
          {loading
            ? <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Saving…</>
            : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default function MerchantDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'merchant') { navigate('/login'); return; }
    fetchProducts();
  }, [user]);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/merchant/products', {
        headers: { 'x-user-id': user?.id },
      });
      const data = await res.json();
      setProducts(data);
    } catch { showToast('⚠️ Failed to load products'); }
    finally { setLoading(false); }
  };

  const openAdd = () => { setForm(EMPTY_FORM); setShowAdd(true); };
  const openEdit = p => {
    setForm({
      name: p.name, category: p.category, price: p.price, score: p.score,
      tags: p.tags.join(', '), features: p.features.join(', '),
    });
    setEditProduct(p);
  };

  const parseForm = () => ({
    name: form.name.trim(),
    category: form.category,
    price: parseFloat(form.price),
    score: parseInt(form.score),
    tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
    features: form.features.split(',').map(s => s.trim()).filter(Boolean),
  });

  const handleAdd = async e => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch('/api/merchant/products', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-user-id': user.id },
        body: JSON.stringify(parseForm()),
      });
      if (!res.ok) throw new Error();
      await fetchProducts();
      setShowAdd(false);
      showToast('✅ Product added successfully!');
    } catch { showToast('⚠️ Failed to add product'); }
    finally { setFormLoading(false); }
  };

  const handleEdit = async e => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch(`/api/merchant/products/${editProduct.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-user-id': user.id },
        body: JSON.stringify(parseForm()),
      });
      if (!res.ok) throw new Error();
      await fetchProducts();
      setEditProduct(null);
      showToast('✅ Product updated!');
    } catch { showToast('⚠️ Failed to update product'); }
    finally { setFormLoading(false); }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/merchant/products/${deleteId}`, {
        method: 'DELETE', headers: { 'x-user-id': user.id },
      });
      await fetchProducts();
      setDeleteId(null);
      showToast('🗑️ Product deleted');
    } catch { showToast('⚠️ Failed to delete'); }
  };

  const avgScore = products.length ? Math.round(products.reduce((s, p) => s + p.score, 0) / products.length) : 0;

  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-eco-bg)', padding: '2rem 1.5rem' }}>
      <style>{`
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes spin{to{transform:rotate(360deg);}}
        option{background:var(--color-eco-card);color:var(--color-text-body);}
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1.25rem', right: '1.25rem', zIndex: 3000,
          background: 'var(--color-eco-card)', border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: '0.75rem', padding: '0.75rem 1.25rem',
          color: 'var(--color-text-body)', fontSize: '0.9rem', fontWeight: 600,
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)', animation: 'fadeIn 0.3s ease',
        }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                🏪
              </div>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Merchant Dashboard</h1>
                <p style={{ color: 'var(--color-text-muted-dark)', fontSize: '0.85rem' }}>{user.storeName || user.name}</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              className="btn-eco"
              onClick={openAdd}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              ＋ Add Product
            </button>
            <button
              onClick={() => { logout(); navigate('/'); }}
              style={{
                padding: '0.6rem 1.1rem', background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.25)', borderRadius: '0.5rem',
                color: '#f87171', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { label: 'Total Products', value: products.length, icon: '📦', color: '#10b981' },
            { label: 'Avg Eco Score', value: `${avgScore}/100`, icon: '🌱', color: '#34d399' },
            { label: 'Active Listings', value: products.length, icon: '✅', color: '#6ee7b7' },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="glass" style={{ borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color }}>{value}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted-dark)', marginTop: '0.2rem' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Products Table */}
        <div className="glass" style={{ borderRadius: '1.25rem', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(51,65,85,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '1rem' }}>📦 Your Products</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted-dark)' }}>{products.length} listing{products.length !== 1 ? 's' : ''}</span>
          </div>

          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#10b981' }}>🌱 Loading products…</div>
          ) : products.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <p style={{ color: 'var(--color-text-muted-dark)', marginBottom: '1.25rem' }}>No products yet. Add your first eco product!</p>
              <button className="btn-eco" onClick={openAdd}>＋ Add Your First Product</button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(51,65,85,0.4)' }}>
                    {['Product', 'Category', 'Price', 'Eco Score', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'var(--color-text-muted-dark)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => {
                    const imgs = p.images || [p.image];
                    return (
                      <tr key={p.id} style={{ borderBottom: '1px solid rgba(51,65,85,0.2)', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.04)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: 36, height: 36, borderRadius: '0.4rem', overflow: 'hidden', background: 'var(--color-eco-bg)', flexShrink: 0 }}>
                              <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span style={{ fontWeight: 600, color: 'var(--color-text-main)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--color-text-muted)' }}>{p.category}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#10b981', fontWeight: 700 }}>₹{(parseFloat(p.price) * 25).toFixed(2)}</td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: 50, height: 5, background: 'var(--color-eco-bg)', borderRadius: 99, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${p.score}%`, background: p.score >= 80 ? '#10b981' : '#f59e0b', borderRadius: 99 }} />
                            </div>
                            <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.8rem' }}>{p.score}</span>
                          </div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <button
                              onClick={() => openEdit(p)}
                              style={{ padding: '0.35rem 0.75rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '0.4rem', color: '#34d399', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => setDeleteId(p.id)}
                              style={{ padding: '0.35rem 0.75rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '0.4rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <Modal title="➕ Add New Product" onClose={() => setShowAdd(false)}>
          <ProductForm form={form} setForm={setForm} onSubmit={handleAdd} loading={formLoading} submitLabel="➕ Add Product" />
        </Modal>
      )}

      {/* Edit Modal */}
      {editProduct && (
        <Modal title={`✏️ Edit: ${editProduct.name}`} onClose={() => setEditProduct(null)}>
          <ProductForm form={form} setForm={setForm} onSubmit={handleEdit} loading={formLoading} submitLabel="💾 Save Changes" />
        </Modal>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'var(--color-eco-card)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '1.25rem', padding: '2rem', width: '100%', maxWidth: 380, textAlign: 'center', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🗑️</div>
            <h3 style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Delete Product?</h3>
            <p style={{ color: 'var(--color-text-muted-dark)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>This action cannot be undone. The product will be permanently removed.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => setDeleteId(null)} className="btn-outline-eco" style={{ flex: 1 }}>Cancel</button>
              <button onClick={handleDelete} style={{ flex: 1, padding: '0.7rem', background: 'linear-gradient(135deg,#ef4444,#dc2626)', border: 'none', borderRadius: '0.5rem', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
