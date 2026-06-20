import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, FolderHeart, LayoutGrid, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEco } from '../context/EcoContext';
import ProductCard from '../components/shared/ProductCard';
import styles from './CollectionsPage.module.css';

const CollectionsPage = () => {
  const { user, products, wishlist, createCollection, triggerNotification } = useEco();
  const [activeTab, setActiveTab] = useState('collections');
  const [showCreateCol, setShowCreateCol] = useState(false);
  const [newColName, setNewColName] = useState('');

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    createCollection(newColName);
    setNewColName('');
    setShowCreateCol(false);
    triggerNotification(`Collection "${newColName}" created successfully!`, 'success');
  };

  const getProductImage = (id) => {
    return products.find(p => p.id === id)?.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&q=80';
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Saved & Collections</h1>
          <p className={styles.subtitle}>Organize your favorite sustainable finds and share them with the world.</p>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'collections' ? styles.active : ''}`}
            onClick={() => setActiveTab('collections')}
          >
            My Collections
            {activeTab === 'collections' && <div className={styles.tabIndicator} />}
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'wishlist' ? styles.active : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            Wishlist ({wishlist.length})
            {activeTab === 'wishlist' && <div className={styles.tabIndicator} />}
          </button>
        </div>

        {activeTab === 'collections' && (
          <motion.div 
            className={styles.grid}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Create New Card */}
            <div className={`${styles.collectionCard} ${styles.createCard}`} onClick={() => setShowCreateCol(true)}>
              <div className={styles.createIcon}>
                <Plus size={24} />
              </div>
              <span style={{ fontWeight: 600 }}>Create New Collection</span>
            </div>

            {/* Existing Collections */}
            {user.collections.map((col, i) => (
              <motion.div 
                key={col.id} 
                className={styles.collectionCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className={styles.collage}>
                  {col.items.length > 0 ? (
                    col.items.slice(0, 4).map((itemId, idx) => (
                      <img key={idx} src={getProductImage(itemId)} alt="Product" className={styles.collageItem} />
                    ))
                  ) : (
                    <div className={styles.emptyCollage}>
                      <FolderHeart size={32} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                      <span style={{ fontSize: '0.85rem' }}>Empty Collection</span>
                    </div>
                  )}
                </div>
                <div className={styles.collectionInfo}>
                  <h3 className={styles.collectionName}>{col.name}</h3>
                  <span className={styles.itemCount}>{col.items.length} items</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'wishlist' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {wishlistProducts.length > 0 ? (
              <div className={styles.wishlistGrid}>
                {wishlistProducts.map((product, idx) => (
                  <Link to={`/products/${product.slug}`} key={product.id}>
                    <ProductCard product={product} index={idx} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <Heart size={48} style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
                <h3>Your Wishlist is Empty</h3>
                <p>Save products you love to your wishlist to find them easily later.</p>
                <Link to="/shop" className="btn btn-primary">Explore Products</Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Create Modal */}
        {showCreateCol && (
          <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowCreateCol(false)}>
            <div className="modal-card" style={{ background: '#fff', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '400px', boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.25rem' }}>Create Collection</h3>
                <button onClick={() => setShowCreateCol(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleCreateSubmit}>
                <input 
                  type="text" 
                  placeholder="Collection Name (e.g., Plastic-Free Kitchen)" 
                  value={newColName}
                  onChange={e => setNewColName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', outline: 'none', fontSize: '0.95rem' }}
                  autoFocus
                />
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Collection</button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CollectionsPage;
