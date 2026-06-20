import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Leaf, ArrowRight } from 'lucide-react';
import styles from './FeaturedProducts.module.css';

const products = [
  {
    id: 1,
    name: 'Bamboo Toothbrush',
    price: '₹199',
    ecoScore: '9.8/10',
    plasticSaved: '15g',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Organic Tote Bag',
    price: '₹499',
    ecoScore: '9.5/10',
    plasticSaved: '50g',
    image: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Coconut Shell Bowl',
    price: '₹349',
    ecoScore: '9.9/10',
    plasticSaved: '30g',
    image: 'https://images.unsplash.com/photo-1627488825688-6c841cb02787?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Beeswax Food Wrap',
    price: '₹599',
    ecoScore: '9.7/10',
    plasticSaved: '100g',
    image: 'https://images.unsplash.com/photo-1610419204642-1e96f131a90c?w=400&h=400&fit=crop'
  }
];

const ProductCard = ({ product, index }) => (
  <motion.div 
    className={styles.productCard}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
  >
    <div className={styles.imageContainer}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <button className={styles.wishlistBtn} aria-label="Add to wishlist">
        <Heart size={18} />
      </button>
      <div className={styles.quickAddContainer}>
        <button className={styles.quickAddBtn}>
          <ShoppingBag size={18} /> Quick Add
        </button>
      </div>
    </div>
    
    <div className={styles.productInfo}>
      <h3 className={styles.productName}>{product.name}</h3>
      <p className={styles.productPrice}>{product.price}</p>
      
      <div className={styles.ecoStats}>
        <span className={styles.statBadge}>
          <Leaf size={14} /> {product.ecoScore}
        </span>
        <span className={styles.statBadgeText}>
          ♻️ {product.plasticSaved} plastic saved
        </span>
      </div>
    </div>
  </motion.div>
);

const FeaturedProducts = () => {
  return (
    <section className={styles.featuredSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Sustainable Products</h2>
          <a href="#" className={styles.viewAll}>
            View All <ArrowRight size={18} />
          </a>
        </div>

        <div className={styles.productGrid}>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
