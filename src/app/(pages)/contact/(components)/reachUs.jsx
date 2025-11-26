"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

export default function ConnectSection() {
  return (
    <section className="py-20 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full h-80 md:h-[500px] rounded-2xl shadow-lg overflow-hidden"
        >
          <Image
            src="/contact/reachUs.jpg"
            alt="Contact Us"
            fill
            className="object-cover"
          />

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-start gap-5 absolute -bottom-10 bg-white dark:bg-[#0D1B2A] shadow-lg rounded-2xl p-5 w-96 h-40"
          >
            <div className="flex items-center justify-center w-20 h-12 bg-red-400 rounded-lg text-white mb-4">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold dark:text-[#cfcfcf] mb-2">Location</h3>
              <p className="text-gray-600 dark:text-[#bbb]">
                789 Oak St, Smalltown, TX 23456, United States
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE CONTENT */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[#e76f51] uppercase font-semibold tracking-wide mb-2"
          >
            Get In Touch
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 dark:text-[#cfcfcf] mb-4"
          >
            Don&apos;t hesitate to contact us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-[#bbb] mb-8"
          >
            Potenti felis molestie erat mollis platea consectetur curae et gravida.
            In si laoreet purus lacus pede pretium a senectus ad feugiat.
          </motion.p>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <div className="flex items-center justify-center w-12 px-3 h-12 bg-red-400 rounded-lg text-white">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-bold text-xl dark:text-[#cfcfcf]">Email Us</h3>
                <p className="text-gray-600  dark:text-[#bbb]">jubayerahmed2462@gmail.com</p>
                <p className="text-gray-600 dark:text-[#bbb]">kalidashodekare14@gmail.com</p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex gap-4 lg:ml-5"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-red-400 rounded-lg text-white">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="font-bold text-xl dark:text-[#cfcfcf]">Call Us</h3>
                <p className="text-gray-600  dark:text-[#bbb]">Phone 1: +8801568692142</p>
                <p className="text-gray-600  dark:text-[#bbb]">Phone 2: +8801776046270</p>
              </div>
            </motion.div>
          </div>

          <hr className="my-6" />

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-xl mb-4">Our social media:</h3>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  className="w-12 h-12 flex items-center justify-center bg-[#e76f51ee] hover:bg-[#e76f51] rounded-md text-white"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
