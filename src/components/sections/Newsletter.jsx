import React from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <section className={styles.newsletterSection}>
      <div className={`container ${styles.newsletterContainer}`}>
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <Mail size={32} color="var(--primary)" />
          </div>
          <h2 className={styles.title}>Join the Eco Movement</h2>
          <p className={styles.subtitle}>
            Subscribe to our newsletter for exclusive offers, sustainability tips, and stories from our makers.
          </p>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className={styles.input}
              required
            />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>

          <div className={styles.benefits}>
            <span className={styles.benefitItem}>
              <CheckCircle2 size={16} className={styles.checkIcon} /> 10% off first order
            </span>
            <span className={styles.benefitItem}>
              <CheckCircle2 size={16} className={styles.checkIcon} /> Weekly eco tips
            </span>
            <span className={styles.benefitItem}>
              <CheckCircle2 size={16} className={styles.checkIcon} /> Unsubscribe anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
