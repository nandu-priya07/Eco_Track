import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Cart, 2: Shipping, 3: Payment
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('♻️ Order placed successfully! Thank you for shopping sustainably.');
      clearCart();
      navigate('/');
    }, 2000);
  };

  if (cartItems.length === 0 && step === 1) {
    return (
      <div style={{ maxWidth: '800px', margin: '6rem auto', textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🛒</div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text-main)', marginBottom: '1rem' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Looks like you haven't added any eco-friendly products yet.</p>
        <button onClick={() => navigate('/products')} className="btn-eco">Explore Products</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1 className="section-title">Secure <span className="gradient-text">Checkout</span></h1>
      
      {/* Stepper */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem' }}>
        {['Review Cart', 'Shipping', 'Payment'].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: step > i + 1 ? '#10b981' : step === i + 1 ? '#10b981' : 'var(--color-eco-card)',
              color: step >= i + 1 ? '#fff' : 'var(--color-text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem'
            }}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span style={{ fontWeight: 600, color: step >= i + 1 ? 'var(--color-text-main)' : 'var(--color-text-muted)', fontSize: '0.9rem' }}>{s}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2.5rem', alignItems: 'start' }}>
        {/* Left Side: Steps */}
        <div className="glass" style={{ borderRadius: '1.25rem', padding: '2rem' }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Review Your Items</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '0.75rem', overflow: 'hidden', background: 'var(--color-eco-bg)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{item.name}</h3>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{item.category}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: '#10b981' }}>₹{(item.price * 25 * item.quantity).toFixed(2)}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted-dark)' }}>Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="btn-eco" style={{ width: '100%', marginTop: '2rem', justifyContent: 'center' }}>Continue to Shipping</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Shipping Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label className="eco-label">Full Name</label>
                  <input className="eco-input" placeholder="NANDU PRIYA" />
                </div>
                <div>
                  <label className="eco-label">City</label>
                  <input className="eco-input" placeholder="CHENNAI" />
                </div>
                <div>
                  <label className="eco-label">Pincode</label>
                  <input className="eco-input" placeholder="600001" />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label className="eco-label">Address</label>
                  <textarea className="eco-input" style={{ minHeight: '80px' }} placeholder="123 Eco Street..." />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button onClick={() => setStep(1)} className="btn-outline-eco" style={{ flex: 1 }}>Back</button>
                <button onClick={() => setStep(3)} className="btn-eco" style={{ flex: 1, justifyContent: 'center' }}>Continue to Payment</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Payment Method</h2>
              <div style={{ background: 'rgba(16,185,129,0.05)', border: '1.5px solid #10b981', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>🛡️</span> Secure Eco-Pay
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Your carbon footprint from this transaction will be automatically offset by our reforestation partners.
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="eco-label">Card Number</label>
                  <input className="eco-input" placeholder="xxxx xxxx xxxx xxxx" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="eco-label">Expiry</label>
                    <input className="eco-input" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="eco-label">CVV</label>
                    <input className="eco-input" placeholder="xxx" />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                <button onClick={() => setStep(2)} className="btn-outline-eco" style={{ flex: 1 }}>Back</button>
                <button onClick={handlePlaceOrder} disabled={loading} className="btn-eco" style={{ flex: 1, justifyContent: 'center' }}>
                  {loading ? 'Processing...' : `Pay ₹${subtotal.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Summary */}
        <div className="glass" style={{ borderRadius: '1.25rem', padding: '1.5rem', position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Order Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Items Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Carbon Offset Fee</span>
              <span style={{ color: '#10b981' }}>FREE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Shipping</span>
              <span style={{ color: '#10b981' }}>₹0.00</span>
            </div>
            <div style={{ height: '1px', background: 'var(--color-border)', margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem', color: '#10b981' }}>
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(52,211,153,0.05)', borderRadius: '0.75rem', border: '1px dashed rgba(52,211,153,0.3)' }}>
            <p style={{ fontSize: '0.75rem', color: '#34d399', textAlign: 'center', fontWeight: 600 }}>
              🌿 This order saves approx. 4.2kg of CO2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
