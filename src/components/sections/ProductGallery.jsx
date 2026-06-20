import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ProductGallery.module.css';

const images = [
  'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80',
  'https://images.unsplash.com/photo-1564419320461-6e1e76ec5c40?w=600&q=80',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  'https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=600&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80'
];

const ProductGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex]}
            alt={`Bamboo Toothbrush View ${selectedIndex + 1}`}
            className={styles.mainImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        <button className={styles.zoomButton} aria-label="Zoom image">
          <ZoomIn size={18} />
        </button>
      </div>

      <div className={styles.thumbnailStrip}>
        <button 
          className={styles.arrowButton} 
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <ChevronLeft size={16} />
        </button>
        
        <div className={styles.thumbnailList}>
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`${styles.thumbnail} ${idx === selectedIndex ? styles.thumbnailActive : ''}`}
              onClick={() => setSelectedIndex(idx)}
              aria-label={`Select view ${idx + 1}`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className={styles.thumbnailImage} />
            </button>
          ))}
        </div>

        <button 
          className={styles.arrowButton} 
          onClick={handleNext}
          aria-label="Next image"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;
