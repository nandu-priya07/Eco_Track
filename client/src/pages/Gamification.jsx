import { useState } from 'react';

const CHALLENGES = [
  { id: 1, icon: '🚲', title: 'Commute Green', desc: 'Use public transport or cycle for 5 days straight.', points: 200, progress: 60, difficulty: 'Easy' },
  { id: 2, icon: '🥗', title: 'Plant-Based Week', desc: 'Eat plant-based meals for 7 consecutive days.', points: 350, progress: 40, difficulty: 'Medium' },
  { id: 3, icon: '♻️', title: 'Zero Plastic', desc: 'Avoid single-use plastics for an entire month.', points: 500, progress: 25, difficulty: 'Hard' },
  { id: 4, icon: '💡', title: 'Energy Saver', desc: 'Reduce home electricity usage by 20% this month.', points: 300, progress: 70, difficulty: 'Medium' },
  { id: 5, icon: '🌳', title: 'Tree Planter', desc: 'Plant or sponsor 3 trees in your community.', points: 400, progress: 10, difficulty: 'Hard' },
  { id: 6, icon: '🛍️', title: 'Eco Shopper', desc: 'Make 5 purchases from EcoTrack this month.', points: 150, progress: 80, difficulty: 'Easy' },
];

const REWARDS = [
  { icon: '🎫', title: '10% Off Coupon', cost: 500, desc: 'Redeem for 10% off your next order.' },
  { icon: '🌱', title: 'Plant a Tree', cost: 800, desc: "We'll plant a tree in your name." },
  { icon: '👕', title: 'EcoTrack Tee', cost: 1500, desc: 'Organic cotton EcoTrack t-shirt.' },
  { icon: '🎒', title: 'Eco Starter Kit', cost: 2500, desc: 'Bamboo straw set + beeswax wraps.' },
];

const LEADERBOARD = [
  { rank: 1, name: 'GreenGuru', points: 4820, badge: '🥇' },
  { rank: 2, name: 'EcoWarrior42', points: 4200, badge: '🥈' },
  { rank: 3, name: 'SustainSam', points: 3750, badge: '🥉' },
  { rank: 4, name: 'NatureLover', points: 3100, badge: '🏅' },
  { rank: 5, name: 'You', points: 1240, badge: '⭐', isYou: true },
];

const DIFF_COLOR = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };

export default function Gamification() {
  const [ecoPoints] = useState(1240);
  const [joined, setJoined] = useState({});
  const [redeemed, setRedeemed] = useState({});

  const joinChallenge = id => {
    setJoined(j => ({ ...j, [id]: !j[id] }));
  };

  const redeem = (title, cost) => {
    if (redeemed[title]) return;
    setRedeemed(r => ({ ...r, [title]: true }));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="section-title">🏆 Eco <span className="gradient-text">Challenges</span></h1>
        <p className="section-subtitle">Complete challenges, earn points, unlock exclusive rewards</p>
      </div>


      {/* Criteria Table */}
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1rem' }}>How to Earn Points</h2>
      <div className="glass" style={{ borderRadius: '1rem', overflow: 'hidden', marginBottom: '3rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ background: 'rgba(16,185,129,0.08)', borderBottom: '1px solid rgba(16,185,129,0.2)' }}>
              <th style={{ padding: '0.85rem 1.5rem', textAlign: 'left', color: 'var(--color-text-main)', fontWeight: 700 }}>Activity</th>
              <th style={{ padding: '0.85rem 1.5rem', textAlign: 'left', color: 'var(--color-text-main)', fontWeight: 700 }}>Points Earned</th>
            </tr>
          </thead>
          <tbody>
            {[
              { act: 'Daily Check-in Streak', pts: '+5 pts/day' },
              { act: 'Use Green Transport', pts: '+15 pts' },
              { act: 'Log a Recycling Session', pts: '+20 pts' },
              { act: 'Purchase Eco Product', pts: '+50 pts/item' },
              { act: 'Complete Challenge', pts: '+100 - 500 pts' },
            ].map((row, i) => (
              <tr key={row.act} style={{ borderBottom: i !== 4 ? '1px solid var(--color-border)' : 'none' }}>
                <td style={{ padding: '0.85rem 1.5rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#10b981' }}>✔</span> {row.act}
                </td>
                <td style={{ padding: '0.85rem 1.5rem', color: '#10b981', fontWeight: 700 }}>{row.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Points Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b, #065f46)',
        borderRadius: '1.25rem', padding: '2rem', marginBottom: '3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <div>
          <p style={{ color: '#a7f3d0', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Your Eco Points</p>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fff' }}>{ecoPoints.toLocaleString()} <span style={{ fontSize: '1.5rem' }}>pts</span></div>
          <p style={{ color: '#6ee7b7', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Rank: <strong style={{ color: '#fff' }}>🌱 Seedling</strong> — 760 pts to next tier
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[['🔥', 'Day Streak', '12'], ['✅', 'Completed', '4'], ['🎯', 'Active', '2']].map(([icon, label, val]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.3rem' }}>{val}</div>
              <div style={{ color: '#a7f3d0', fontSize: '0.8rem' }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '200px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#a7f3d0' }}>
            <span>Progress to next level</span><span>{Math.round((ecoPoints / 2000) * 100)}%</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#34d399', width: `${Math.min((ecoPoints / 2000) * 100, 100)}%`, height: '100%', borderRadius: '9999px', transition: 'width 0.5s ease' }} />
          </div>
          <p style={{ color: '#6ee7b7', fontSize: '0.8rem' }}>2000 pts = 🌿 Eco Guardian</p>
        </div>
      </div>

      {/* Challenges */}
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>Active Challenges</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        {CHALLENGES.map(ch => (
          <div key={ch.id} className="card-hover glass" style={{ borderRadius: '1rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2.5rem' }}>{ch.icon}</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: DIFF_COLOR[ch.difficulty], background: `${DIFF_COLOR[ch.difficulty]}20`, padding: '0.2rem 0.6rem', borderRadius: '1rem' }}>
                  {ch.difficulty}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981' }}>+{ch.points} pts</span>
              </div>
            </div>
            <h3 style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>{ch.title}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.5 }}>{ch.desc}</p>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted-dark)', marginBottom: '0.3rem' }}>
                <span>Progress</span><span>{ch.progress}%</span>
              </div>
              <div style={{ background: 'var(--color-eco-card)', borderRadius: '9999px', height: '6px', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #10b981, #34d399)', width: `${ch.progress}%`, height: '100%', borderRadius: '9999px' }} />
              </div>
            </div>
            <button
              onClick={() => joinChallenge(ch.id)}
              className={joined[ch.id] ? 'btn-outline-eco' : 'btn-eco'}
              style={{ width: '100%', justifyContent: 'center' }}>
              {joined[ch.id] ? '✔ Joined' : '🎯 Join Challenge'}
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
        {/* Rewards */}
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>🎁 Rewards Store</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {REWARDS.map(r => (
              <div key={r.title} className="glass" style={{ borderRadius: '1rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem', flexShrink: 0 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.15rem' }}>{r.title}</div>
                  <div style={{ color: 'var(--color-text-muted-dark)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>{r.desc}</div>
                  <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>🌿 {r.cost} pts</div>
                </div>
                <button
                  onClick={() => redeem(r.title, r.cost)}
                  disabled={ecoPoints < r.cost || redeemed[r.title]}
                  style={{
                    padding: '0.45rem 0.9rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: ecoPoints < r.cost || redeemed[r.title] ? 'not-allowed' : 'pointer', fontSize: '0.8rem',
                    background: redeemed[r.title] ? '#064e3b' : ecoPoints < r.cost ? 'var(--color-eco-card)' : '#10b981',
                    color: redeemed[r.title] ? '#34d399' : ecoPoints < r.cost ? 'var(--color-border-light)' : '#fff',
                    whiteSpace: 'nowrap',
                  }}>
                  {redeemed[r.title] ? '✔ Redeemed' : ecoPoints < r.cost ? 'Not enough pts' : 'Redeem'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>🌍 Leaderboard</h2>
          <div className="glass" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
            {LEADERBOARD.map((user, i) => (
              <div key={user.rank} style={{
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem',
                borderBottom: i < LEADERBOARD.length - 1 ? '1px solid rgba(51,65,85,0.5)' : 'none',
                background: user.isYou ? 'rgba(16,185,129,0.08)' : 'transparent',
              }}>
                <div style={{ fontSize: '1.4rem', width: '2rem', textAlign: 'center' }}>{user.badge}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: user.isYou ? '#10b981' : 'var(--color-text-main)', fontSize: '0.95rem' }}>
                    {user.name} {user.isYou && <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted-dark)' }}>(you)</span>}
                  </div>
                </div>
                <div style={{ fontWeight: 800, color: '#10b981', fontSize: '0.95rem' }}>{user.points.toLocaleString()} pts</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
