"use client";
import React from 'react';

const Opportunity = () => {
  return (
    <div className="w-full bg-gray-50 py-16 mt-28">
      <div className="flex flex-col w-[80%] mx-auto items-center text-center space-y-6">
        {/* Text Section */}
        <div className="w-full">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Host Your Own Event
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Unlock the potential of your ideas by organizing hackathons, workshops, or tech events. Attract talent, foster innovation, and create impactful experiences.
          </p>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 justify-center">
            <a
              href="#"
              className="px-8 py-3 bg-blue-100 text-blue-600 border border-blue-300 rounded-full hover:bg-blue-200 transition duration-300"
            >
              Start Hosting Now
            </a>
            <a
              href="#"
              className="px-8 py-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-full hover:bg-gray-200 transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunity;
