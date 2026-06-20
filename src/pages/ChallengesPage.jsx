import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Check, UploadCloud, Target, Sparkles, X } from 'lucide-react';
import { useEco } from '../context/EcoContext';
import styles from './ChallengesPage.module.css';

const ChallengesPage = () => {
  const { challenges, enrollChallenge, submitChallengeProof, triggerNotification } = useEco();
  const [submittingProofChallengeId, setSubmittingProofChallengeId] = useState(null);
  const [proofText, setProofText] = useState('');

  const featuredChallenge = challenges.find(c => c.id === 'plasticFree') || challenges[0];
  const remainingChallenges = challenges.filter(c => c.id !== featuredChallenge.id);

  const handleSubmitProofText = (e) => {
    e.preventDefault();
    if (!proofText.trim()) return;
    submitChallengeProof(submittingProofChallengeId);
    setSubmittingProofChallengeId(null);
    setProofText('');
    triggerNotification('Proof submitted successfully! Your XP will be updated shortly.', 'success');
  };

  return (
    <div className={styles.page}>
      <div className="container">
        
        <div className={styles.header}>
          <h1 className={styles.title}>Monthly Eco Challenges</h1>
          <p className={styles.subtitle}>Join thousands of community members making a real-world impact. Earn exclusive badges, XP, and store discounts.</p>
        </div>

        {/* Featured Challenge */}
        <motion.div 
          className={styles.featured}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Leaf className={styles.featuredBg} size={300} />
          <div className={styles.featuredContent}>
            <span className={styles.featuredBadge}>Featured This Month</span>
            <h2 className={styles.featuredTitle}>{featuredChallenge.title}</h2>
            <p className={styles.featuredDesc}>{featuredChallenge.desc}</p>
            <div className={styles.featuredStats}>
              <span className={styles.featuredStat}><Users size={18} /> {featuredChallenge.participants} Joined</span>
              <span className={styles.featuredStat}><Target size={18} /> {featuredChallenge.points} XP Reward</span>
            </div>
            
            {featuredChallenge.progress < 100 ? (
              <button 
                className={styles.joinBtn}
                onClick={() => {
                  if (!featuredChallenge.joined) {
                    enrollChallenge(featuredChallenge.id);
                  } else {
                    setSubmittingProofChallengeId(featuredChallenge.id);
                  }
                }}
              >
                {!featuredChallenge.joined ? 'Join Challenge Now' : 'Submit Progress Proof'}
              </button>
            ) : (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '30px', fontWeight: 700 }}>
                <Check size={18} /> Challenge Completed
              </div>
            )}
          </div>
        </motion.div>

        {/* Other Challenges Grid */}
        <h3 className={styles.sectionTitle}>More Active Challenges</h3>
        <div className={styles.grid}>
          {remainingChallenges.map((ch, i) => (
            <motion.div 
              key={ch.id} 
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={styles.cardImgWrap}>
                <img src={ch.image} alt={ch.title} className={styles.cardImg} />
                <span className={styles.cardOverlay}><Sparkles size={12} /> {ch.points} XP</span>
              </div>
              <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>{ch.title}</h4>
                <p className={styles.cardDesc}>{ch.desc}</p>
                
                <div className={styles.progressWrap}>
                  <div className={styles.progressInfo}>
                    <span>Progress</span>
                    <span>{ch.progress}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${ch.progress}%` }} />
                  </div>
                </div>

                {ch.progress < 100 ? (
                  <button 
                    className={`${styles.cardBtn} ${!ch.joined ? styles.cardBtnJoin : styles.cardBtnSubmit}`}
                    onClick={() => {
                      if (!ch.joined) {
                        enrollChallenge(ch.id);
                      } else {
                        setSubmittingProofChallengeId(ch.id);
                      }
                    }}
                  >
                    {!ch.joined ? 'Join Challenge' : <><UploadCloud size={16} /> Submit Proof</>}
                  </button>
                ) : (
                  <div className={styles.cardCompleted}>
                    <Check size={16} /> Completed
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proof Submission Modal */}
        {submittingProofChallengeId && (
          <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setSubmittingProofChallengeId(null)}>
            <div className="modal-card" style={{ background: '#fff', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '400px', boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.25rem' }}>Submit Challenge Proof</h3>
                <button onClick={() => setSubmittingProofChallengeId(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={20} />
                </button>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                Enter notes or upload a photo showing your eco effort. Community moderators will review this to award your XP.
              </p>
              <form onSubmit={handleSubmitProofText}>
                <textarea
                  placeholder="What did you do? (e.g. Carried my copper bottle to work all week!)"
                  value={proofText}
                  onChange={(e) => setProofText(e.target.value)}
                  style={{ width: '100%', height: '120px', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', outline: 'none', resize: 'none', fontSize: '0.9rem' }}
                  required
                />
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit for Review</button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChallengesPage;
