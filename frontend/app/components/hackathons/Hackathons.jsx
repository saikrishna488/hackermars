"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Calendar, Users, Tag, MapPin, Laptop, Building, ChevronDown } from 'lucide-react';
import { globalContext } from '@/context_api/globalContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const getStatusInfo = (startDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const diffTime = start - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return {
      text: 'Completed',
      className: 'bg-gray-500/80 text-white'
    };
  } else if (diffDays === 0) {
    return {
      text: 'Today',
      className: 'bg-green-500/80 text-white'
    };
  } else {
    return {
      text: `In ${diffDays} days`,
      className: 'bg-blue-500/80 text-white'
    };
  }
};

const HackathonCard = ({ hackathon, handleHackathon }) => {
  const status = getStatusInfo(hackathon.start_date);
  const themes = hackathon.themes || []; // Assuming themes is an array

  return (
    <div
      onClick={() => handleHackathon(hackathon._id)}
      className="group bg-white rounded-xl border hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer h-[300px] flex flex-col overflow-hidden"
    >
      {/* Card Header */}
      <div className="relative h-[140px]">
        <img
          src={process.env.NEXT_PUBLIC_BACKEND_URL + "/" + hackathon.image}
          alt={hackathon.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Mode Badge */}
        <span className={`
          absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full
          backdrop-blur-sm border border-white/20
          ${hackathon.mode === 'online' 
            ? 'bg-blue-500/80 text-white' 
            : 'bg-purple-500/80 text-white'}
        `}>
          {hackathon.mode}
        </span>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
            <Users className="h-3 w-3 text-green-400 mr-1" />
            <span className="text-xs text-white">
              {hackathon.registered_users?.length}/{hackathon.max_users}
            </span>
          </div>
          <div className={`flex items-center backdrop-blur-sm rounded-full px-2 py-1 ${status.className}`}>
            <span className="text-xs">
              {status.text}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 text-sm leading-snug">
          {hackathon.title}
        </h3>

        {/* Themes Section */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {themes.slice(0, 2).map((theme, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-medium"
              >
                {theme}
              </span>
            ))}
            {themes.length > 2 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-md text-xs font-medium hover:bg-gray-100 transition-colors">
                +{themes.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-auto">
          <button className="w-full text-xs font-medium px-3 py-2 rounded-lg 
            bg-gradient-to-r from-blue-50 to-indigo-50 
            text-blue-600 hover:text-blue-700
            group-hover:from-blue-100 group-hover:to-indigo-100 
            transition-all duration-300 flex items-center justify-center gap-1"
          >
            View Details
            <ChevronDown className="h-3 w-3 transform group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Hackathons Component
const Hackathons = ({ hackathonss }) => {
  const [filterMode, setFilterMode] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { setHackathons, hackathons } = useContext(globalContext);
  const router = useRouter();


  useEffect(() => {
    setHackathons(hackathonss);
    console.log(hackathonss);
  }, [hackathonss]);



  const filteredHackathons = hackathons.filter((hackathon) => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase());
    const isUpcoming = new Date(hackathon.date) >= new Date();
    const isPast = new Date(hackathon.date) < new Date();

    return (
      matchesSearch &&
      (filterMode === '' || hackathon.mode === filterMode) &&
      (filterDate === 'upcoming' ? isUpcoming : filterDate === 'past' ? isPast : true)
    );
  });



  const handleHackathon = (id) => {
    router.push('/hackathon/' + id);
  };

  if (!hackathons) {
    return <div>Loading...</div>
  }



  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Simplified Header */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-900">Explore Hackathons</h2>
          <p className="mt-1 text-sm text-gray-500">Discover and participate in exciting competitions</p>
        </div>

        {/* Compact Filters */}
        <div className="bg-white p-3 rounded-lg shadow-sm mb-6">
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              className="flex-grow max-w-xs px-3 py-1.5 text-sm bg-gray-50 border rounded-md"
              placeholder="Search hackathons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              className="px-3 py-1.5 text-sm bg-gray-50 border rounded-md"
              onChange={(e) => setFilterMode(e.target.value)}
              value={filterMode}
            >
              <option value="">All Modes</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>

            <select
              className="px-3 py-1.5 text-sm bg-gray-50 border rounded-md"
              onChange={(e) => setFilterDate(e.target.value)}
              value={filterDate}
            >
              <option value="">All Time</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        {/* Hackathon Grid with smaller cards */}
        {filteredHackathons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Calendar className="mx-auto h-10 w-10 text-gray-400 mb-2" />
            <h3 className="text-sm font-medium text-gray-900">No Hackathons Found</h3>
            <p className="text-xs text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredHackathons.map((hackathon) => (
              <HackathonCard
                key={hackathon._id}
                hackathon={hackathon}
                handleHackathon={handleHackathon}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hackathons;
