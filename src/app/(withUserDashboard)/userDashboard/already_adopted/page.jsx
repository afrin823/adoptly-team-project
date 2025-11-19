"use client"
import useAxiosPublic from '@/hooks/axiosPublic/useAxiosPublic';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdoptedList from './component/adoptedList';
import UserProtectedRoute from '@/components/protectedRoute/UserProtectedRoute';

const userAlreadyAdopted = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: adoptedData = [], refetch, isLoading: loading } = useQuery({
        queryKey: ["adoptedData", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/request/user/${user?.email}`);
            // console.log('checking data', res)
            return res.data.request
        }
    })

    const adoptedFilterData = adoptedData.filter(adopt => adopt.isAdopted === true);

    console.log('checking adopted data', adoptedData);

    return (
        <UserProtectedRoute>
             <div>
            <div className='flex items-center justify-between border p-2'>
                {/* <button className='btn bg-[#E76F51] text-white rounded-xl border-0'>Create Post</button> */}
                <input className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Search...' type="text" />
            </div>
            <AdoptedList
                adoptedData={adoptedData}
                adoptedFilterData={adoptedFilterData}
            />
        </div>
       </UserProtectedRoute>
    );
};

export default userAlreadyAdopted;