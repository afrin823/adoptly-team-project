"use client"
import useAxiosPublic from '@/hooks/axiosPublic/useAxiosPublic';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BsFilePost } from 'react-icons/bs';
import { FaCodePullRequest } from 'react-icons/fa6';
import { IoDocumentTextSharp } from 'react-icons/io5';

const UserDashboard = () => {


  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Total Post api
  const { data: totalPost = [], refetch: postRefetch, isLoading: postLoading } = useQuery({
    queryKey: ["totalPost", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/pets/user/${user?.email}`);
      return res.data.pets
    }
  })

  // Total Request api
  const { data: totalRequest = [], refetch: requestRefetch, isLoading: requestLoading } = useQuery({
    queryKey: ["totalRequest", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/request/user/${user?.email}`);
      return res.data.request
    }
  })

  // Total adopted api
  const { data: totaladopted = [], refetch: adoptedRefetch, isLoading: adoptedLoading } = useQuery({
    queryKey: ["totaladopted", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/request/user/${user?.email}`);
      return res.data.request
    }
  })


  console.log('checking post loading', postLoading)

  const filterTotalAdopted = totaladopted.filter(adopted => adopted.isAdopted === true);


  return (
    <div className='my-10 mx-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5'>
        <div className='border p-3 space-y-2 rounded-xl border-[#e76f51] shadow-xl'>
          <div className='flex items-center justify-between '>
            <h3 className='text-[16px] text-[#363636bb]'>Total Post</h3>
            <BsFilePost className='text-3xl text-[#E76F51]' />
          </div>
          <p className='text-3xl font-semibold '>
            {
              postLoading ? (
                <div className="w-10 h-10 rounded-xl animate-pulse bg-gray-200"></div>
              ) : (
                totalPost ? totalPost.length : 0
              )

            }
          </p>
        </div>

        {/* <div className="w-full h-full rounded-xl animate-pulse bg-gray-200"></div> */}
        <div className='border p-3 space-y-2 rounded-xl border-[#e76f51] shadow-xl'>
          <div className='flex items-center justify-between '>
            <h3 className='text-[16px] text-[#363636bb]'>Total Request</h3>
            <FaCodePullRequest className='text-2xl text-[#E76F51]' />
          </div>
          <p className='text-3xl font-semibold'>
            {
              requestLoading ? (
                <div className="w-10 h-10 rounded-xl animate-pulse bg-gray-200"></div>
              ) : (
                totalRequest ? totalRequest.length : 0
              )
            }
          </p>
        </div>
        <div className='border p-3 space-y-2 rounded-xl border-[#e76f51] shadow-xl'>
          <div className='flex items-center justify-between'>
            <h3 className='text-[16px] text-[#363636bb]'>Allready adopted</h3>
            <IoDocumentTextSharp className='text-3xl text-[#E76F51]' />
          </div>
          <p className='text-3xl font-semibold'>
            {
              adoptedLoading ? (
                <div className="w-10 h-10 rounded-xl animate-pulse bg-gray-200"></div>
              ) : (
                filterTotalAdopted ? filterTotalAdopted.length : 0
              )
            }
          </p>
        </div>
      </div >
    </div >
  );
};

export default UserDashboard;