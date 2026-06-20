import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import styles from './CategorySection.module.css';

const categories = [
  { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&h=200&fit=crop' },
  { name: 'Kitchen & Dining', image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=200&h=200&fit=crop' },
  { name: 'Personal Care', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop' },
  { name: 'Fashion & Bags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200&h=200&fit=crop' },
  { name: 'Stationery', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=200&h=200&fit=crop' },
  { name: 'Gift Sets', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&h=200&fit=crop' }
];

const CategorySection = () => {
  return (
    <section className={styles.categorySection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <a href="#" className={styles.viewAll}>
            View All Categories <ArrowRight size={18} />
          </a>
        </div>

        <div className={styles.categoryGrid}>
          {categories.map((category, index) => (
            <motion.a 
              href="#" 
              key={index} 
              className={styles.categoryCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.imageWrapper}>
                <img src={category.image} alt={category.name} className={styles.categoryImage} />
              </div>
              <span className={styles.categoryName}>{category.name}</span>
            </motion.a>
          ))}
          
          {/* All Products Card */}
          <motion.a 
            href="#" 
            className={styles.categoryCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: categories.length * 0.1 }}
          >
            <div className={`${styles.imageWrapper} ${styles.allProductsWrapper}`}>
              <LayoutGrid size={32} color="var(--primary)" />
            </div>
            <span className={styles.categoryName}>All Products</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
