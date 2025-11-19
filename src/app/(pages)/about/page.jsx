import React from 'react';
import AboutHero from './(component)/aboutHero';
import MissionSection from './(component)/missionSection';
import StatsSection from './(component)/statsSection';
import PetAboutUs from './(component)/petAboutUs';
import FeaturesSection from './(component)/featuresSection';
import GallerySection from './(component)/gallerySection';
import UserProtectedRoute from '@/components/protectedRoute/UserProtectedRoute';

const About = () => {
    return (
      <UserProtectedRoute>
          <div className=''>
          <AboutHero title={"About us"} /> 
          <MissionSection />
          <StatsSection />
          <PetAboutUs />
          <FeaturesSection />
          <GallerySection />
        </div>
      </UserProtectedRoute>
    );
};

export default About;