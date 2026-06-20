import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Check, ShieldCheck, RefreshCw, Truck, Leaf } from 'lucide-react';
import styles from './ProductInfo.module.css';

const ProductInfo = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className={styles.info}>
      {/* Bestseller Badge */}
      <div className={styles.bestsellerBadge}>
        <Star size={12} fill="currentColor" />
        <span>Bestseller</span>
      </div>

      {/* Title */}
      <h1 className={styles.title}>Bamboo Toothbrush</h1>

      {/* Rating row */}
      <div className={styles.ratingRow}>
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => {
            const isFilled = i < 4 || (i === 4 && 0.8 >= 0.5); // 4.8 rating
            return (
              <Star
                key={i}
                size={16}
                className={isFilled ? styles.starFilled : styles.starEmpty}
                fill={isFilled ? "currentColor" : "none"}
              />
            );
          })}
        </div>
        <span className={styles.ratingText}>
          <strong>4.8</strong> (120 reviews) · 2,500+ bought this month
        </span>
      </div>

      {/* Price */}
      <div className={styles.priceSection}>
        <span className={styles.price}>₹99</span>
        <span className={styles.taxNote}>Inclusive of all taxes</span>
      </div>

      {/* Eco badges row */}
      <div className={styles.ecoBadges}>
        <span className={`${styles.ecoBadge} ${styles.ecoBadgeHighlight}`}>
          <Leaf size={12} />
          Eco Score: 9.5/10
        </span>
        <span className={styles.ecoBadge}>Plastic Positive</span>
        <span className={styles.ecoBadge}>Vegan</span>
        <span className={styles.ecoBadge}>Compostable</span>
      </div>

      {/* Description */}
      <p className={styles.description}>
        Make a daily difference with our premium biodegradable bamboo toothbrush. Designed with a dentist-approved ergonomic handle and charcoal-infused BPA-free bristles, it offers superior cleaning while being 100% gentle on the earth.
      </p>

      {/* Feature Checklist */}
      <div className={styles.features}>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <Check size={12} />
          </div>
          <span className={styles.featureText}>
            <strong className={styles.featureTextBold}>100% Bamboo Handle</strong> – Biodegradable & compostable
          </span>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <Check size={12} />
          </div>
          <span className={styles.featureText}>
            <strong className={styles.featureTextBold}>Bristles infused with charcoal</strong> – Gentle & effective stain removal
          </span>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <Check size={12} />
          </div>
          <span className={styles.featureText}>
            <strong className={styles.featureTextBold}>Zero Plastic</strong> – Shipped in 100% plastic-free kraft packaging
          </span>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <Check size={12} />
          </div>
          <span className={styles.featureText}>
            <strong className={styles.featureTextBold}>Lightweight & Durable</strong> – Travel-friendly organic design
          </span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className={styles.quantityRow}>
        <span className={styles.quantityLabel}>Quantity</span>
        <div className={styles.quantitySelector}>
          <button
            className={styles.quantityBtn}
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            className={styles.quantityBtn}
            onClick={increaseQuantity}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart / Wishlist Actions */}
      <div className={styles.actions}>
        <button className={styles.addToCartBtn}>
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
        <button
          className={styles.wishlistBtn}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} color={isWishlisted ? "var(--primary)" : "currentColor"} />
          <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
        </button>
      </div>

      {/* Trust features row */}
      <div className={styles.trustRow}>
        <div className={styles.trustItem}>
          <div className={styles.trustIcon}>
            <ShieldCheck size={16} />
          </div>
          <span className={styles.trustText}>Secure Payments</span>
        </div>
        <div className={styles.trustItem}>
          <div className={styles.trustIcon}>
            <RefreshCw size={16} />
          </div>
          <span className={styles.trustText}>Easy 7-Day Returns</span>
        </div>
        <div className={styles.trustItem}>
          <div className={styles.trustIcon}>
            <Truck size={16} />
          </div>
          <span className={styles.trustText}>Free Delivery Above ₹499</span>
        </div>
        <div className={styles.trustItem}>
          <div className={styles.trustIcon}>
            <Leaf size={16} />
          </div>
          <span className={styles.trustText}>Plastic-Free Packaging</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
