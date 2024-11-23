"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const HeroBanner = () => {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-opacity-70 flex items-center justify-center">
        <div className="w-full max-w-4xl flex flex-col items-center justify-center p-4 space-y-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-fade-in">
            Discover, <br /> Innovate, <br /> Elevate
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl leading-relaxed">
            HackerMars is a thriving hub of tech pioneers, bringing together creators, problem-solvers, and visionaries from various fields, including startups, freelancers, and students, to push the boundaries of innovation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Explore Hackathons Button */}
            <button
              className="px-8 py-3 bg-blue-100 text-blue-600 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
              onClick={() => router.push('/hackathons')}
            >
              Find Hackathons
            </button>

            {/* Organize Hackathon Button */}
            <button
              className="px-8 py-3 bg-purple-100 text-purple-600 border border-purple-200 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200"
              onClick={() => router.push('/host')}
            >
              Host a Hackathon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
