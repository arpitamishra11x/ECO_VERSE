import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Leaf, Star, Sparkles, AlertCircle, CheckCircle, Percent } from 'lucide-react';
import { useEco } from '../context/EcoContext';
import styles from './RewardsPage.module.css';

const initialMissions = [
  { id: 'm1', title: 'Browse AI Recommendations', points: 20, xp: 50, claimed: false },
  { id: 'm2', title: 'Like a Community Discussion', points: 15, xp: 40, claimed: false },
  { id: 'm3', title: 'Create a Wishlist Collection', points: 25, xp: 60, claimed: false },
  { id: 'm4', title: 'Share your passport impact card', points: 30, xp: 80, claimed: false }
];

const rewardsStoreData = [
  { id: 'r1', name: '₹50 Store Coupon', desc: 'Get ₹50 off on any purchase. Valid on all products.', cost: 100, val: 50 },
  { id: 'r2', name: '₹150 Store Coupon', desc: 'Get ₹150 off on any order above ₹499. Save big!', cost: 250, val: 150 },
  { id: 'r3', name: 'Free Eco Bamboo Mug', desc: 'Redeem a limited edition organic bamboo mug. Free delivery.', cost: 400, val: 300 },
  { id: 'r4', name: 'Premium Recycled Totebag', desc: 'A beautiful vegetable-dyed organic canvas totebag.', cost: 350, val: 200 }
];

const badgeData = [
  { id: 'b1', name: 'Earth Guardian', desc: 'Given for hitting level 3 in eco-passport.', icon: Trophy },
  { id: 'b2', name: 'Waste Slayer', desc: 'Completed a Plastic-Free challenge.', icon: Leaf },
  { id: 'b3', name: 'Local Supporter', desc: 'Purchased directly from 3 local artisans.', icon: Star }
];

const RewardsPage = () => {
  const { user, redeemReward, triggerNotification } = useEco();
  const [missions, setMissions] = useState(initialMissions);
  const [activeTab, setActiveTab] = useState('missions');

  const handleClaimMission = (id, points, xp) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, claimed: true } : m));
    // Simulated XP and points updates
    user.points += points;
    user.xp += xp;
    triggerNotification(`Claimed! Earned ${points} Eco Points & ${xp} XP! ⚡`);
  };

  const handleRedeem = (cost, val, name) => {
    const code = redeemReward(cost, val, name);
    if (code) {
      triggerNotification(`Success! Unlocked coupon code: ${code}. Save it for checkout! 🎟️`);
    }
  };

  // XP calculations for level display
  const getLevelBound = (lvl) => {
    if (lvl === 'Sustainability Hero') return { min: 2500, max: 5000 };
    if (lvl === 'Earth Champion') return { min: 1500, max: 2500 };
    if (lvl === 'Planet Protector') return { min: 800, max: 1500 };
    return { min: 0, max: 800 };
  };

  const bounds = getLevelBound(user.level);
  const levelProgressPercent = Math.min(100, ((user.xp - bounds.min) / (bounds.max - bounds.min)) * 100);

  return (
    <div className={`container ${styles.rewardsPage}`}>
      
      {/* Header */}
      <div className={styles.rewardsHeader}>
        <h1 className={styles.rewardsTitle}>Gamification & Eco Rewards</h1>
        <p className={styles.rewardsSubtitle}>Earn Eco Points and XP by making sustainable purchasing and lifestyle decisions.</p>
      </div>

      {/* Top Level Progress Widgets */}
      <div className={styles.topRow}>
        
        {/* Points balance */}
        <div className={`${styles.card} ${styles.pointsDisplay}`}>
          <div className={styles.pointsCircle}>
            <span className={styles.pointsValue}>{user.points}</span>
            <span className={styles.pointsLbl}>Eco Points</span>
          </div>
          <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>Redeem points for store discount coupons.</span>
        </div>

        {/* Level & XP progression */}
        <div className={styles.card} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className={styles.levelTitleRow}>
            <div>
              <span className={styles.levelInstructions}>Current Level Status</span>
              <h2 className={styles.levelTitle}>{user.level}</h2>
            </div>
            <span className={styles.levelBadge}>Level {Math.floor(user.xp / 500) + 1}</span>
          </div>

          <p className={styles.levelInstructions}>
            You have earned <strong>{user.xp} Total XP</strong>. Earn <strong>{bounds.max - user.xp} more XP</strong> to unlock your next level badge.
          </p>

          <div>
            <div className={styles.xpText}>
              <span>{bounds.min} XP</span>
              <span>{user.xp} / {bounds.max} XP</span>
            </div>
            <div className={styles.xpBar}>
              <div className={styles.xpFill} style={{ width: `${levelProgressPercent}%` }} />
            </div>
          </div>
        </div>

      </div>

      {/* Rewards Store */}
      <section className={styles.storeSection}>
        <h2 className={styles.sectionTitle}>Eco Rewards Store</h2>
        <div className={styles.storeGrid}>
          {rewardsStoreData.map((reward) => (
            <div key={reward.id} className={styles.storeCard}>
              <div className={styles.rewardInfo}>
                <div className={styles.rewardCost}>
                  <Star size={14} fill="currentColor" />
                  <span>{reward.cost} Eco Points</span>
                </div>
                <h3 className={styles.rewardName}>{reward.name}</h3>
                <p className={styles.rewardDesc}>{reward.desc}</p>
              </div>
              <button 
                className={styles.redeemBtn} 
                disabled={user.points < reward.cost}
                onClick={() => handleRedeem(reward.cost, reward.val, reward.name)}
              >
                {user.points >= reward.cost ? 'Redeem Coupon' : 'Insufficient Points'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Unlocked Coupons List if user has any */}
      {user.coupons && user.coupons.filter(c => !c.used).length > 0 && (
        <section className={styles.storeSection} style={{ background: '#fdfbf7', border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '3rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Percent size={18} /> Unlocked Coupons (Ready to use at checkout)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {user.coupons.filter(c => !c.used).map((c, idx) => (
              <div key={idx} style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1.5px dashed var(--primary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>{c.name}</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{c.code}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Save ₹{c.value} off checkout.</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Missions & Achievements grid */}
      <div className={styles.gridTwoCol}>
        
        {/* Weekly Missions */}
        <div className={styles.card}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', marginBottom: '1rem' }}>Weekly Missions</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {missions.map((mission) => (
              <div key={mission.id} className={styles.missionItem}>
                <div className={styles.missionInfo}>
                  <h4 className={styles.missionTitle}>{mission.title}</h4>
                  <span className={styles.missionPoints}>+{mission.points} Points / +{mission.xp} XP</span>
                </div>
                {!mission.claimed ? (
                  <button 
                    className={styles.claimBtn}
                    onClick={() => handleClaimMission(mission.id, mission.points, mission.xp)}
                  >
                    Complete
                  </button>
                ) : (
                  <span className={styles.claimedState}>
                    <CheckCircle size={16} /> Completed
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className={styles.card}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', marginBottom: '1rem' }}>My Badges</h3>
          <div className={styles.badgeGrid}>
            {badgeData.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.id} className={styles.badgeCard}>
                  <div className={styles.badgeIcon}>
                    <Icon size={24} />
                  </div>
                  <span className={styles.badgeCardName}>{badge.name}</span>
                  <p className={styles.badgeCardDesc}>{badge.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

export default RewardsPage;
