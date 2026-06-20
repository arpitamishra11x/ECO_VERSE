import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, TreePine, Trophy, Share2, Download, CheckCircle, Package } from 'lucide-react';
import { useEco } from '../context/EcoContext';
import styles from './PassportPage.module.css';

const PassportPage = () => {
  const { user, triggerNotification } = useEco();

  const handleShare = () => {
    triggerNotification('Impact Card URL copied to clipboard! Share it with friends. 🌍', 'success');
  };

  const handleDownload = () => {
    triggerNotification('Generating Impact Passport PDF... Download started!', 'info');
  };

  return (
    <div className={styles.page}>
      <div className="container">
        
        <div className={styles.header}>
          <h1 className={styles.title}>Sustainability Passport</h1>
          <p className={styles.subtitle}>Track your personal environmental impact, purchase history, and earned badges in one place.</p>
        </div>

        <div className={styles.twoCol}>
          
          {/* Left Column - Profile & Stats */}
          <div>
            <motion.div 
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.profileHeader}>
                <img src={user.role === 'customer' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'} alt="Avatar" className={styles.avatar} />
                <div className={styles.profileInfo}>
                  <h2>{user.name}'s Passport</h2>
                  <p>Member since Jan 2026</p>
                  <div className={styles.levelBadge}>
                    <Trophy size={16} />
                    <span>{user.level} (Level {Math.floor(user.xp / 500) + 1})</span>
                  </div>
                </div>
              </div>

              <h3 className={styles.cardTitle}>Lifetime Impact</h3>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.statIconWrap}>
                    <Leaf size={20} />
                  </div>
                  <div className={styles.statValue}>{user.passport.plasticSaved}kg</div>
                  <div className={styles.statLabel}>Plastic Saved</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statIconWrap}>
                    <Sparkles size={20} />
                  </div>
                  <div className={styles.statValue}>{user.passport.carbonReduced}kg</div>
                  <div className={styles.statLabel}>Carbon Reduced</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statIconWrap}>
                    <TreePine size={20} />
                  </div>
                  <div className={styles.statValue}>{user.passport.treesSupported}</div>
                  <div className={styles.statLabel}>Trees Supported</div>
                </div>
              </div>

              <div className={styles.actionBtns}>
                <button className={`${styles.actionBtn} ${styles.primary}`} onClick={handleShare}>
                  <Share2 size={16} /> Share Impact Card
                </button>
                <button className={`${styles.actionBtn} ${styles.outline}`} onClick={handleDownload}>
                  <Download size={16} /> Download PDF Report
                </button>
              </div>
            </motion.div>

            <motion.div 
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className={styles.cardTitle}><Trophy size={20} /> Badges Earned</h3>
              <div className={styles.badgesGrid}>
                <div className={styles.badgeItem}>
                  <div className={styles.badgeIcon}><CheckCircle size={20} /></div>
                  <div className={styles.badgeInfo}>
                    <h4>Zero Waste Starter</h4>
                    <p>Completed first plastic-free challenge</p>
                  </div>
                </div>
                <div className={styles.badgeItem}>
                  <div className={styles.badgeIcon}><Trophy size={20} /></div>
                  <div className={styles.badgeInfo}>
                    <h4>Earth Guardian</h4>
                    <p>Reached 1,000 XP milestone</p>
                  </div>
                </div>
                <div className={styles.badgeItem}>
                  <div className={styles.badgeIcon}><Sparkles size={20} /></div>
                  <div className={styles.badgeInfo}>
                    <h4>Plastic Positive</h4>
                    <p>Saved 5kg of plastic</p>
                  </div>
                </div>
                <div className={styles.badgeItem}>
                  <div className={styles.badgeIcon}><Package size={20} /></div>
                  <div className={styles.badgeInfo}>
                    <h4>Local Supporter</h4>
                    <p>Purchased from 3 artisans</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Purchase History & Impact Journey */}
          <motion.div 
            className={styles.card}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={styles.cardTitle}>Impact Journey</h3>
            <div className={styles.historyList}>
              <div className={styles.historyItem}>
                <div className={styles.historyDot} />
                <div className={styles.historyContent}>
                  <h4>Purchased: Bamboo Cutlery Set</h4>
                  <p>Saved 45g of plastic from entering landfills.</p>
                  <span className={styles.historyDate}>Yesterday</span>
                </div>
              </div>
              <div className={styles.historyItem}>
                <div className={styles.historyDot} />
                <div className={styles.historyContent}>
                  <h4>Joined Challenge: Plastic-Free Week</h4>
                  <p>Committed to 7 days of zero single-use plastics.</p>
                  <span className={styles.historyDate}>June 18, 2026</span>
                </div>
              </div>
              <div className={styles.historyItem}>
                <div className={styles.historyDot} />
                <div className={styles.historyContent}>
                  <h4>Earned Badge: Local Supporter</h4>
                  <p>Thank you for supporting small sustainable businesses!</p>
                  <span className={styles.historyDate}>June 15, 2026</span>
                </div>
              </div>
              <div className={styles.historyItem}>
                <div className={styles.historyDot} />
                <div className={styles.historyContent}>
                  <h4>Purchased: Organic Cotton Tote</h4>
                  <p>Supported sustainable farming and saved 200g CO₂.</p>
                  <span className={styles.historyDate}>June 10, 2026</span>
                </div>
              </div>
              <div className={styles.historyItem}>
                <div className={styles.historyDot} />
                <div className={styles.historyContent}>
                  <h4>Account Created</h4>
                  <p>Started the sustainability journey with EcoVerse.</p>
                  <span className={styles.historyDate}>Jan 12, 2026</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default PassportPage;
