import UserProtectedRoute from '@/components/protectedRoute/UserProtectedRoute';
import React from 'react';

const blogDetails = () => {
    return (
        <UserProtectedRoute>
             <div>
            <h1>Blog Details</h1>
        </div>
       </UserProtectedRoute>
    );
};

export default blogDetails;