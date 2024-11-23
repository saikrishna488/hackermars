"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Calendar, Users, Tag, MapPin, Laptop, Building, ChevronDown } from 'lucide-react';
import { globalContext } from '@/context_api/globalContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Format date function
const formatDate = (date) => {
  const d = new Date(date);
  return d.toDateString() + ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
};

// Updated HackathonCard Component
const HackathonCard = ({ hackathon, handleHackathon }) => (
  <div
    onClick={() => handleHackathon(hackathon._id)}
    className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group"
  >
    <div className="relative">
      <img
        src={process.env.NEXT_PUBLIC_BACKEND_URL + "/" + hackathon.image}
        alt={hackathon.title}
        className="w-full h-32 object-cover group-hover:opacity-95 transition-opacity"
      />
      <div className="absolute top-2 right-2">
        <span className={`text-xs px-2 py-1 rounded-full ${
          hackathon.mode === 'online' 
            ? 'bg-blue-100 text-blue-700' 
            : 'bg-purple-100 text-purple-700'
        }`}>
          {hackathon.mode}
        </span>
      </div>
    </div>

    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 h-10">
        {hackathon.title}
      </h3>

      <div className="space-y-2 mb-3">
        <div className="flex items-center text-xs text-gray-600">
          <Calendar className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
          <span className="truncate">{formatDate(hackathon.start_date)}</span>
        </div>
        
        <div className="flex items-center text-xs text-gray-600">
          <Users className="h-3.5 w-3.5 text-green-500 mr-1.5" />
          <span>{hackathon.registered_users?.length || 0} Teams</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-gray-50">
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white" />
          ))}
        </div>
        <button className="text-xs font-medium px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
          View Details
        </button>
      </div>
    </div>
  </div>
);

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

  if(!hackathons){
    return <div>Loading...</div>
  }



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Explore Hackathons</h2>
          <p className="text-sm text-gray-500 mt-1">Discover and join upcoming coding competitions</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <input
              type="text"
              className="w-48 pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              placeholder="Search hackathons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </div>

          <select
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            onChange={(e) => setFilterMode(e.target.value)}
            value={filterMode}
          >
            <option value="">All Modes</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          <select
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            onChange={(e) => setFilterDate(e.target.value)}
            value={filterDate}
          >
            <option value="">All Time</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      {/* Hackathon Grid */}
      {filteredHackathons.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">No hackathons found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
  );
};

export default Hackathons;
