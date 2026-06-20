import React from 'react';
import styles from './AnnouncementBar.module.css';

const AnnouncementBar = () => {
  return (
    <div className={styles.announcementBar}>
      <div className={`container ${styles.content}`}>
        <p>
          <span className={styles.icon}>🌿</span>
          Free Shipping on Orders Above ₹499 | Planting a tree for every order 🌳
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
