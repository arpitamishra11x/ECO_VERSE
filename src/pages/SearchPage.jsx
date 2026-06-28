import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Clock, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEco } from '../context/EcoContext';
import ProductCard from '../components/shared/ProductCard';
import styles from './SearchPage.module.css';

const SearchPage = () => {
  const { products, sendAIPrompt, triggerNotification } = useEco();
  const navigate = useNavigate();
  
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [recentSearches, setRecentSearches] = useState(['Bamboo Toothbrush', 'Plastic-free kitchen', 'Organic cotton', 'Vegan soap']);
  
  const categories = ['All', 'Home & Living', 'Personal Care', 'Fashion & Bags'];
  const quickFilters = ['Handmade', 'Plastic-Free', 'Organic', 'Vegan', 'Recycled'];

  // Basic search filtering
  const searchResults = query.trim() === '' 
    ? [] 
    : products.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.material.toLowerCase().includes(query.toLowerCase());
        const matchesCat = activeCategory === 'All' || p.category === activeCategory;
        return matchesQuery && matchesCat;
      });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches([query.trim(), ...recentSearches.slice(0, 4)]);
    }
  };

  const handleAISuggestions = () => {
    sendAIPrompt('What are some sustainable alternatives for everyday household items?');
    triggerNotification('AI is analyzing sustainable alternatives...', 'success');
  };

  const handleRecentClick = (term) => {
    setQuery(term);
  };

  const clearRecent = () => {
    setRecentSearches([]);
  };

  return (
    <div className={styles.page}>
      <div className="container">
        
        {/* Search Header */}
        <div className={styles.searchHeader}>
          <h1 className={styles.searchTitle}>Smart Search</h1>
          <p className={styles.searchDesc}>Discover thousands of verified sustainable products, makers, and collections.</p>
        </div>

        {/* Main Search Box */}
        <motion.div 
          className={styles.searchBox}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSearchSubmit}>
            <div className={styles.inputWrapper}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search products, materials, or makers..."
                className={styles.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <button type="button" className={styles.aiSuggestBtn} onClick={handleAISuggestions}>
                <Sparkles size={16} /> AI Suggestions
              </button>
            </div>
            
            <div className={styles.filtersRow}>
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Category</span>
                <select 
                  className={styles.filterSelect}
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Sort By</span>
                <select className={styles.filterSelect}>
                  <option>Relevance</option>
                  <option>Highest Eco Score</option>
                  <option>Price: Low to High</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            <div className={styles.quickFilters}>
              <span className={styles.filterLabel} style={{ display: 'block', marginBottom: '0.5rem' }}>Quick Filters</span>
              <div className={styles.pillsRow}>
                {quickFilters.map(filter => (
                  <button 
                    key={filter} 
                    type="button" 
                    className={`${styles.pill} ${query.toLowerCase().includes(filter.toLowerCase()) ? styles.active : ''}`}
                    onClick={() => setQuery(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </motion.div>

        {/* Search Content Area */}
        <div className={styles.searchContent}>
          {query.trim() === '' ? (
            /* Show Recent Searches when empty */
            <motion.div 
              className={styles.recentSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}><Clock size={18} /> Recent Searches</h3>
                {recentSearches.length > 0 && (
                  <button className={styles.clearBtn} onClick={clearRecent}>Clear All</button>
                )}
              </div>
              
              {recentSearches.length > 0 ? (
                <div className={styles.recentList}>
                  {recentSearches.map(term => (
                    <div key={term} className={styles.recentItem} onClick={() => handleRecentClick(term)}>
                      <Search size={14} />
                      <span className={styles.recentText}>{term}</span>
                      <ArrowRight size={14} style={{ opacity: 0.5 }} />
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No recent searches.</p>
              )}
            </motion.div>
          ) : (
            /* Show Results when searching */
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.25rem' }}>
                  Results for "{query}"
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{searchResults.length} products found</span>
              </div>
              
              {searchResults.length > 0 ? (
                <motion.div layout className={styles.resultsGrid}>
                  <AnimatePresence>
                    {searchResults.map((product, idx) => (
                      <motion.div 
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ProductCard product={product} index={idx} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0', background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <Search size={48} style={{ color: 'var(--text-secondary)', opacity: 0.3, marginBottom: '1rem' }} />
                  <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '0.5rem' }}>No results found</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filters to find what you're looking for.</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SearchPage;
