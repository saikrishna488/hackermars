"use client";
import React from 'react';

const Opportunity = () => {
  return (
    <div className='w-full bg-gray-100 py-12 mt-28'>
      <div className='flex flex-col md:flex-row w-[80%] mx-auto items-center'>
        {/* Text Section */}
        <div className='md:w-1/2 md:pr-8 mb-8 md:mb-0'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>Host Your Own Opportunity</h2>
          <p className='text-lg text-gray-700 mb-6'>
            Engage with a diverse talent pool or hire the best minds from 17 Mn+ users.
          </p>
          <div className='flex gap-4'>
            <a
              href="#"
              className='px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300'
            >
              Host Now
            </a>
            <a
              href="#"
              className='px-6 py-3 text-blue-400 rounded hover:text-gray-600 transition duration-300'
            >
              Know More
            </a>
          </div>
        </div>
        
        {/* Image Section */}
        <div className='md:w-1/2'>
          <img
            src="/image.png" // Update with the path to your image
            alt="Opportunity"
            className='w-full h-auto object-cover rounded-xl'
          />
        </div>
      </div>
    </div>
  );
};

export default Opportunity;
