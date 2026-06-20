import React from 'react';
import MakersHero from '../components/sections/MakersHero';
import MakersDirectory from '../components/sections/MakersDirectory';
import ImpactBanner from '../components/sections/ImpactBanner';
import TrustValues from '../components/sections/TrustValues';

const MakersPage = () => {
  return (
    <div className="makers-page">
      <MakersHero />
      <MakersDirectory />
      <ImpactBanner />
      <TrustValues />
    </div>
  );
};

export default MakersPage;
