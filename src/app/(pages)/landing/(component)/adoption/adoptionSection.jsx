"use client";

import { motion } from "framer-motion";

import './adoptionSection.css'

export default function AdoptionSection() {
  // animation bottom-to-top fade-in
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="w-full relative">
      <div className="absolute inset-0 bg-black/50"></div>

      {/* content */}
      <div
        className="adoptionImage relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center p-6 md:p-12 bg-cover bg-center rounded-2xl overflow-hidden">
        {/* play */}
        <div className="w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
          <button className="w-20 h-20 animate-pulse bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-red-500 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 22v-20l18 10-18 10z" />
            </svg>
          </button>
        </div>

        {/* right sight text */}
        <motion.div
          className="w-full md:w-1/2 text-white md:pl-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariant}
        >
          <motion.p
            className="text-md text-orange-400 font-bold  uppercase tracking-wide mb-2"
            variants={textVariant}
          >
            Success Stories
          </motion.p>
          <motion.h2
            className="text-3xl dark:text-black md:text-4xl font-bold leading-snug mb-4"
            variants={textVariant}
          >
            Choose adoption and become part <br /> of a pet’s happily ever after
          </motion.h2>
          <motion.p className="text-gray-200 dark:text-[#000000] mb-6" variants={textVariant}>
            Magna curabitur laoreet mattis dignissim senectus purus finibus gravida.
            Nec rutrum conubia aliquet accumsan curabitur orci mollis consectetur
            nostra diam fames.
          </motion.p>
          <motion.button
            className="bg-[#E76F51]  text-[#e9e9e9] cursor-pointer font-semibold px-6 py-3 rounded-lg shadow-md transition"
            variants={textVariant}
          >
            View More Stories
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
