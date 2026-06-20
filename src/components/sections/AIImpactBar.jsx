import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, TreePine, Cloud, Star } from 'lucide-react';
import styles from './AIImpactBar.module.css';

const metrics = [
  {
    value: '4.3 kg',
    label: 'Plastic Saved',
    icon: Leaf
  },
  {
    value: '12',
    label: 'Trees Supported',
    icon: TreePine
  },
  {
    value: '18 kg',
    label: 'CO₂ Reduced',
    icon: Cloud
  },
  {
    value: '320',
    label: 'Eco Points',
    icon: Star
  }
];

const AIImpactBar = () => {
  return (
    <motion.div
      className={styles.bar}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.left}>
        <h3 className={styles.heading}>
          Your Choices Are Making A Real Impact! 🌱
        </h3>
        <p className={styles.subheading}>
          Every eco-friendly decision contributes to a cleaner, greener planet.
        </p>
      </div>

      <div className={styles.center}>
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className={styles.metricItem}>
              <div className={styles.metricIcon}>
                <Icon size={18} />
              </div>
              <div className={styles.metricTextCol}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.right}>
        <button className={styles.button}>
          View My Impact
        </button>
      </div>
    </motion.div>
  );
};

export default AIImpactBar;
