import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Trash2, Cloud, Droplets } from 'lucide-react';
import styles from './EnvironmentalImpact.module.css';

const metrics = [
  {
    value: '25g',
    label: 'Plastic Saved',
    icon: Trash2
  },
  {
    value: '0.18 kg',
    label: 'CO₂ Reduced',
    icon: Cloud
  },
  {
    value: '1.2 L',
    label: 'Water Saved',
    icon: Droplets
  },
  {
    value: '100%',
    label: 'Biodegradable',
    icon: Leaf
  }
];

const EnvironmentalImpact = () => {
  return (
    <section className={styles.section}>
      <motion.div 
        className={styles.inner}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.headerRow}>
          <div className={styles.headerIcon}>
            <Leaf size={24} />
          </div>
          <h2 className={styles.heading}>Environmental Impact</h2>
        </div>

        <div className={styles.metrics}>
          {metrics.map((metric, idx) => {
            const IconComponent = metric.icon;
            return (
              <motion.div 
                key={idx} 
                className={styles.metricCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className={styles.metricIcon}>
                  <IconComponent size={24} />
                </div>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </motion.div>
            );
          })}
        </div>

        <p className={styles.bottomText}>
          By choosing this product, you're making a better choice for the planet. 🌍
        </p>
      </motion.div>
    </section>
  );
};

export default EnvironmentalImpact;
