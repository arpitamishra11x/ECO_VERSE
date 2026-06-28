import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sliders, X, Leaf, Sparkles } from 'lucide-react';
import { useEco } from '../context/EcoContext';
import ProductCard from '../components/shared/ProductCard';
import styles from './ShopPage.module.css';

const ShopPage = () => {
  const { products, addSearchQuery } = useEco();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [minEcoScore, setMinEcoScore] = useState(0);

  // Sync state with URL search param
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    setSearchQuery(urlQuery);
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { q: searchQuery } : {});
    addSearchQuery(searchQuery);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleMaterial = (material) => {
    setSelectedMaterials(prev =>
      prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setMinEcoScore(0);
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.material.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
    const matchesEcoScore = product.ecoScore >= minEcoScore;

    return matchesSearch && matchesCategory && matchesMaterial && matchesEcoScore;
  });

  const allCategories = ['Personal Care', 'Home & Living', 'Fashion & Bags'];
  const allMaterials = ['Bamboo', 'Clay', 'Organic Cotton', 'Copper', 'Natural Oils', 'Beeswax', 'Charcoal / Silk'];

  return (
    <div className={`container ${styles.shopPage}`}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Eco-Conscious Marketplace</h1>
        <p className={styles.pageSubtitle}>Every purchase supports local makers and reduces carbon waste.</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className={styles.searchBar}>
        <Search size={20} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search sustainable products, materials, or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button 
            type="button" 
            className="clear-search-btn" 
            onClick={() => { setSearchQuery(''); setSearchParams({}); }}
            style={{
              position: 'absolute',
              right: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={16} />
          </button>
        )}
      </form>

      <div className={styles.layout}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <div className={styles.filterTitle}>Categories</div>
            <div className={styles.filterList}>
              {allCategories.map(cat => (
                <label key={cat} className={styles.filterCheckboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterTitle}>Eco Score</div>
            <div className={styles.filterList}>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={minEcoScore}
                onChange={(e) => setMinEcoScore(parseFloat(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.rangeLabels}>
                <span>Min: 0.0</span>
                <strong>{minEcoScore.toFixed(1)}+</strong>
                <span>Max: 10.0</span>
              </div>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterTitle}>Material</div>
            <div className={styles.filterList}>
              {allMaterials.map(mat => (
                <label key={mat} className={styles.filterCheckboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(mat)}
                    onChange={() => toggleMaterial(mat)}
                  />
                  <span>{mat}</span>
                </label>
              ))}
            </div>
          </div>

          {(selectedCategories.length > 0 || selectedMaterials.length > 0 || minEcoScore > 0 || searchQuery) && (
            <button className="btn btn-outline" onClick={clearAllFilters} style={{ width: '100%', fontSize: '0.85rem' }}>
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Products Column */}
        <div style={{ flex: 1 }}>
          {/* Active filter display */}
          <div className={styles.activeFilters}>
            {selectedCategories.map(cat => (
              <button key={cat} className={styles.activeFilterPill} onClick={() => toggleCategory(cat)}>
                Category: {cat} <X size={12} />
              </button>
            ))}
            {selectedMaterials.map(mat => (
              <button key={mat} className={styles.activeFilterPill} onClick={() => toggleMaterial(mat)}>
                Material: {mat} <X size={12} />
              </button>
            ))}
            {minEcoScore > 0 && (
              <button className={styles.activeFilterPill} onClick={() => setMinEcoScore(0)}>
                Eco Score: {minEcoScore.toFixed(1)}+ <X size={12} />
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <motion.div layout className={styles.productsGrid}>
              <AnimatePresence>
                {filteredProducts.map((product, idx) => (
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
            <div className={styles.noResults}>
              <Leaf size={48} className={styles.noResultsIcon} style={{ color: 'var(--text-secondary)', marginBottom: '1rem', opacity: 0.5 }} />
              <h3 className={styles.noResultsTitle}>No Sustainable Products Found</h3>
              <p className={styles.noResultsText}>Try adjusting your filters or checking your search query spelling.</p>
              <button className="btn btn-primary" onClick={clearAllFilters} style={{ marginTop: '1.25rem', fontSize: '0.85rem' }}>
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
