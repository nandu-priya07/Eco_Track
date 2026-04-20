import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Payment() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem', minHeight: 'calc(100vh - 200px)' }}>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
            No items to checkout
          </h2>
          <p style={{ color: 'var(--color-text-muted-dark)', fontSize: '1.05rem', marginBottom: '2rem' }}>
            Your cart is empty. Add products to proceed with payment.
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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate form
      if (!formData.fullName || !formData.email || !formData.phone || !formData.address || 
          !formData.city || !formData.zipCode || !formData.cardNumber || !formData.cvv) {
        throw new Error('Please fill all required fields');
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Clear cart and show success
      clearCart();
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem', minHeight: 'calc(100vh - 200px)' }}>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'pulse 2s infinite' }}>✅</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginBottom: '1rem' }}>
            Payment Successful!
          </h2>
          <p style={{ color: 'var(--color-text-muted-dark)', fontSize: '1.05rem', marginBottom: '1rem' }}>
            Thank you for your eco-friendly purchase. Your order has been confirmed.
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            A confirmation email has been sent to {formData.email}
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-eco"
            style={{ padding: '0.65rem 2rem', fontSize: '1rem' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = getTotalPrice() * 1.1; // Including 10% tax

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>
        Secure <span className="gradient-text">Payment</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }} className="responsive-grid">
        {/* Payment Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '0.75rem', padding: '1rem', color: '#ef4444', fontSize: '0.95rem',
            }}>
              {error}
            </div>
          )}

          {/* Shipping Information */}
          <div className="glass" style={{ borderRadius: '1rem', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>
              📍 Shipping Address
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="eco-input"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="eco-input"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="eco-input"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="eco-input"
                  placeholder="123 Main Street"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="eco-input"
                  placeholder="Mumbai"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="eco-input"
                  placeholder="400001"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="glass" style={{ borderRadius: '1rem', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>
              💳 Payment Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="eco-input"
                  placeholder="JOHN DOE"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="eco-input"
                  placeholder="4532 XXXX XXXX 1234"
                  maxLength="19"
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="eco-input"
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="eco-input"
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Order Summary */}
        <div className="glass" style={{ borderRadius: '1rem', padding: '1.5rem', height: 'fit-content', position: 'sticky', top: 100 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>
            Order Summary
          </h3>

          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', maxHeight: '300px', overflowY: 'auto' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted-dark)' }}>
                  {item.name} x {item.quantity}
                </span>
                <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                  ₹{(item.price * item.quantity * 25).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
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

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
            <span>Total</span>
            <span style={{ color: '#10b981' }}>₹{totalAmount.toFixed(2)}</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-eco"
            style={{
              width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', fontWeight: 700,
              opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? '🔄 Processing...' : '✓ Complete Payment'}
          </button>

          <button
            onClick={() => navigate('/cart')}
            disabled={loading}
            style={{
              width: '100%', marginTop: '0.75rem', padding: '0.75rem 1rem',
              background: 'transparent', border: '1px solid var(--color-border)',
              borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600,
              color: 'var(--color-text-muted)', transition: 'all 0.2s', opacity: loading ? 0.5 : 1,
            }}
            onMouseEnter={e => {
              if (!loading) {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.color = '#10b981';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
          >
            Back to Cart
          </button>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '0.75rem', fontSize: '0.8rem', color: 'var(--color-text-muted-dark)' }}>
            <div style={{ fontWeight: 600, color: 'var(--color-text-body)', marginBottom: '0.4rem' }}>🔒 Secure Payment</div>
            Your payment is encrypted and secure. We never store your card details.
          </div>
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
