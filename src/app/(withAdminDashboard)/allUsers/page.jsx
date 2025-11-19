'use client';

import React, { useState } from 'react';
import { adminDataFetching } from '@/hooks/adminDataFetching/admin';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { axiosPublic } from '@/lib/axios/axios';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import AdminProtectedRoute from '@/components/protectedRoute/AdminProtectedRoute';

// 🎞 Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const AllUserPage = () => {
  const { data: allUsers, isLoading, error, refetch } = adminDataFetching.useUsers();
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);

  if (isLoading)
    return (
      <p className="text-center py-10 text-gray-500 text-lg animate-pulse">
        Loading users...
      </p>
    );

  if (error)
    return (
      <p className="text-center py-10 text-red-500 text-lg">
        Failed to load users 😢
      </p>
    );

  // 🧩 Make User Admin
  const handleMakeAdmin = async (email) => {
    try {
      await axiosPublic.patch(`/user/admin/${email}`);
      toast.success('✅ User promoted to Admin');
      refetch();
    } catch {
      toast.error('Something went wrong');
    }
  };

  // 🧩 Delete User
  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await axiosPublic.delete(`/user/${selectedUser.email}`);
      toast.success('🗑️ User deleted successfully');
      refetch();
    } catch {
      toast.error('Failed to delete user');
    } finally {
      setSelectedUser(null);
    }
  };

  return (
    <AdminProtectedRoute>
       <section className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <FaUser className="text-orange-500" />
          All Registered Users
        </h1>
        <span className="text-gray-600 font-medium mt-2 sm:mt-0">
          Total Users: {allUsers?.length || 0}
        </span>
      </div>

      {/* Table */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white shadow-lg rounded-2xl border border-gray-200 p-4 md:p-8 overflow-x-auto"
      >
        <Table>
          <TableCaption>A list of all registered users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] text-black">#</TableHead>
              <TableHead className="text-black">Photo</TableHead>
              <TableHead className="text-black">Name</TableHead>
              <TableHead className="text-black">Email</TableHead>
              <TableHead className="text-black">Role</TableHead>
              <TableHead className="text-center text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allUsers?.map((user, index) => (
              <motion.tr
                key={user._id}
                variants={rowVariants}
                className="hover:bg-orange-50 transition-colors duration-200"
              >
                <TableCell className="font-medium text-gray-700">{index + 1}</TableCell>

                <TableCell>
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="rounded-full h-12 w-12 border border-gray-300 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full text-gray-500">
                      <FaUser />
                    </div>
                  )}
                </TableCell>

                <TableCell className="font-semibold text-gray-800">{user.name}</TableCell>
                <TableCell className="text-gray-600">{user.email}</TableCell>

                <TableCell className="capitalize">
                  {user.role === 'admin' ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                      <MdAdminPanelSettings size={18} /> Admin
                    </span>
                  ) : (
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                      <FaUser size={16} /> User
                    </span>
                  )}
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                    {user.role !== 'admin' && (
                      <Button
                        onClick={() => handleMakeAdmin(user.email)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 text-sm rounded-full"
                      >
                        Make Admin
                      </Button>
                    )}

                    {/* Delete with confirmation modal */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          onClick={() => setSelectedUser(user)}
                          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-1 text-sm rounded-full"
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. It will permanently delete{" "}
                            <strong>{selectedUser?.name}</strong>’s account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-rose-500 hover:bg-rose-600 text-white"
                          >
                            Confirm Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </section>
   </AdminProtectedRoute>
  );
};

export default AllUserPage;
