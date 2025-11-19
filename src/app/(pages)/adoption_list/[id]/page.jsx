import React from 'react';
import AdoptionDetails from '../component/adoptionDetails';
import UserProtectedRoute from '@/components/protectedRoute/UserProtectedRoute';

const adiotionDetailsPage = ({ params }) => {

    console.log(params.id)

    return (
        <UserProtectedRoute>
             <div>
            <AdoptionDetails id={params.id} />
        </div>
       </UserProtectedRoute>
    );
};

export default adiotionDetailsPage;