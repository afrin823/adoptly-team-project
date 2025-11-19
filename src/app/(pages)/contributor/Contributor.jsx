import UserProtectedRoute from '@/components/protectedRoute/UserProtectedRoute';
import React from 'react';
import { AiFillGithub, AiOutlineDribbble, AiOutlineTwitter, AiOutlineMail, AiFillLinkedin } from 'react-icons/ai';

const users = [
  {
    id: 1,
    name: "Kalidash Odekare",
    email: "kalidashodekare14@gmail.com",
    role: "Frontend Developer",
    country: "Bangladesh",
    img: "/team/kalidash.webp",
    linkedin: "https://www.linkedin.com/in/kalidash-odekare-webdev",
    github: "https://github.com/kalidashodekare14",
    portfolio: "https://dev-kalidash.vercel.app"
  },
  {
    id: 2,
    name: "Sharmin Akter Reka",
    email: "rikasharmin181@gmail.com",
    role: "Backend Developer",
    country: "Bangladesh",
    img: "/team/sarmin.webp",
    linkedin: "https://www.linkedin.com/in/sharmin-rika-2b17a42b4",
    github: "https://github.com/Rika4698",
    portfolio: "https://my-portfolio-df10f.web.app"
  },
  {
    id: 3,
    name: "Afrin",
    email: "afrin12490@gmail.com",
    role: "Frontend Developer",
    country: "Bangladesh",
    img: "/team/afrin.jpg",
    linkedin: "https://www.linkedin.com/in/afrin025",
    github: "https://github.com/afrin823",
    portfolio: "https://afrin-portfolio-three.vercel.app"
  },
  {
    id: 4,
    name: "Jubayer Ahmed",
    email: "jubayerahmed2462@gmail.com",
    role: "Frontend Developer",
    country: "Bangladesh",
    img: "/team/jubayer.webp",
    linkedin: "https://www.linkedin.com/in/jubayer-ahmed-86224521a",
    github: "https://github.com/jubayer718",
    portfolio: "https://next-dev-portfolio-two.vercel.app"
  },
  {
    id: 5,
    name: "Md. Abdullah Al Mehedi",
    email: "abdullahalmehedi86@gmail.com",
    role: "Backend Developer",
    country: "Bangladesh",
    img: "/team/mehedi.webp",
    linkedin: "https://www.linkedin.com/in/mahdi866",
    github: "https://github.com/Mehedi86",
    portfolio: "https://fantastic-sundae-81ca48.netlify.app"
  }
];

const Contributor = () => {
  return (
    <UserProtectedRoute>
       <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Contributor</h2>
      <p className="max-w-3xl mx-auto text-center text-gray-600 dark:text-gray-300 mb-10">
        This website is the result of our team's collaborative effort to build a modern Pet Service platform. 
        Each member contributed their unique skills — from frontend design to backend development — 
        to create a platform that blends technology, care, and teamwork seamlessly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {users.map(user => (
          <div 
            key={user.id} 
            className="flex flex-col items-center p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800 dark:text-gray-200 transform transition-transform duration-300 hover:scale-105"
          >
            <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
              <img 
                src={user.img} 
                alt={user.name} 
                className="w-full h-full object-cover rounded-full transform transition-transform duration-500 hover:scale-110 hover:rotate-3"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold sm:text-2xl">{user.name}</h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">{user.role}</p>
              <p className="text-xs sm:text-sm text-gray-400">{user.country}</p>
            </div>
            <div className="flex justify-center mt-4 space-x-4 text-xl text-gray-700 dark:text-gray-300">
              {user.github && (
                <a href={user.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-violet-600">
                  <AiFillGithub />
                </a>
              )}
              {user.linkedin && (
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-violet-600">
                  <AiFillLinkedin />
                </a>
              )}
              {user.portfolio && (
                <a href={user.portfolio} target="_blank" rel="noopener noreferrer" aria-label="Portfolio" className="hover:text-violet-600">
                  <AiOutlineDribbble />
                </a>
              )}
              <a href={`mailto:${user.email}`} aria-label="Email" className="hover:text-violet-600">
                <AiOutlineMail />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
   </UserProtectedRoute>
  );
};

export default Contributor;
