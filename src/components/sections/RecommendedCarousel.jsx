import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../shared/ProductCard';
import styles from './RecommendedCarousel.module.css';

const products = [
  {
    name: 'Bamboo Cutlery Set',
    price: 199,
    ecoScore: 9.3,
    impact: 'Saves 45g Plastic',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80'
  },
  {
    name: 'Organic Cotton Tote Bag',
    price: 349,
    ecoScore: 9.2,
    impact: 'Saves 200g CO₂',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80'
  },
  {
    name: 'Natural Soap Bar',
    price: 149,
    ecoScore: 9.0,
    impact: 'Saves 100g Plastic',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&q=80'
  },
  {
    name: 'Copper Water Bottle',
    price: 899,
    ecoScore: 8.8,
    impact: 'Saves 300g CO₂',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80'
  },
  {
    name: 'Beeswax Food Wrap',
    price: 199,
    ecoScore: 8.7,
    impact: 'Saves 80g Plastic',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80'
  }
];

const RecommendedCarousel = () => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 260; // card size + gap
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleCol}>
          <div className={styles.titleRow}>
            <Star size={20} fill="currentColor" />
            <h2 className={styles.title}>Recommended For You</h2>
          </div>
          <p className={styles.subtitle}>Based on your preferences and recent activity</p>
        </div>
        <a href="#view-all" className={styles.viewAll}>View All</a>
      </div>

      <div className={styles.carouselContainer}>
        <button
          className={`${styles.arrowBtn} ${styles.arrowBtnLeft}`}
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        <div ref={carouselRef} className={styles.carousel}>
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product} index={idx} />
          ))}
        </div>

        <button
          className={`${styles.arrowBtn} ${styles.arrowBtnRight}`}
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default RecommendedCarousel;
