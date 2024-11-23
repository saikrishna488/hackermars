"use client";
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Banner = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-purple-50 to-blue-50 text-black mt-24 flex items-center justify-center">
      {/* Inner container with 80% width */}
      <div className="relative z-10 flex flex-col items-center justify-center w-[90%] md:w-[80%]">
        {/* Text content */}
        <div className="flex flex-col justify-center text-center w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 animate-fade-in">
            Showcase Your Innovations
          </h1>
          <p className="text-md md:text-lg mb-8 max-w-2xl text-gray-700 leading-relaxed mx-auto">
            Bring your ideas to life on HackerMars. Our platform empowers you to deploy your projects and share them with a global community of innovators. Start building today and watch your ideas soar.
          </p>
          <button className="px-8 py-3 bg-blue-100 text-blue-600 rounded-full font-semibold shadow-lg hover:bg-blue-200 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center mx-auto">
            Deploy Your Project
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
