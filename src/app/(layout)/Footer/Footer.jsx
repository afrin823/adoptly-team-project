import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdOutlinePets, MdAttachEmail } from "react-icons/md";

const Footer = () => {
  const socialIcons = [FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn];

  const quickLinks = [
    { text: 'About Us', href: '/about' },
    { text: 'Contact Us', href: '/contact' },
    { text: 'Services', href: '/services' },
  ];

  const getInvolvedLinks = [
    { text: 'Adopting Pets', href: '/adoption_list' },
    { text: 'Dog Adoption', href: '/adoption_list' },
    { text: 'Cat Adoption', href: '/adoption_list' },
  ];

  return (
    <section className="bg-gray-900 text-gray-300 mt-20">
      <div className="w-11/12 mx-auto py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo & Social */}
          <div className="space-y-5">
            <h1 className="text-3xl sm:text-4xl font-bold">Adoptly</h1>
            <p className="text-gray-400">
              Scelerisque vivamus nisi leo semper pretium sagittis lobortis luctus.
            </p>
            <div className="flex flex-wrap gap-3 text-xl mt-3">
              {socialIcons.map((Icon, i) => (
                <Link key={i} href="#">
                  <button className="border border-orange-400 p-3 rounded-xl hover:bg-orange-200 transition">
                    <Icon className="text-orange-400 hover:text-orange-500 cursor-pointer transition" />
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i} className="hover:text-orange-400 transition flex items-center">
                  <MdOutlinePets className="mr-2 text-orange-400" /> 
                  <Link href={link.href}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase mb-4">Get Involved</h2>
            <ul className="space-y-2">
              {getInvolvedLinks.map((link, i) => (
                <li key={i} className="hover:text-orange-400 transition flex items-center">
                  <MdOutlinePets className="mr-2 text-orange-400" />
                  <Link href={link.href}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="relative sm:top-1 p-5 space-y-5 bg-gray-700 rounded-lg border-4 flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-center">Subscribe Newsletter</h2>
            <p className="text-center text-gray-300">
              To get the latest on pet adoption and pet care, sign up for the Furrescue newsletter.
            </p>
            <hr className="border-gray-500" />
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-400 bg-gray-200 placeholder:text-gray-400 rounded-lg p-3 focus:outline-none focus:border-orange-400"
              />
              <button type="submit" className="w-full bg-orange-400 text-white rounded-lg p-3 hover:bg-orange-500 transition">
                <MdAttachEmail className="inline-block mr-2" />Sign Up
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Footer;
