import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, MapPin, Star, Box, Heart, RefreshCw, Trophy, Sparkles, TrendingUp } from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import styles from './MakersDirectory.module.css';

const makersData = [
  {
    id: 1,
    name: 'Karthik Pottery',
    location: 'Kutch, Gujarat',
    description: 'Reviving traditional pottery through eco-friendly practices.',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80',
    stats: { products: '320+', rating: '4.8', co2: '2.3 tons' },
    badge: { type: 'top', text: 'Top Maker', icon: Trophy }
  },
  {
    id: 2,
    name: 'Meera Naturals',
    location: 'Coimbatore, Tamil Nadu',
    description: 'Natural skincare made with love and pure ingredients.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
    stats: { products: '150+', rating: '4.9', co2: '1.8 tons' },
    badge: { type: 'new', text: 'New', icon: Sparkles }
  },
  {
    id: 3,
    name: 'The Wood Folks',
    location: 'Saharanpur, Uttar Pradesh',
    description: 'Handcrafted wooden products with a sustainable future.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    stats: { products: '280+', rating: '4.7', co2: '3.1 tons' },
    badge: { type: 'popular', text: 'Popular', icon: TrendingUp }
  },
  {
    id: 4,
    name: 'SwaBun Eco Textiles',
    location: 'Bengaluru, Karnataka',
    description: 'Sustainable textiles empowering women artisans.',
    image: 'https://images.unsplash.com/photo-1605372482348-12c5b0df14c8?w=600&q=80',
    stats: { products: '180+', rating: '4.8', co2: '2.6 tons' },
    badge: null
  }
];

const MakerCard = ({ maker, index, onSelectMaker }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div 
      className={styles.makerCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)' }}
    >
      <div className={styles.imageContainer}>
        <img src={maker.image} alt={maker.name} className={styles.makerImage} />
        
        {/* Badges */}
        {maker.badge && (
          <div className={`${styles.badge} ${styles[`badge-${maker.badge.type}`]}`}>
            <maker.badge.icon size={12} /> {maker.badge.text}
          </div>
        )}

        {/* Favorite Button */}
        <button 
          className={styles.favBtn} 
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label="Toggle favorite"
        >
          <Heart size={20} fill={isFavorite ? "#ef4444" : "none"} color={isFavorite ? "#ef4444" : "white"} />
        </button>

        {/* Overlay Actions */}
        <div className={styles.overlayActions}>
          <button className={styles.quickViewBtn} onClick={() => onSelectMaker(maker.id)}>View Profile</button>
        </div>
      </div>

      <div className={styles.cardInfo} onClick={() => onSelectMaker(maker.id)} style={{ cursor: 'pointer' }}>
        <h3 className={styles.makerName}>{maker.name}</h3>
        <p className={styles.makerLocation}>
          <MapPin size={14} /> {maker.location}
        </p>
        <p className={styles.makerDesc}>{maker.description}</p>
        
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <Box size={16} className={styles.statIcon} />
            <div className={styles.statContent}>
              <strong>{maker.stats.products}+</strong>
              <span>Products</span>
            </div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <Star size={16} className={styles.statIcon} style={{ fill: '#eab308', color: '#eab308' }} />
            <div className={styles.statContent}>
              <strong>{maker.stats.rating}</strong>
              <span>Rating</span>
            </div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <RefreshCw size={16} className={styles.statIcon} />
            <div className={styles.statContent}>
              <strong>{maker.stats.co2}</strong>
              <span>CO₂ Saved</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MakersDirectory = ({ onSelectMaker }) => {
  const { makers } = useEco();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All');

  const filteredMakers = makers.filter(maker => {
    const matchesSearch = maker.name.toLowerCase().includes(search.toLowerCase()) || 
                          maker.location.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <section className={styles.directorySection}>
      <div className="container">
        
        {/* Top Controls Area */}
        <div className={styles.controlsArea}>
          <h2 className={styles.sectionTitle}>Meet Our Amazing Makers</h2>
          
          <div className={styles.filtersWrapper}>
            <div className={styles.dropdown}>
              <span>All Categories</span>
              <ChevronDown size={16} />
            </div>
            <div className={styles.dropdown}>
              <span>All Locations</span>
              <ChevronDown size={16} />
            </div>
            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search makers..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className={styles.cardsGrid}>
          {filteredMakers.map((maker, index) => (
            <MakerCard 
              key={maker.id} 
              maker={maker} 
              index={index} 
              onSelectMaker={onSelectMaker}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default MakersDirectory;
