import React from 'react';
import { Link } from 'react-router-dom';
import ProductGallery from '../components/sections/ProductGallery';
import ProductInfo from '../components/sections/ProductInfo';
import TransparencyDashboard from '../components/sections/TransparencyDashboard';
import EnvironmentalImpact from '../components/sections/EnvironmentalImpact';
import ProductJourney from '../components/sections/ProductJourney';
import styles from './ProductDetailPage.module.css';

const ProductDetailPage = () => {
  return (
    <div className={`container ${styles.page}`}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSep}>&gt;</span>
        <span className={styles.breadcrumbLink}>Shop</span>
        <span className={styles.breadcrumbSep}>&gt;</span>
        <span className={styles.breadcrumbLink}>Personal Care</span>
        <span className={styles.breadcrumbSep}>&gt;</span>
        <span className={styles.breadcrumbCurrent}>Bamboo Toothbrush</span>
      </nav>

      {/* Main product columns */}
      <div className={styles.productGrid}>
        <div>
          <ProductGallery />
        </div>
        <div>
          <ProductInfo />
        </div>
        <div>
          <TransparencyDashboard />
        </div>
      </div>

      {/* Bottom full width sections */}
      <div className={styles.bottomSections}>
        <EnvironmentalImpact />
        <ProductJourney />
      </div>
    </div>
  );
};

export default ProductDetailPage;
