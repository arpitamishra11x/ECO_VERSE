import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProductJourney.module.css';

const steps = [
  {
    title: 'Sourced Bamboo',
    subtitle: 'Assam, India',
    image: 'https://images.unsplash.com/photo-1507284807727-4238b76bf999?w=150&q=80' // Bamboo forest
  },
  {
    title: 'Handcrafted',
    subtitle: 'Local Artisans, Gujarat',
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=150&q=80' // Pottery/handcrafting artisan
  },
  {
    title: 'Eco-friendly Box',
    subtitle: 'Recycled Kraft Paper',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150&q=80' // Packaging box
  },
  {
    title: 'Low-Carbon Shipping',
    subtitle: 'Across India',
    image: 'https://images.unsplash.com/photo-1518659276023-749db9a6b10f?w=150&q=80' // Delivery vehicle/electric bike or courier
  },
  {
    title: 'Conscious Choice',
    subtitle: 'For a Better Tomorrow',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150&q=80' // Green leaf hands
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

const arrowVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 0.7, x: 0, transition: { duration: 0.5 } }
};

const ProductJourney = () => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Product Journey – From Nature to You</h2>

        <motion.div 
          className={styles.journey}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {steps.map((step, idx) => (
            <div key={idx} className={styles.stepWrapper}>
              <motion.div className={styles.step} variants={itemVariants}>
                <div className={styles.stepImageWrapper}>
                  <img src={step.image} alt={step.title} className={styles.stepImage} />
                </div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepSubtitle}>{step.subtitle}</p>
              </motion.div>

              {idx < steps.length - 1 && (
                <motion.div className={styles.arrow} variants={arrowVariants}>
                  <svg className={styles.arrowSvg} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductJourney;
