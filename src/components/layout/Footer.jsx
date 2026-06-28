import React from 'react';
import { Leaf, Camera, MessageCircle, Users, Video } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.logoArea}>
            <Leaf size={24} color="var(--primary)" />
            <h2 className={styles.logoTitle}>EcoVerse</h2>
          </div>
          <p className={styles.brandDesc}>
            Helping eco-friendly makers sell products while showcasing their sustainability journey and impact.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Instagram"><Camera size={20} /></a>
            <a href="#" aria-label="Twitter"><MessageCircle size={20} /></a>
            <a href="#" aria-label="Facebook"><Users size={20} /></a>
            <a href="#" aria-label="YouTube"><Video size={20} /></a>
          </div>
        </div>

        {/* Links Columns */}
        <div className={styles.linksCol}>
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Impact</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h3>Shop</h3>
          <ul>
            <li><a href="#">All Products</a></li>
            <li><a href="#">Home & Living</a></li>
            <li><a href="#">Personal Care</a></li>
            <li><a href="#">Gift Sets</a></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h3>Community</h3>
          <ul>
            <li><a href="#">Meet the Makers</a></li>
            <li><a href="#">Eco Challenges</a></li>
            <li><a href="#">Forums</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h3>Newsletter</h3>
          <p className={styles.newsletterText}>Get sustainable living tips and exclusive offers.</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" className={styles.newsletterInput} />
            <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
          </form>
        </div>

      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContent}`}>
          <p>&copy; {new Date().getFullYear()} EcoVerse. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
