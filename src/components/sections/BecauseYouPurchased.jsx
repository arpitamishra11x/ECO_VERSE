import React, { useRef } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../shared/ProductCard';
import styles from './BecauseYouPurchased.module.css';

const products = [
  {
    name: 'Bamboo Toothbrush',
    price: 99,
    ecoScore: 9.5,
    impact: 'Saves 25g Plastic',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80'
  },
  {
    name: 'Floss (Charcoal)',
    price: 199,
    ecoScore: 8.9,
    impact: 'Zero Plastic Packaging',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80'
  },
  {
    name: 'Konjac Facial Sponge',
    price: 249,
    ecoScore: 9.1,
    impact: '100% Biodegradable',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80'
  },
  {
    name: 'Natural Deodorant',
    price: 299,
    ecoScore: 8.6,
    impact: 'Cruelty-Free & Vegan',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&q=80'
  },
  {
    name: 'Shampoo Bar',
    price: 249,
    ecoScore: 9.0,
    impact: 'Replaces 2 Bottles',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&q=80'
  },
  {
    name: 'Reusable Cotton Pads',
    price: 199,
    ecoScore: 9.2,
    impact: 'Saves 500+ Disposables',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80'
  }
];

const BecauseYouPurchased = () => {
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
            <ShoppingBag size={20} />
            <h2 className={styles.title}>Because You Purchased</h2>
          </div>
          <p className={styles.subtitle}>You recently purchased Reusable Stainless Steel Bottle</p>
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

export default BecauseYouPurchased;
