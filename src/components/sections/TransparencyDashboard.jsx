import React from 'react';
import { Leaf } from 'lucide-react';
import styles from './TransparencyDashboard.module.css';

const steps = [
  {
    title: 'Raw Material',
    description: 'Moso Bamboo sourced from sustainable forests in Assam, India',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=150&q=80' // Bamboo/forest image
  },
  {
    title: 'Manufacturer',
    description: 'Crafted by local artisans in Gujarat',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=150&q=80' // Artisan/crafting image
  },
  {
    title: 'Packaging',
    description: '100% Recycled Kraft Paper Packaging',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=150&q=80' // Packaging/paper box image
  },
  {
    title: 'Delivery',
    description: 'Shipped with minimal carbon footprint',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=150&q=80' // Delivery/shipping image
  }
];

const TransparencyDashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h3 className={styles.title}>Transparency Dashboard</h3>
        <p className={styles.subtitle}>See the journey of this product</p>
      </div>

      <div className={styles.timeline}>
        {steps.map((step, idx) => (
          <div key={idx} className={styles.step}>
            <div className={styles.stepImageCol}>
              <img src={step.image} alt={step.title} className={styles.stepImage} />
              {idx < steps.length - 1 && <div className={styles.connector} />}
            </div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.impactAlert}>
        <Leaf size={16} className={styles.alertIcon} />
        <span className={styles.alertText}>
          This product saves 25g of plastic from entering our planet.
        </span>
      </div>
    </div>
  );
};

export default TransparencyDashboard;
