import React from 'react';
import Hero from '../components/sections/Hero';
import ImpactMetrics from '../components/sections/ImpactMetrics';
import CategorySection from '../components/sections/CategorySection';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import MakerSpotlight from '../components/sections/MakerSpotlight';
import CommunityPreview from '../components/sections/CommunityPreview';
import EcoChallenge from '../components/sections/EcoChallenge';
import Newsletter from '../components/sections/Newsletter';

const HomePage = () => {
  return (
    <>
      <Hero />
      <ImpactMetrics />
      <CategorySection />
      <FeaturedProducts />
      <MakerSpotlight />
      <CommunityPreview />
      <EcoChallenge />
      <Newsletter />
    </>
  );
};

export default HomePage;
