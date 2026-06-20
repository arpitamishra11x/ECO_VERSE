import React from 'react';
import { Link } from 'react-router-dom';
import AIHero from '../components/sections/AIHero';
import LifestyleFilter from '../components/sections/LifestyleFilter';
import RecommendedCarousel from '../components/sections/RecommendedCarousel';
import BecauseYouPurchased from '../components/sections/BecauseYouPurchased';
import AIImpactBar from '../components/sections/AIImpactBar';
import styles from './AIRecommendationsPage.module.css';

const AIRecommendationsPage = () => {
  const scrollToSidebar = () => {
    const sidebarElement = document.getElementById('lifestyle-filter');
    if (sidebarElement) {
      sidebarElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className={`container ${styles.page}`}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSep}>&gt;</span>
        <span className={styles.breadcrumbCurrent}>AI Recommendations</span>
      </nav>

      {/* Main Grid Layout */}
      <div className={styles.mainLayout}>
        {/* Sidebar */}
        <aside id="lifestyle-filter" className={styles.sidebar}>
          <LifestyleFilter />
        </aside>

        {/* Content Column */}
        <div className={styles.content}>
          <AIHero onEditClick={scrollToSidebar} />
          <RecommendedCarousel />
          <BecauseYouPurchased />
        </div>
      </div>

      {/* Full width bottom bar */}
      <div className={styles.impactBarWrapper}>
        <AIImpactBar />
      </div>
    </div>
  );
};

export default AIRecommendationsPage;
