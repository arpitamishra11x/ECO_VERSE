import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import styles from './ImpactBanner.module.css';

const ImpactBanner = () => {
  return (
    <section className={styles.impactSection}>
      <div className={`container ${styles.bannerContainer}`}>
        <motion.div 
          className={styles.bannerContent}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative Elements */}
          <div className={styles.decoIconLeft}><Leaf size={32} /></div>
          
          <div className={styles.textContainer}>
            <h2 className={styles.bannerTitle}>
              Every purchase supports real people and real change.
            </h2>
            <p className={styles.bannerSubtext}>
              Thank you for being part of our sustainable community! <Leaf size={16} style={{display: 'inline', color: 'var(--primary)'}} />
            </p>
          </div>
          
          <button className={`btn btn-primary ${styles.ctaBtn}`}>
            Learn Our Impact
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactBanner;
