import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import heroImage from '../../assets/hero.png';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        
        {/* Left Side Content */}
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.heroTitle}>
            Shop <span className={styles.highlight}>Sustainable.</span><br />
            Support <span className={styles.highlight}>Real Makers.</span>
          </h1>
          <p className={styles.heroSub}>
            Eco-friendly products, meaningful stories, and a positive impact on our planet.
          </p>
          
          <div className={styles.heroActions}>
            <button className="btn btn-primary">
              <span className={styles.checkIcon}>✔</span> Explore Products
            </button>
            <button className="btn btn-outline">
              <span className={styles.userIcon}>👤</span> Meet the Makers
            </button>
          </div>

          <div className={styles.socialProof}>
            <div className={styles.avatarGroup}>
              {/* Placeholders for avatars */}
              <div className={styles.avatar} style={{ backgroundColor: '#e2e8f0', backgroundImage: 'url(https://i.pravatar.cc/100?img=1)' }}></div>
              <div className={styles.avatar} style={{ backgroundColor: '#cbd5e1', backgroundImage: 'url(https://i.pravatar.cc/100?img=2)' }}></div>
              <div className={styles.avatar} style={{ backgroundColor: '#94a3b8', backgroundImage: 'url(https://i.pravatar.cc/100?img=3)' }}></div>
              <div className={styles.avatar} style={{ backgroundColor: '#64748b', backgroundImage: 'url(https://i.pravatar.cc/100?img=4)' }}></div>
            </div>
            <p>Join 25,000+ conscious shoppers <span className={styles.heart}>♡</span></p>
          </div>
        </motion.div>

        {/* Right Side Image Area */}
        <motion.div 
          className={styles.heroImageWrapper}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.imageContainer}>
            <img src={heroImage} alt="Premium Eco Products" className={styles.mainImage} />
            
            {/* Floating Video Card */}
            <motion.div 
              className={styles.videoCard}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button className={styles.playButton} aria-label="Play video">
                <Play size={20} fill="var(--primary)" color="var(--primary)" />
              </button>
              <div className={styles.videoText}>
                <strong>Watch Our Story</strong>
                <span>See how EcoVerse makes a difference</span>
              </div>
            </motion.div>

            {/* Pagination Dots (Decorative as per reference) */}
            <div className={styles.dots}>
              <span className={`${styles.dot} ${styles.activeDot}`}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
