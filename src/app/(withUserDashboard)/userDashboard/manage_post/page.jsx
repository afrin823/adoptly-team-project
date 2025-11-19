"use client"
import React, { useState } from 'react';
import UserPost from './component/userPost';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/hooks/axiosPublic/useAxiosPublic';
import useAuth from '@/hooks/useAuth';
import UserProtectedRoute from '@/components/protectedRoute/UserProtectedRoute';




const userManagePost = () => {
    // hooks axios
    const axiosPublic = useAxiosPublic();
    // firebase user
    const { user } = useAuth()
    // Modal state
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    // Get all User Post
    const { data: userPostData = [], refetch, isLoading: loading } = useQuery({
        queryKey: ["userPostData", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/pets/user/${user?.email}`);
            // console.log('checking data', res)
            return res.data.pets
        }
    })

    console.log('checking manage post', userPostData)

    return (
        <UserProtectedRoute>
             <div className='mx-5 my-5'>
            <div className='flex items-center justify-between border p-2'>
                <button onClick={onOpenModal} className='btn bg-[#E76F51] text-white rounded-xl border-0'>Create Post</button>
                <input className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Search...' type="text" />
            </div>
            <UserPost
                refetch={refetch}
                user={user}
                loading={loading}
                userPostData={userPostData}
                open={open}
                onOpenModal={onOpenModal}
                onCloseModal={onCloseModal}
            />
        </div>
       </UserProtectedRoute>
    );
};

export default userManagePost;