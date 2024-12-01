"use client";
import React from 'react';
import { ArrowRight, Rocket, Globe, Code } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FeaturePoint = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <p className="text-gray-700 text-sm">{text}</p>
  </div>
);

const Banner = () => {


  const router =useRouter();
  return (
    <section className="relative w-full min-h-[80vh] bg-gradient-to-b from-gray-50 to-white py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-8">
            <span className="text-sm font-medium text-blue-600">
              New Feature Release
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center leading-tight mb-6">
            Showcase Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Innovations
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 text-center max-w-2xl mb-12 leading-relaxed">
            Bring your ideas to life on HackerMars. Our platform empowers you to 
            deploy your projects and share them with a global community of innovators.
          </p>

          {/* Feature Points */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl w-full mb-12">
            <FeaturePoint 
              icon={Globe} 
              text="Share with global community of developers" 
            />
            <FeaturePoint 
              icon={Rocket} 
              text="Launch your projects with ease" 
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={()=>router.push('/projects')} className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-sm">
              Deploy Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              Learn More
              <Code className="ml-2 w-5 h-5" />
            </button>
          </div>

          {/* Optional: Stats or Social Proof */}
          <div className="mt-16 flex items-center gap-8 text-center text-sm text-gray-500">
            <div>
              <div className="font-semibold text-gray-900 text-2xl">10k+</div>
              <div>Projects Deployed</div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div>
              <div className="font-semibold text-gray-900 text-2xl">50k+</div>
              <div>Active Developers</div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div>
              <div className="font-semibold text-gray-900 text-2xl">99%</div>
              <div>Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;