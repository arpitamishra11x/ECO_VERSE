import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Leaf } from 'lucide-react';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, index = 0 }) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
    >
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <button
          className={styles.favBtn}
          onClick={() => setIsFav(!isFav)}
          aria-label="Toggle wishlist"
        >
          <Heart size={18} fill={isFav ? "#ef4444" : "none"} color={isFav ? "#ef4444" : "#fff"} />
        </button>
      </div>

      <div className={styles.info}>
        <h4 className={styles.name}>{product.name}</h4>
        <span className={styles.price}>₹{product.price}</span>

        <div className={styles.ecoRow}>
          <span className={styles.ecoBadge}>
            <Leaf size={12} /> Eco Score {product.ecoScore}
          </span>
        </div>

        {product.impact && (
          <p className={styles.impact}>
            <Leaf size={12} /> {product.impact}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
