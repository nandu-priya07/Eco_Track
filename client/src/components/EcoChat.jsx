import { useState, useRef, useEffect } from 'react';

const QUICK_REPLIES = [
  '♻️ Recycling tips',
  '🌱 Best eco products',
  '🌍 Reduce carbon footprint',
  '💧 Save water',
  '🏆 My eco points',
];

const BOT_AVATAR = '🌿';
const USER_AVATAR = '🙂';

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.1rem 0' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#10b981',
          display: 'inline-block',
          animation: `ecoBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isBot = msg.role === 'bot';
  return (
    <div style={{
      display: 'flex',
      flexDirection: isBot ? 'row' : 'row-reverse',
      gap: '0.5rem',
      alignItems: 'flex-end',
      animation: 'ecoChatIn 0.35s cubic-bezier(.34,1.56,.64,1) both',
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%',
        background: isBot ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.15)',
        border: isBot ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(99,102,241,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.9rem', flexShrink: 0,
      }}>
        {isBot ? BOT_AVATAR : USER_AVATAR}
      </div>
      <div style={{
        maxWidth: '75%',
        background: isBot
          ? 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.06))'
          : 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.12))',
        border: isBot ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(99,102,241,0.25)',
        borderRadius: isBot ? '1rem 1rem 1rem 0.2rem' : '1rem 1rem 0.2rem 1rem',
        padding: '0.65rem 0.9rem',
        fontSize: '0.875rem',
        color: '#e2e8f0',
        lineHeight: 1.55,
        whiteSpace: 'pre-wrap',
      }}>
        {msg.text}
      </div>
    </div>
  );
}

export default function EcoChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "👋 Hi! I'm **EcoBot**, your personal sustainability guide.\n\nAsk me anything about eco-friendly living, products, carbon footprint reduction, or your green journey! 🌍",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  async function sendMessage(text) {
    const userText = text.trim();
    if (!userText || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
      if (!open) setUnread(u => u + 1);
    } catch {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: '⚠️ Sorry, I couldn\'t connect right now. Make sure the server is running and try again!',
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      <style>{`
        @keyframes ecoBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes ecoChatIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ecoPopIn {
          from { opacity: 0; transform: scale(0.7) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ecoFabPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.55), 0 4px 24px rgba(16,185,129,0.35); }
          50% { box-shadow: 0 0 0 10px rgba(16,185,129,0), 0 4px 24px rgba(16,185,129,0.35); }
        }
        .eco-chat-fab { animation: ecoFabPulse 2.5s ease-in-out infinite; }
        .eco-chat-fab:hover { transform: scale(1.1) !important; }
        .eco-quick-chip:hover { background: rgba(16,185,129,0.2) !important; border-color: #10b981 !important; color: #34d399 !important; transform: translateY(-1px); }
        .eco-send-btn:hover { background: linear-gradient(135deg, #34d399, #10b981) !important; box-shadow: 0 0 14px rgba(16,185,129,0.5); }
        .eco-chat-input:focus { outline: none; border-color: #10b981; box-shadow: 0 0 0 2px rgba(16,185,129,0.15); }
      `}</style>

      {/* Floating Action Button */}
      <button
        id="eco-chat-fab"
        className="eco-chat-fab"
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: '1.75rem', right: '1.75rem', zIndex: 9999,
          width: 60, height: 60, borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          border: 'none', cursor: 'pointer', color: '#fff',
          fontSize: '1.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s ease',
        }}
        aria-label="Open EcoBot chat"
      >
        {open ? '✕' : '🌿'}
        {!open && unread > 0 && (
          <div style={{
            position: 'absolute', top: -4, right: -4,
            width: 20, height: 20, borderRadius: '50%',
            background: '#ef4444', color: '#fff',
            fontSize: '0.7rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {unread}
          </div>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          id="eco-chat-window"
          style={{
            position: 'fixed', bottom: '5.5rem', right: '1.75rem', zIndex: 9998,
            width: 'min(380px, calc(100vw - 2rem))',
            height: 'min(560px, calc(100vh - 7rem))',
            display: 'flex', flexDirection: 'column',
            background: 'rgba(15,23,42,0.92)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.1) inset',
            animation: 'ecoPopIn 0.3s cubic-bezier(.34,1.56,.64,1) both',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1rem 1.25rem',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1))',
            borderBottom: '1px solid rgba(16,185,129,0.15)',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', flexShrink: 0,
              boxShadow: '0 0 12px rgba(16,185,129,0.4)',
            }}>
              🌿
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.95rem' }}>EcoBot</div>
              <div style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'ecoBounce 2s ease-in-out infinite' }} />
                Online · AI Sustainability Guide
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%', width: 28, height: 28, cursor: 'pointer',
                color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '1rem',
            display: 'flex', flexDirection: 'column', gap: '0.75rem',
          }}>
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.9rem', flexShrink: 0,
                }}>
                  {BOT_AVATAR}
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.06))',
                  border: '1px solid rgba(16,185,129,0.2)',
                  borderRadius: '1rem 1rem 1rem 0.2rem',
                  padding: '0.65rem 0.9rem',
                }}>
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div style={{
              padding: '0.5rem 1rem',
              display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
              borderTop: '1px solid rgba(51,65,85,0.4)',
            }}>
              {QUICK_REPLIES.map(qr => (
                <button
                  key={qr}
                  className="eco-quick-chip"
                  onClick={() => sendMessage(qr)}
                  style={{
                    background: 'rgba(16,185,129,0.08)',
                    border: '1px solid rgba(16,185,129,0.2)',
                    borderRadius: '2rem', padding: '0.3rem 0.75rem',
                    color: '#94a3b8', fontSize: '0.77rem', cursor: 'pointer',
                    transition: 'all 0.2s', fontWeight: 500,
                  }}
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '0.75rem 1rem',
            borderTop: '1px solid rgba(51,65,85,0.4)',
            display: 'flex', gap: '0.5rem', alignItems: 'flex-end',
          }}>
            <textarea
              ref={inputRef}
              className="eco-chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask EcoBot anything… 🌱"
              rows={1}
              style={{
                flex: 1, resize: 'none',
                background: 'rgba(30,41,59,0.8)',
                border: '1px solid #334155',
                borderRadius: '0.75rem',
                color: '#e2e8f0', padding: '0.6rem 0.85rem',
                fontSize: '0.875rem', lineHeight: 1.5,
                fontFamily: 'inherit',
                maxHeight: 120, overflowY: 'auto',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
            />
            <button
              className="eco-send-btn"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : 'rgba(51,65,85,0.6)',
                border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                color: '#fff', fontSize: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', flexShrink: 0,
              }}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
