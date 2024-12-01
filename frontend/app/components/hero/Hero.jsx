"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Rocket, Award, Code } from 'lucide-react';

const HeroBanner = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-[85vh] bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Where Innovation
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Meets Opportunity
            </span>
          </h1>
          
          {/* Description */}
          <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
            Join a thriving community of tech pioneers, creators, and visionaries. 
            Participate in hackathons that challenge your skills and expand your horizons.
          </p>

          {/* Feature Points */}
          <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-2xl">
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-gray-600 text-left">Launch your ideas with like-minded innovators</p>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-gray-600 text-left">Compete in exciting challenges with great rewards</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => router.push('/hackathons')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              Explore Hackathons
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <button
              onClick={() => router.push('/host')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200"
            >
              Host a Hackathon
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;