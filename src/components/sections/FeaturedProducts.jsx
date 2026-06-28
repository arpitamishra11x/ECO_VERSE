import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../shared/ProductCard';
import { useEco } from '../../context/EcoContext';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = () => {
  const { products } = useEco();
  const featured = products.slice(0, 4);

  return (
    <section className={styles.featuredSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Sustainable Products</h2>
          <Link to="/shop" className={styles.viewAll}>
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className={styles.productGrid}>
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
