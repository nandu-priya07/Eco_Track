import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem', minHeight: 'calc(100vh - 200px)' }}>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
            Your cart is empty
          </h2>
          <p style={{ color: 'var(--color-text-muted-dark)', fontSize: '1.05rem', marginBottom: '2rem' }}>
            Discover eco-friendly products and add them to your cart!
          </p>
          <button
            onClick={() => navigate('/products')}
            className="btn-eco"
            style={{ padding: '0.65rem 2rem', fontSize: '1rem' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>
        Shopping <span className="gradient-text">Cart</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', marginBottom: '2rem' }} className="responsive-grid">
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {cart.map(item => (
            <div key={item.id} className="glass" style={{ borderRadius: '1rem', padding: '1.5rem', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1.5rem', alignItems: 'start' }}>
              {/* Image */}
              <div style={{ height: 120, borderRadius: '0.75rem', overflow: 'hidden', background: 'var(--color-eco-card)' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.3rem' }}>
                    {item.name}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted-dark)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    {item.category} • ♻ {item.score}/100
                  </p>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>
                    ₹{(item.price * 25).toFixed(2)}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  {/* Quantity */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-eco-card)', borderRadius: '0.5rem', padding: '0.3rem' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        width: 32, height: 32, fontSize: '1rem', color: '#10b981',
                        borderRadius: '0.4rem', transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                      −
                    </button>
                    <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600, color: 'var(--color-text-main)' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        width: 32, height: 32, fontSize: '1rem', color: '#10b981',
                        borderRadius: '0.4rem', transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div style={{ fontSize: '0.95rem', color: 'var(--color-text-muted-dark)' }}>
                    Subtotal: <span style={{ fontWeight: 700, color: '#10b981' }}>₹{(item.price * item.quantity * 25).toFixed(2)}</span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                      color: '#ef4444', borderRadius: '0.5rem', padding: '0.35rem 0.75rem',
                      cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                      transition: 'all 0.2s', marginLeft: 'auto',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
                      e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="glass" style={{ borderRadius: '1rem', padding: '1.5rem', height: 'fit-content', position: 'sticky', top: 100 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted-dark)' }}>Subtotal</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted-dark)' }}>Shipping</span>
              <span style={{ fontWeight: 600, color: '#10b981' }}>FREE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted-dark)' }}>Tax (10%)</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>₹{(getTotalPrice() * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
            <span>Total</span>
            <span style={{ color: '#10b981' }}>₹{(getTotalPrice() * 1.1).toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate('/payment')}
            className="btn-eco"
            style={{ width: '100%', padding: '0.75rem 1rem', marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 700 }}
          >
            Proceed to Payment
          </button>

          <button
            onClick={() => navigate('/products')}
            style={{
              width: '100%', padding: '0.75rem 1rem',
              background: 'transparent', border: '1px solid var(--color-border)',
              borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600,
              color: 'var(--color-text-muted)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#10b981';
              e.currentTarget.style.color = '#10b981';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
          >
            Continue Shopping
          </button>

          <button
            onClick={clearCart}
            style={{
              width: '100%', marginTop: '0.75rem', padding: '0.5rem 1rem',
              background: 'transparent', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.85rem',
              color: '#ef4444', transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#ef4444';
              e.currentTarget.style.background = 'rgba(239,68,68,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
