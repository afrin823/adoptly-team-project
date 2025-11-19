import React from 'react';
import BlogHero from './component/blogHero'
import BlogCard from './component/blogCards'
import UserProtectedRoute from '@/components/protectedRoute/UserProtectedRoute';


const blogPage = () => {
    return (
        <UserProtectedRoute>
              <div>
            <BlogHero title={"Blog & Article"} />
            <BlogCard />
        </div>
      </UserProtectedRoute>
    );
};

export default blogPage;