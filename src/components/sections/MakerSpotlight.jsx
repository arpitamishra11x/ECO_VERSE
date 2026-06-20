import React from 'react';
import { motion } from 'framer-motion';
import { Play, Award, Leaf, ShieldCheck } from 'lucide-react';
import styles from './MakerSpotlight.module.css';

const MakerSpotlight = () => {
  return (
    <section className={styles.makerSection}>
      <div className="container">
        <motion.div 
          className={styles.spotlightCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Video / Main Image Area */}
          <div className={styles.visualArea}>
            <img 
              src="https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?w=800&q=80" 
              alt="Priya in her workshop" 
              className={styles.mainImage}
            />
            <div className={styles.videoOverlay}>
              <button className={styles.playBtn} aria-label="Watch Story">
                <Play fill="white" size={24} />
              </button>
              <span>Watch Priya's Story</span>
            </div>
          </div>

          {/* Content Area */}
          <div className={styles.contentArea}>
            <div className={styles.badge}>Maker Spotlight</div>
            <h2 className={styles.makerName}>Priya's Bamboo Crafts</h2>
            <p className={styles.makerJourney}>
              "I started working with bamboo after seeing the devastating impact of plastic waste in my hometown. What began as a small project to create alternatives for my family has grown into a community workshop that empowers 15 local women artisans."
            </p>
            
            <div className={styles.achievements}>
              <div className={styles.achievementItem}>
                <Leaf size={20} className={styles.achievementIcon} />
                <span>100% Sustainably Sourced</span>
              </div>
              <div className={styles.achievementItem}>
                <Award size={20} className={styles.achievementIcon} />
                <span>Fair Trade Certified</span>
              </div>
              <div className={styles.achievementItem}>
                <ShieldCheck size={20} className={styles.achievementIcon} />
                <span>Zero Waste Workshop</span>
              </div>
            </div>

            <div className={styles.actions}>
              <button className="btn btn-primary">Explore Products</button>
            </div>
            
            {/* Gallery Thumbnails */}
            <div className={styles.gallery}>
              <img src="https://images.unsplash.com/photo-1616858348821-b4f0b240ed33?w=150&q=80" alt="Workshop detail 1" />
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&q=80" alt="Workshop detail 2" />
              <img src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=150&q=80" alt="Workshop detail 3" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MakerSpotlight;
