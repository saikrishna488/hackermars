"use client";
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Banner = () => {
  return (
    <div 
      className='relative w-full bg-white text-black mt-24 flex items-center justify-center' 
    >
      {/* Inner container with 80% width */}
      <div className='relative z-10 flex flex-col md:flex-row items-center justify-between w-[90%] md:w-[80%]'>
        {/* Left side text content */}
        <div className='flex flex-col justify-center text-center md:text-left w-full md:w-1/2'>
          <h1 className='text-3xl md:text-5xl font-bold mb-4 leading-tight text-gray-900'>
            Upskill with HackerMars
          </h1>
          <p className='text-md md:text-lg mb-6 max-w-full md:max-w-md text-gray-700'>
            Unlock new opportunities and enhance your tech skills with us. Start your journey and excel in the tech world.
          </p>
          <button className='px-6 py-3 md:px-8 md:py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 w-fit flex items-center mx-auto md:mx-0'>
            Start Your Journey Now
            <FaArrowRight className='ml-2' />
          </button>
        </div>

        {/* Right side image */}
        <div className='flex justify-center w-full md:w-1/2 mt-8 md:mt-0'>
          <img 
            src="https://d8it4huxumps7.cloudfront.net/uploads/images/65799cfe6d841_frame_1000012421.png?d=600x600" 
            alt="HackerMars" 
            className='w-3/4 h-auto object-contain drop-shadow-lg'
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
