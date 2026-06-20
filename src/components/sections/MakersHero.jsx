import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Heart, Globe2, Play, Leaf, Star } from 'lucide-react';
import styles from './MakersHero.module.css';

const MakersHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        
        {/* Left Side: Text and Metrics */}
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.heroTitle}>
            Meet the <span className={styles.highlight}>Makers</span>
          </h1>
          <h2 className={styles.heroSubTitle}>
            Real people. Real stories. Real impact.
          </h2>
          <p className={styles.heroDesc}>
            Discover the passionate individuals and communities behind our eco-friendly products.
          </p>

          <div className={styles.metricsRow}>
            <div className={styles.metricItem}>
              <div className={styles.metricIcon}><Users size={20} /></div>
              <div className={styles.metricText}>
                <strong>500+</strong>
                <span>Makers</span>
              </div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricIcon}><Leaf size={20} /></div>
              <div className={styles.metricText}>
                <strong>15+</strong>
                <span>States</span>
              </div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricIcon}><Heart size={20} /></div>
              <div className={styles.metricText}>
                <strong>25,000+</strong>
                <span>Lives Impacted</span>
              </div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricIcon}><Globe2 size={20} /></div>
              <div className={styles.metricText}>
                <strong>1M+ kg</strong>
                <span>CO₂ Reduced</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Image and Featured Card */}
        <motion.div 
          className={styles.heroVisual}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.imageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80" 
              alt="Artisan in workshop" 
              className={styles.heroImage}
            />
          </div>

          {/* Overlapping Featured Card */}
          <motion.div 
            className={styles.featuredCard}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={styles.badge}>
              <Star size={12} className={styles.badgeIcon} /> FEATURED MAKER
            </div>
            <h3 className={styles.featuredName}>Priya's Bamboo Crafts</h3>
            <div className={styles.location}>
              <MapPin size={14} /> Rural Gujarat, India
            </div>
            <p className={styles.featuredStory}>
              Started with just ₹500 and a dream to reduce plastic waste in rural Gujarat. Today, we empower 15+ artisans and create sustainable products loved by thousands.
            </p>
            
            <div className={styles.featuredActions}>
              <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                <Play size={16} /> Watch Story
              </button>
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                Explore Products
              </button>
            </div>
          </motion.div>
        </motion.div>

      </div>
      
      {/* Decorative Leaves */}
      <div className={styles.leafDecorationLeft}></div>
      <div className={styles.leafDecorationRight}></div>
    </section>
  );
};

export default MakersHero;
