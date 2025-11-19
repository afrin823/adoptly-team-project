'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MdPets } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { adminDataFetching } from '@/hooks/adminDataFetching/admin';
import useAuth from '@/hooks/useAuth';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { axiosPublic } from '@/lib/axios/axios';
import AdminProtectedRoute from '@/components/protectedRoute/AdminProtectedRoute';

// 🌀 Framer Motion Animation Variants
const animationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
};

const AllPets = () => {
  const { user } = useAuth();
  const { data: allPets, isLoading, error, refetch } = adminDataFetching.useAllPets();

  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

 // ✅ Accept Pet
const handleAccepted = async (id) => {
  try {
    const res = await axiosPublic.put(`/pets/${id}`, {
      userEmail: user?.email,
      status: 'accepted',
    });

    if (res.status === 200) {
      toast.success('Pet adoption request accepted ✅');
      refetch();
    } else {
      toast.error(res.data?.message || 'Failed to update status');
    }
  } catch (err) {
    toast.error(err.response?.data?.message || 'Something went wrong');
  }
};

  // ✅ Reject Pet (open modal first)
  const handleRejectClick = (pet) => {
    setSelectedPet(pet);
    setOpenRejectModal(true);
  };

 // ✅ Confirm Reject
const confirmReject = async () => {
  try {
    const res = await axiosPublic.put(`/pets/${selectedPet._id}`, {
      userEmail: user?.email,
      status: 'rejected',
    });

    if (res.status === 200) {
      toast.success('Pet adoption request rejected ❌');
      refetch();
    } else {
      toast.error(res.data?.message || 'Failed to update status');
    }
  } catch (err) {
    toast.error(err.response?.data?.message || 'Something went wrong');
  } finally {
   setOpenRejectModal(false);
  }
};

  // ✅ Loading & Error States
  if (isLoading)
    return <p className="text-center py-10 text-gray-500 text-lg animate-pulse">Loading pets...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500 text-lg">Failed to load pets 😢</p>;

  return (
    <AdminProtectedRoute>
       <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <MdPets className="text-3xl text-primary" />
        <h1 className="text-3xl font-bold text-gray-700">All Pets</h1>
      </div>

      {/* Table */}
      <motion.div
        variants={animationVariants.container}
        initial="hidden"
        animate="visible"
        className="overflow-x-auto rounded-xl shadow-md"
      >
        <Table className="min-w-full text-sm md:text-base ">
          <TableCaption>All Pets List Management</TableCaption>

          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[40px] text-center font-semibold">#</TableHead>
              <TableHead className="font-semibold">Image</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Age</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-center font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allPets?.data?.map((pet, index) => (
              <motion.tr
                key={pet._id}
                variants={animationVariants.item}
                className="border-b hover:bg-gray-50 transition"
              >
                <TableCell className="text-center">{index + 1}</TableCell>

                <TableCell>
                  <div className="w-12 h-12 relative">
                    <Image
                      src={pet.image}
                      alt={pet.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                </TableCell>

                <TableCell className="font-medium">{pet.name}</TableCell>
                <TableCell className="max-w-xs truncate hover:text-black">{pet.description}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs md:text-sm ${
                      pet.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : pet.status === 'accepted'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-rose-100 text-rose-600'
                    }`}
                  >
                    {pet.status}
                  </span>
                </TableCell>

                <TableCell className="text-center">
                  {pet.status === 'pending' && (
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        onClick={() => handleAccepted(pet._id)}
                        className="bg-green-200 text-green-600 hover:bg-green-300 text-xs md:text-sm cursor-pointer"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleRejectClick(pet)}
                        className="bg-rose-200 text-rose-600 hover:bg-rose-300 text-xs md:text-sm cursor-pointer"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* 🧩 Reject Confirmation Modal */}
      <AlertDialog open={openRejectModal} onOpenChange={setOpenRejectModal}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject <b>{selectedPet?.name}</b>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenRejectModal(false)} className={'cursor-pointer'}>
              Cancel
            </Button>
            <Button
              onClick={confirmReject}
              className="bg-rose-500 hover:bg-rose-600 text-white cursor-pointer"
            >
              Confirm Reject
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
   </AdminProtectedRoute>
  );
};

export default AllPets;
