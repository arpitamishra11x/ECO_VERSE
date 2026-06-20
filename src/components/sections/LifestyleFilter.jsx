import React, { useState } from 'react';
import { Leaf, Recycle, Hand, Flower2, Heart, RefreshCw, Handshake } from 'lucide-react';
import styles from './LifestyleFilter.module.css';

const initialToggles = [
  { id: 'vegan', label: 'Vegan?', icon: Leaf, defaultValue: true },
  { id: 'plasticFree', label: 'Plastic-Free?', icon: Recycle, defaultValue: true },
  { id: 'handmade', label: 'Handmade?', icon: Hand, defaultValue: true },
  { id: 'organic', label: 'Organic?', icon: Flower2, defaultValue: true },
  { id: 'crueltyFree', label: 'Cruelty-Free?', icon: Heart, defaultValue: false },
  { id: 'recycled', label: 'Recycled?', icon: RefreshCw, defaultValue: false },
  { id: 'fairTrade', label: 'Fair Trade?', icon: Handshake, defaultValue: false }
];

const LifestyleFilter = () => {
  const [preferences, setPreferences] = useState(() => {
    const initialState = {};
    initialToggles.forEach(toggle => {
      initialState[toggle.id] = toggle.defaultValue;
    });
    return initialState;
  });

  const handleToggle = (id) => {
    setPreferences(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleReset = () => {
    const resetState = {};
    initialToggles.forEach(toggle => {
      resetState[toggle.id] = toggle.defaultValue;
    });
    setPreferences(resetState);
  };

  const handleUpdate = () => {
    console.log('Updated Preferences:', preferences);
    alert('Preferences updated successfully!');
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Find Products Matching Your Lifestyle</h3>
      <p className={styles.subtitle}>Answer a few questions to get better recommendations</p>

      <div className={styles.toggleList}>
        {initialToggles.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className={styles.toggleItem}>
              <div className={styles.itemLeft}>
                <Icon className={styles.icon} size={18} />
                <span className={styles.label}>{item.label}</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={preferences[item.id]}
                  onChange={() => handleToggle(item.id)}
                />
                <span className={styles.slider} />
              </label>
            </div>
          );
        })}
      </div>

      <button className={styles.button} onClick={handleUpdate}>
        Update Preferences
      </button>

      <button className={styles.resetLink} onClick={handleReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default LifestyleFilter;
