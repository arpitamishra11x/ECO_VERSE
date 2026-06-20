import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, X, Leaf, Sparkles } from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import CartDrawer from './CartDrawer';
import styles from './Header.module.css';

const Header = () => {
  const { cart, user } = useEco();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (headerSearchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(headerSearchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Makers', href: '/makers' },
    { name: 'Community', href: '/community' },
    { name: 'Passport', href: '/passport' },
    { name: 'Challenges', href: '/challenges' },
    { name: 'Eco Rewards', href: '/rewards' },
    { name: 'Impact Stories', href: '/stories' }
  ];

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContent}`}>
        
        {/* Logo Area */}
        <Link to="/" className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <Leaf size={28} color="var(--primary)" />
          </div>
          <div className={styles.logoTextContainer}>
            <h1 className={styles.logoTitle}>EcoVerse</h1>
            <span className={styles.logoTagline}>Every Product Has a Story</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.name} className={styles.navItem}>
                <NavLink 
                  to={link.href} 
                  className={({ isActive }) => 
                    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {user.role === 'seller' && (
              <li className={styles.navItem}>
                <NavLink 
                  to="/seller"
                  className={({ isActive }) => 
                    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
                  }
                  style={{ color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <Sparkles size={14} /> Seller Hub
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Actions Area */}
        <div className={styles.actionsArea}>
          <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
            <input 
              type="text" 
              placeholder="Search sustainable products..." 
              className={styles.searchInput}
              value={headerSearchQuery}
              onChange={(e) => setHeaderSearchQuery(e.target.value)}
            />
            <button type="submit" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              <Search size={18} className={styles.searchIcon} />
            </button>
          </form>
          
          <Link to="/collections" className={styles.iconButton} aria-label="Collections & Wishlist" style={{ color: 'inherit' }}>
            <Heart size={22} />
          </Link>
          
          <button className={styles.iconButton} aria-label="Cart" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={22} />
            {totalCartCount > 0 && <span className={styles.cartBadge}>{totalCartCount}</span>}
          </button>
          
          <Link to="/passport" className={styles.iconButton} aria-label="Passport" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <User size={22} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }} className="desktop-only">{user.name}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink 
                  to={link.href} 
                  className={({ isActive }) => 
                    isActive ? `${styles.mobileNavLink} ${styles.activeMobileLink}` : styles.mobileNavLink
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {user.role === 'seller' && (
              <li>
                <NavLink 
                  to="/seller"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ color: 'var(--primary)', fontWeight: 'bold' }}
                >
                  Seller Hub
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}

      {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
    </header>
  );
};

export default Header;
