"use client";
import React, { useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Calendar, Users, ArrowRight } from 'lucide-react';

const demoHackathons = [
  { img: "https://devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fcontent%2F030b041535514a4db9321a346b6551d0%2F8c72122e-16c0-4a5b-9b5a-24ea065e2961.png&w=1440&q=75", title: "Hackathon 2024" },
  { img: "https://hack-synthesis.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fa485a56b617a4864844f9ae238cfe38d%2Fassets%2Fcover%2F677.png&w=1440&q=100", title: "Innovators' Challenge" },
  { img: "https://tictechtoe24.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fba6317ea5a2d40ffb5605600562b4857%2Fassets%2Fcover%2F200.png&w=1440&q=100", title: "Code Fest" },
  { img: "https://thacks-7.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F99b20414637c4111923d3b4e4c26b0ec%2Fassets%2Fcover%2F545.jpeg&w=1440&q=100", title: "Tech Titans" },
  { img: "https://pitch-a-thon.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F039ee018058642088f2b7002f67f85cd%2Fassets%2Fcover%2F980.png&w=1440&q=100", title: "Startup Sprint" },
  { img: "https://techtrek.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fda1b3a9a329d4e3c952d6127f6cd5081%2Fassets%2Fcover%2F438.png&w=1440&q=100", title: "AI Challenge" },
  { img: "https://frosthacks-s01.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fcbfa188e2b274347bd8004200c4b43d9%2Fassets%2Fcover%2F588.jpeg&w=1440&q=100", title: "Blockchain Bonanza" }
];


//hackathon card
const HackathonCard = ({ hackathon }) => (
  <div className="flex-shrink-0 snap-start w-full lg:w-[600px] group cursor-pointer">
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={hackathon.img}
          alt={hackathon.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${hackathon.mode === 'online' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-purple-100 text-purple-700'}
          `}>
            {hackathon.mode}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {hackathon.title}
        </h3>
        
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{hackathon.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-500" />
            <span>{hackathon.participants} Participants</span>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-6 flex justify-end">
          <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
            View Details
            <ArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const FeaturedHackathons = () => {
  const scrollContainerRef = useRef(null);

  useEffect(()=>{

    const scrollContainer = scrollContainerRef.current
    if(scrollContainer){
      const maxScrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth
      const clientWidth = scrollContainer.clientWidth

      const autoScroll = setInterval(()=>{
        const scrollLeft = scrollContainer.scrollLeft
        console.log(scrollLeft, maxScrollWidth)

        if(scrollLeft >= maxScrollWidth-1){
          scrollContainer.scrollTo({left:0,scrollBehavior: 'smooth'})
          
        }
        else{
          scrollContainer.scrollBy({left:clientWidth,scrollBehavior: 'smooth'})
        }
      },2000)

      return ()=> clearInterval(autoScroll)
    }
  })

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.clientWidth // Width of a single card
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const NavigationButton = ({ direction, onClick }) => (
    <button
      onClick={onClick}
      className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200"
      aria-label={`Scroll ${direction}`}
    >
      {direction === 'left' ? (
        <IoIosArrowBack className="w-5 h-5 text-gray-600" />
      ) : (
        <IoIosArrowForward className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Hackathons
            </h2>
            <p className="mt-1 text-gray-500">
              Discover upcoming hackathons and competitions
            </p>
          </div>
          
          <div className="flex gap-2">
            <NavigationButton direction="left" onClick={() => scroll('left')} />
            <NavigationButton direction="right" onClick={() => scroll('right')} />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {demoHackathons.map((hackathon, index) => (
              <HackathonCard key={index} hackathon={hackathon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHackathons;
