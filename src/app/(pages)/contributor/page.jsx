import React from 'react';
import AboutHero from '../about/(component)/aboutHero';
import Contributor from './Contributor';
import AboutSection from '../landing/AboutSection/AboutSection';
import UserProtectedRoute from '@/components/protectedRoute/UserProtectedRoute';

const page = () => {
    return (
        <UserProtectedRoute>
             <div>
             <AboutHero title={"Contributor"} />
             <Contributor />
             <AboutSection />
        </div>
       </UserProtectedRoute>
    );
};

export default page;