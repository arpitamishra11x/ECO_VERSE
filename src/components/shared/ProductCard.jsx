import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Leaf } from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, index = 0 }) => {
  const [isFav, setIsFav] = useState(false);
  const { addToCart } = useEco();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFav(!isFav);
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}
    >
      <Link to={`/products/${product.slug}`} className={styles.cardLink}>
        <div className={styles.imageWrap}>
          <img src={product.image} alt={product.name} className={styles.image} />
          
          <button
            className={styles.favBtn}
            onClick={handleToggleFav}
            aria-label="Toggle wishlist"
          >
            <Heart size={18} fill={isFav ? "#ef4444" : "none"} color={isFav ? "#ef4444" : "#fff"} />
          </button>

          <button 
            className={styles.quickAddBtn}
            onClick={handleQuickAdd}
          >
            <ShoppingCart size={16} /> Quick Add
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
      </Link>
    </motion.div>
  );
};

export default ProductCard;
