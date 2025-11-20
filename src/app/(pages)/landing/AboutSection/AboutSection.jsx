import Image from 'next/image';
import React from 'react';
import { FaPlay } from "react-icons/fa";

const AboutSection = () => {
    return (
        <div className='px-5 lg:px-20 my-20'>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20'>
                
                {/* Left Content */}
                <div className='lg:w-1/2 space-y-5 text-center lg:text-left'>
                    <p className='font-truculenta text-[#e06a4d]'>About Furrescue</p>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold font-truculenta'>Your trusted partner in animal rescue and care.</h1>
                    <p className='font-rubik text-base sm:text-lg text-[#616161]'>All they need is a loving home and proper care, and all you need is their unconditional love in return.</p>
                    <p className='font-rubik text-sm sm:text-base text-[#707070]'>At our shelter, rescued animals receive the care, attention, and love they deserve. Every adoption brings joy, companionship, and a second chance at life for them.</p>
                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mt-3 justify-center lg:justify-start'>
                        <button className='btn bg-[#e76f51] text-white rounded-xl px-6 py-3 border-0 outline-0'>Discover More</button>
                        <div className='flex items-center gap-3'>
                            <div className='border bg-[#e76f51d3] hover:bg-[#e76f51] duration-300 text-white border-white p-3 rounded-full shadow-2xl'>
                                <FaPlay />
                            </div>
                            <p className='font-lato font-semibold'>Watch Video</p>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className='relative lg:w-1/2 w-full flex justify-center lg:justify-end'>
                    <div className='relative w-full max-w-md sm:max-w-lg lg:max-w-xl'>
                        <Image 
                            className='w-full h-auto rounded-2xl object-cover' 
                            src="/about/gallery4.jpg" 
                            width={500} 
                            height={300} 
                            alt='Dog' 
                        />
                        <div className='absolute top-3 right-3 sm:top-5 sm:right-5 bg-[#e76f51d5] w-32 h-24 sm:w-44 sm:h-32 text-white flex flex-col justify-center items-center rounded-bl-2xl rounded-tr-2xl'>
                            <h1 className='text-3xl sm:text-4xl font-bold'>20+</h1>
                            <p className='font-lato text-sm sm:text-base'>Years Experience</p>
                        </div>
                    </div>

                    <div className='absolute -bottom-10 left-1/2 transform -translate-x-1/2 lg:left-0 lg:-translate-x-0'>
                        <Image 
                            className='w-36 h-36 sm:w-44 sm:h-44 border-4 sm:border-8 border-white shadow-2xl rounded-full object-cover' 
                            src="/about/img2.jpg" 
                            width={500} 
                            height={500} 
                            alt='Dog' 
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutSection;
