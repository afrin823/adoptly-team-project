"use client";

import AdminProtectedRoute from "@/components/protectedRoute/AdminProtectedRoute";
import { adminDataFetching } from "@/hooks/adminDataFetching/admin";
import { motion } from "framer-motion";
import { FaUser, FaPaw,FaHandshake } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";

// 🌀 Animation Variants (Reusable)
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const numberVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.2, type: "spring", stiffness: 200, damping: 10 },
  },
};

const lineVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: 64,
    opacity: 1,
    transition: { delay: 0.4, duration: 0.5 },
  },
};

// 🧠 Component
const AdminDashboard = () => {
  const { data: allUsers, isLoading, error } = adminDataFetching.useUsers();
  const { data: allPets } = adminDataFetching.useAllPets();
  const { data: allPost } = adminDataFetching.useAllPost();
  const { data: allAdoptionPets } = adminDataFetching.useAllAdoptionPets();


  if (isLoading)
    return (
      <p className="text-center py-10 text-gray-500 text-lg">Loading...</p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 text-lg">Failed to load users 😢</p>
    );

  const totalUsers = allUsers?.length || 0;
  const totalPets = allPets?.data?.length || 0;
  const totalPosts = allPost?.length || 0;
  const totalAdoption = allAdoptionPets?.pets?.length || 0;

  return (
 
       <section className="p-8 grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* 🧍‍♂️ All Users Card */}
      <motion.div
        className="bg-orange-300 rounded-3xl shadow-xl p-10 text-center  mx-auto hover:shadow-2xl transition"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-bold flex items-center justify-center gap-2 mb-2"
          variants={numberVariants}
        >
          <FaUser /> {totalUsers}
        </motion.h1>

        <p className="text-lg font-medium text-muted-foreground">
          Total Registered Users
        </p>

        <motion.div
          className="mt-5 w-16 h-1 bg-black mx-auto rounded-full"
          variants={lineVariants}
        />
      </motion.div>

      {/*  All Pets Card */}
      <motion.div
        className="bg-green-300 rounded-3xl shadow-xl p-10 text-center  mx-auto hover:shadow-2xl transition"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-bold flex items-center justify-center gap-2 mb-2"
          variants={numberVariants}
        >
          <FaPaw /> {totalPets}
        </motion.h1>

        <p className="text-lg font-medium text-muted-foreground">
          Total Pets Listed
        </p>

        <motion.div
          className="mt-5 w-16 h-1 bg-black mx-auto rounded-full"
          variants={lineVariants}
        />
      </motion.div>

      {/* 🤝 Total Adoptions */}
      <motion.div
        className="bg-blue-300 rounded-3xl shadow-xl p-10 text-center  mx-auto hover:shadow-2xl transition"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-bold flex items-center justify-center gap-2 mb-2"
          variants={numberVariants}
        >
          <FaHandshake /> {totalAdoption}
        </motion.h1>
        <p className="text-lg font-medium text-muted-foreground">
          Total Successful Adoptions
        </p>
        <motion.div
          className="mt-5 w-16 h-1 bg-black mx-auto rounded-full"
          variants={lineVariants}
        />
      </motion.div>

      {/*  Future Section Placeholder */}
      <motion.div
        className="bg-blue-300 rounded-3xl shadow-xl p-10 text-center w-52  mx-auto hover:shadow-2xl transition"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-bold flex items-center justify-center gap-2 mb-2"
          variants={numberVariants}
        >
          <span><MdPostAdd/></span>{totalPosts}
        </motion.h1>

        <p className="text-lg font-medium text-muted-foreground">
          Total Posts 
        </p>

        <motion.div
          className="mt-5 w-16 h-1 bg-black mx-auto rounded-full"
          variants={lineVariants}
        />
      </motion.div>


    </section>
  
  );
};

export default AdminDashboard;
