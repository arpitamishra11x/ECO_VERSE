import React from 'react';
import { Target, Medal, ArrowRight } from 'lucide-react';
import styles from './EcoChallenge.module.css';

const EcoChallenge = () => {
  return (
    <section className={styles.challengeSection}>
      <div className={`container ${styles.challengeContainer}`}>
        <div className={styles.challengeContent}>
          <div className={styles.badge}>
            <Target size={16} /> Monthly Challenge
          </div>
          <h2 className={styles.challengeTitle}>Plastic-Free Week</h2>
          <p className={styles.challengeDesc}>
            Join thousands of others in pledging to go plastic-free for one week. Small actions lead to big impacts.
          </p>
          
          <div className={styles.progressArea}>
            <div className={styles.progressHeader}>
              <span>Community Progress</span>
              <strong>65% to Goal</strong>
            </div>
            <div className={styles.progressBarBg}>
              <div className={styles.progressBarFill} style={{ width: '65%' }}></div>
            </div>
            <p className={styles.progressSubtext}>We need 3,500 more pledges to unlock the community reward!</p>
          </div>

          <button className={`btn btn-primary ${styles.joinBtn}`}>
            Join Challenge <ArrowRight size={18} />
          </button>
        </div>

        <div className={styles.rewardArea}>
          <div className={styles.rewardCard}>
            <div className={styles.medalWrapper}>
              <Medal size={48} color="var(--primary)" />
            </div>
            <h3>Challenge Reward</h3>
            <p>Complete the pledge to earn the <strong>Zero Waste Champion</strong> badge and a 15% discount on your next sustainable order.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoChallenge;
