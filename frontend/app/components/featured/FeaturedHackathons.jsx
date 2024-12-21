"use client";
import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Calendar, Palette, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

//hackathon card
const HackathonCard = ({ hackathon,handleClick }) => (
  <div className="flex-shrink-0 snap-start w-full sm:w-[400px] lg:w-[450px] group cursor-pointer">
    <div className="bg-white h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 flex flex-col">
      {/* Image Container */}
      <div className="relative w-full h-[225px] overflow-hidden">
        <img
          src={process.env.NEXT_PUBLIC_BACKEND_URL + "/" +hackathon.image}
          alt={hackathon.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`
            px-3 py-1.5 rounded-full text-xs font-medium
            ${hackathon.mode === 'online' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-purple-100 text-purple-700'}
          `}>
            {hackathon.mode}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[56px]">
          {hackathon.title}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
          <div className="flex items-center gap-2 min-w-[140px]">
            <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="truncate">{new Date(hackathon.start_date).toDateString()}</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Palette className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="truncate">{hackathon.themes.slice(0,2).join(', ')+ (hackathon.themes.length > 2 ? " +more" : "")}</span>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button 
            onClick={()=>handleClick(hackathon._id)} 
            className="w-full inline-flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-700 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
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
  const [featured, setFeatured] = useState([]);
  const router = useRouter();

  // Scroll handler
  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400; // Width of a card
    const newScrollPosition = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/featured');
        if (res.data.res) {
          setFeatured(res.data.hackathons);
        }
      } catch (error) {
        console.error('Error fetching hackathons:', error);
        toast.error('Error fetching hackathons');
      }
    };

    fetchHackathons();
  }, []);

  const handleHackathonClick = (id) => {
    router.push(`/hackathon/${id}`);
  };

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
            <button
              onClick={() => handleScroll('left')}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-600 hover:text-gray-900"
            >
              <IoIosArrowBack size={24} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-600 hover:text-gray-900"
            >
              <IoIosArrowForward size={24} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {featured.map((hackathon) => (
              <HackathonCard 
                key={hackathon._id} 
                hackathon={hackathon}
                handleClick={handleHackathonClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHackathons;
