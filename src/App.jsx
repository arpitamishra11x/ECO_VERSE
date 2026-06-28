import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import MakersPage from './pages/MakersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AIRecommendationsPage from './pages/AIRecommendationsPage';
import ShopPage from './pages/ShopPage';
import CommunityPage from './pages/CommunityPage';
import RewardsPage from './pages/RewardsPage';
import SellerPage from './pages/SellerPage';
import StoriesPage from './pages/StoriesPage';
import SearchPage from './pages/SearchPage';
import CollectionsPage from './pages/CollectionsPage';
import ChallengesPage from './pages/ChallengesPage';
import PassportPage from './pages/PassportPage';
import { EcoProvider, useEco } from './context/EcoContext';
import { ShieldAlert, HelpCircle } from 'lucide-react';

const RoleSwitcher = () => {
  const { user, switchRole } = useEco();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="role-switcher-container">
      <button 
        className="role-switcher-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Role switcher"
      >
        <ShieldAlert size={18} />
        <span>Role: {user.role.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="role-switcher-menu">
          <div className="role-switcher-header">Test Personas</div>
          <button 
            className={`role-switcher-item ${user.role === 'customer' ? 'active' : ''}`}
            onClick={() => { switchRole('customer'); setIsOpen(false); }}
          >
            <strong>Customer Mode</strong>
            <span>Arpita (conscious consumer)</span>
          </button>
          <button 
            className={`role-switcher-item ${user.role === 'seller' ? 'active' : ''}`}
            onClick={() => { switchRole('seller'); setIsOpen(false); }}
          >
            <strong>Seller Mode</strong>
            <span>Rajesh (Karthik Pottery maker)</span>
          </button>
          <button 
            className={`role-switcher-item ${user.role === 'admin' ? 'active' : ''}`}
            onClick={() => { switchRole('admin'); setIsOpen(false); }}
          >
            <strong>Admin Mode</strong>
            <span>Platform Director</span>
          </button>
          <div className="role-switcher-help">
            <HelpCircle size={12} />
            <span>Switch to test Seller Analytics and passport leveling.</span>
          </div>
        </div>
      )}
    </div>
  );
};

const MobileBottomNav = () => {
  return (
    <div className="mobile-bottom-nav">
      <Link to="/" className="mobile-nav-item">
        <svg size={20} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>Home</span>
      </Link>
      <Link to="/search" className="mobile-nav-item">
        <svg size={20} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search</span>
      </Link>
      <Link to="/shop" className="mobile-nav-item">
        <svg size={20} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span>Shop</span>
      </Link>
      <Link to="/collections" className="mobile-nav-item">
        <svg size={20} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span>Saved</span>
      </Link>
      <Link to="/passport" className="mobile-nav-item">
        <svg size={20} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>Profile</span>
      </Link>
    </div>
  );
};

function AppContent() {
  return (
    <div className="app-container">
      <AnnouncementBar />
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/makers" element={<MakersPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/ai-recommendations" element={<AIRecommendationsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/seller" element={<SellerPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/passport" element={<PassportPage />} />
        </Routes>
      </main>
      
      <Footer />
      <RoleSwitcher />
      <MobileBottomNav />
    </div>
  );
}

function App() {
  return (
    <Router>
      <EcoProvider>
        <AppContent />
      </EcoProvider>
    </Router>
  );
}

export default App;
