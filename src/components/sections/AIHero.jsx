import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Leaf } from 'lucide-react';
import styles from './AIHero.module.css';

const AIHero = ({ onEditClick }) => {
  return (
    <motion.div
      className={styles.hero}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.left}>
        <div className={styles.titleRow}>
          <Sparkles className={styles.sparklesIcon} size={24} />
          <h1 className={styles.title}>AI Recommendations</h1>
        </div>
        <p className={styles.subtitle}>
          We use AI to understand your preferences and recommend products that match your lifestyle and values. The more you shop, the better we get!
        </p>
      </div>

      <div className={styles.right}>
        <div className={styles.prefCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Your Preferences</span>
            <button className={styles.editLink} onClick={onEditClick}>Edit</button>
          </div>
          <div className={styles.tagsGrid}>
            <span className={styles.tag}>
              <Leaf size={12} />
              Vegan
            </span>
            <span className={styles.tag}>
              <Leaf size={12} />
              Plastic-Free
            </span>
            <span className={styles.tag}>
              <Leaf size={12} />
              Handmade
            </span>
            <span className={styles.tag}>
              <Leaf size={12} />
              Organic
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIHero;
