"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const HeroBanner = () => {
  const router = useRouter()
  return (
    <div className='relative w-full h-screen bg-white'>
      <div 
        className='absolute inset-0 bg-cover bg-center' 
        style={{ backgroundImage: 'url("hero_bg.png")' }}
      >
        <div className='flex flex-col md:flex-row items-center justify-center lg:w-[80%] w-full  mx-auto h-full px-4 md:px-8'>
          <div className='w-full md:w-1/2 p-8 flex flex-col text-center lg:text-left justify-center  bg-opacity-70'>
            <h1 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              Learn
              <br />
              Explore
              <br />
              Upskill
            </h1>
            <p className='text-base md:text-lg text-white mb-6 break-normal text-justify'>
              HackerMars is the largest and fastest-growing community of technology innovators, including startups, working professionals, freelancers, and student innovators.
            </p>

            <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
              <button className='px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-3xl'>
                Explore Hackathons
              </button>
              <button className='px-6 py-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 hover:border-gray-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-500'>
                Organize Hackathon
              </button>
            </div>
          </div>
          <div className='hidden md:block md:w-1/2'>
            {/* This div is for future content or adjustments */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
