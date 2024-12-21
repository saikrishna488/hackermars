"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Calendar, Users, Search, Filter, Clock, Globe2, ChevronDown, Sparkles } from 'lucide-react';
import { globalContext } from '@/context_api/globalContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const getStatusInfo = (startDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const diffTime = start - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return {
      text: 'Completed',
      className: 'bg-gray-500/90 text-white',
      icon: <Clock className="w-3.5 h-3.5 mr-1.5" />
    };
  } else if (diffDays === 0) {
    return {
      text: 'Today',
      className: 'bg-emerald-500/90 text-white',
      icon: <Sparkles className="w-3.5 h-3.5 mr-1.5" />
    };
  } else {
    return {
      text: `In ${diffDays} days`,
      className: 'bg-blue-500/90 text-white',
      icon: <Calendar className="w-3.5 h-3.5 mr-1.5" />
    };
  }
};

const HackathonCard = ({ hackathon, handleHackathon, index }) => {
  const status = getStatusInfo(hackathon.start_date);
  const themes = hackathon.themes || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => handleHackathon(hackathon._id)}
      className="group bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 
        hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col 
        overflow-hidden relative"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={process.env.NEXT_PUBLIC_BACKEND_URL + "/" + hackathon.image}
          alt={hackathon.title}
          className="w-full h-48 md:h-64 lg:h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {/* Mode Badge */}
          <span
            className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
              backdrop-blur-md shadow-sm border 
              ${hackathon.mode === 'online' 
                ? 'bg-blue-500 text-white border-blue-400' 
                : 'bg-purple-500 text-white border-purple-400'}`}
          >
            <Globe2 className="w-3 h-3 mr-1" />
            {hackathon.mode}
          </span>

          {/* Status Badge */}
          <div
            className={`flex items-center px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm 
              text-xs font-medium ${status.className}`}
          >
            {status.icon}
            <span>{status.text}</span>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1 shadow-sm">
            <Users className="h-4 w-4 text-emerald-400 mr-1" />
            <span className="text-xs text-white font-medium">
              {hackathon.registered_users?.length}/{hackathon.max_users}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-base mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
          {hackathon.title}
        </h3>

        {/* Arrow Indicator */}
        <div className="absolute top-4 right-4">
          <ChevronDown className="h-5 w-5 text-gray-400 transform rotate-[-135deg] group-hover:text-blue-500 transition-colors" />
        </div>

        {/* Themes Section */}
        {themes.length > 0 && (
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {themes.slice(0, 3).map((theme, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium 
                    border border-gray-200 group-hover:border-gray-300 transition-colors"
                >
                  {theme}
                </span>
              ))}
              {themes.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-medium 
                  border border-gray-200 group-hover:border-gray-300 transition-colors"
                >
                  +{themes.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};


const Hackathons = ({ hackathonss }) => {
  const [filterMode, setFilterMode] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { setHackathons, hackathons } = useContext(globalContext);
  const router = useRouter();

  useEffect(() => {
    setHackathons(hackathonss);
  }, [hackathonss]);

  const filteredHackathons = hackathons?.filter((hackathon) => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase());
    const isUpcoming = new Date(hackathon.start_date) >= new Date();
    const isPast = new Date(hackathon.start_date) < new Date();

    return (
      matchesSearch &&
      (filterMode === '' || hackathon.mode === filterMode) &&
      (filterDate === 'upcoming' ? isUpcoming : filterDate === 'past' ? isPast : true)
    );
  }) || [];

  const handleHackathon = (id) => {
    router.push('/hackathon/' + id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -top-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 blur-2xl opacity-20 -z-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Discover Amazing{' '}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Hackathons
              </span>
            </h1>
            <p className="text-gray-600 text-base max-w-xl mx-auto leading-relaxed">
              Join innovative competitions, showcase your skills, and collaborate with talented developers.
            </p>
          </motion.div>
        </div>
  
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-lg rounded-lg shadow-md border border-gray-100 p-4 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search hackathons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400
                  text-gray-800 placeholder-gray-500 text-sm transition-all"
              />
            </div>
  
            {/* Filter Buttons */}
            <div className="flex gap-3">
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400
                  text-gray-800 text-sm cursor-pointer"
              >
                <option value="">All Modes</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
  
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400
                  text-gray-800 text-sm cursor-pointer"
              >
                <option value="">All Time</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>
        </motion.div>
  
        {/* Results Section */}
        <AnimatePresence mode="wait">
          {filteredHackathons.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16 bg-white/90 backdrop-blur-lg rounded-lg border border-gray-100 shadow-md"
            >
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">No Hackathons Found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria.</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredHackathons.map((hackathon, index) => (
                <HackathonCard
                  key={hackathon._id}
                  hackathon={hackathon}
                  handleHackathon={handleHackathon}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
  
};

export default Hackathons;