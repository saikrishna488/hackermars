"use client";
import React from 'react';

const demoNumbers = [
  { label: 'Active Users', number: '1.2M' },
  { label: 'Community', number: '500K+' },
  { label: 'Hackathons', number: '150+' },
  { label: 'Clients', number: '200+' },
  { label: 'Countries', number: '50+' },
];

const OurNumbers = () => {
  return (
    <div className='w-full py-12 mt-24'>
      <div className='w-[80%] mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Our Numbers</h2>
        <div className='flex flex-wrap justify-center gap-6'>
          {demoNumbers.map((item, index) => (
            <div key={index} className='p-6 text-center flex-1 min-w-[200px]'>
              <div className='text-4xl font-bold text-blue-500 mb-2'>{item.number}</div>
              <h3 className='text-xl font-semibold text-gray-800 mb-1'>{item.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurNumbers;
