"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SupportHero() {
  // Animation variants for bottom-to-top fade-in
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className="relative w-full bg-[#c76046] text-center pt-20 overflow-hidden">

      <div className="absolute inset-0 bg-contain"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-4 flex flex-col items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold text-white leading-snug dark:text-black font-truculenta"
          variants={textVariant}
        >
          Your Support, Their Second Chance at a <br />
          Happier, Healthier Life
        </motion.h1>

        <motion.p
          className="text-white/90 mt-4 text-base md:text-lg font-lato dark:text-black"
          variants={textVariant}
        >
          Tortor lorem venenatis id donec litora praesent pretium lacus quam.
          Consequat suspendisse proin sit quam elit cursus vestibulum rutrum
          interdum duis.
        </motion.p>

        {/* Buttons */}
        <motion.div className="mt-6 flex justify-center gap-4" variants={textVariant}>
          <button className="bg-[#f05f3b] cursor-pointer hover:bg-opacity-0 hover:outline-2 hover:outline-[#e76f51] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
            Donate Now
          </button>
          <button className="border border-[#bbbb] cursor-pointer hover:bg-[#e76f51] duration-150 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
            Be Volunteer
          </button>
        </motion.div>
      </motion.div>

      {/* Pets Image */}
      <div className="relative z-10 flex justify-center mt-10">
        <Image
          src="/images/hero/dogs.png"
          alt="Pets"
          width={1000}
          height={400}
          className="object-contain"
        />
      </div>
    </section>
  );
}
