import React, { useState } from 'react';
import { X, Trash2, Leaf, ShoppingCart, Percent } from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import styles from './CartDrawer.module.css';

const CartDrawer = ({ onClose }) => {
  const { cart, updateCartQty, removeFromCart, checkout, user } = useEco();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Calculate receipt totals
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = appliedCoupon ? appliedCoupon.value : 0;
  const delivery = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const total = Math.max(0, subtotal - discount + delivery);

  // Environmental impact savings calculations
  const plasticSaved = cart.reduce((sum, item) => sum + (item.product.co2 * 10 * item.quantity), 0); // simulated g plastic
  const carbonReduced = cart.reduce((sum, item) => sum + (item.product.co2 * item.quantity), 0); // kg CO2
  const waterSaved = cart.reduce((sum, item) => sum + (item.product.water * item.quantity), 0); // L water

  const handleApplyCoupon = () => {
    setCouponError('');
    if (!couponCode.trim()) return;

    const matched = user.coupons.find(c => c.code.toLowerCase() === couponCode.trim().toLowerCase());
    if (!matched) {
      setCouponError('Invalid coupon code!');
    } else if (matched.used) {
      setCouponError('This coupon has already been used.');
    } else {
      setAppliedCoupon(matched);
      setCouponError('');
    }
  };

  const handleCheckout = () => {
    checkout(appliedCoupon ? appliedCoupon.code : '');
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Shopping Bag</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        <div className={styles.itemsList}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>
              <ShoppingCart size={48} style={{ color: 'var(--text-secondary)', opacity: 0.4 }} />
              <h3 className={styles.emptyTitle}>Your bag is empty</h3>
              <p>Looks like you haven't added any eco-friendly products yet.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className={styles.cartItem}>
                <img src={item.product.image} alt={item.product.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <h4 className={styles.itemName}>{item.product.name}</h4>
                  <span className={styles.itemPrice}>₹{item.product.price}</span>
                  <div className={styles.itemQtyControls}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.product.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.summarySection}>
            {/* Eco Impact Savings Tracker */}
            <div className={styles.ecoImpactCard}>
              <div className={styles.ecoImpactTitle}>
                <Leaf size={12} />
                <span>Environmental Savings</span>
              </div>
              <div className={styles.ecoImpactGrid}>
                <div>
                  <div className={styles.ecoImpactVal}>{plasticSaved.toFixed(0)}g</div>
                  <div className={styles.ecoImpactLbl}>Plastic Saved</div>
                </div>
                <div>
                  <div className={styles.ecoImpactVal}>{carbonReduced.toFixed(2)}kg</div>
                  <div className={styles.ecoImpactLbl}>CO₂ Reduced</div>
                </div>
                <div>
                  <div className={styles.ecoImpactVal}>{waterSaved.toFixed(1)}L</div>
                  <div className={styles.ecoImpactLbl}>Water Saved</div>
                </div>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className={styles.couponArea}>
              <input
                type="text"
                placeholder="Enter coupon code (e.g. ECO-DISCOUNT)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className={styles.couponInput}
              />
              <button className={styles.applyBtn} onClick={handleApplyCoupon}>
                Apply
              </button>
            </div>
            {couponError && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '-0.5rem' }}>{couponError}</span>}
            {appliedCoupon && (
              <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '-0.5rem' }}>
                <Percent size={12} /> Coupon applied! Saved ₹{appliedCoupon.value}
              </span>
            )}

            {/* Price Calculations */}
            <div className={styles.billRow}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {appliedCoupon && (
              <div className={styles.billRow} style={{ color: 'var(--primary)', fontWeight: 600 }}>
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className={styles.billRow}>
              <span>Delivery Fee</span>
              <span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
            </div>
            <div className={`${styles.billRow} ${styles.billTotal}`}>
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              <ShoppingCart size={18} />
              <span>Checkout Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
