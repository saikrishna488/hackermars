"use client";
import React, { useState } from 'react';
import { Calendar, Users, Globe, DollarSign, MapPin, Clock, User } from 'lucide-react'; // Importing Lucide icons

// Demo hackathons data
const hackathonsData = [
  {
    id: 1,
    title: 'Hackathon A',
    date: '2024-11-15',
    remainingDays: 35,
    registeredPeople: 120,
    fee: 'Free',
    mode: 'Online',
    location: 'Virtual',
    organizer: 'TechCorp',
    poster: 'https://devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fcontent%2Fa1f504bee74b4f19be305d409aa4fc16%2F3500ee89-e9d3-4c5d-ba1e-f51ffc47d8b8.png&w=1440&q=75',
  },
  {
    id: 2,
    title: 'Hackathon B',
    date: '2024-12-01',
    remainingDays: 50,
    registeredPeople: 200,
    fee: 'Paid',
    mode: 'Offline',
    location: 'New York',
    organizer: 'CodeNation',
    poster: 'https://invisible-garden.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F38666a2b2963453689b173f11ed6ff8b%2Fassets%2Fcover%2F785.png&w=1440&q=100',
  },
  {
    id: 3,
    title: 'Hackathon C',
    date: '2024-10-25',
    remainingDays: 10,
    registeredPeople: 80,
    fee: 'Free',
    mode: 'Hybrid',
    location: 'San Francisco',
    organizer: 'DevHub',
    poster: 'https://via.placeholder.com/150',
  },
];

const HackathonCard = ({ hackathon }) => (
  <div className="bg-white shadow-md rounded-xl overflow-hidden p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
    <img
      src={hackathon.poster}
      alt={hackathon.title}
      className="w-full h-32 sm:h-40 object-cover mb-4 rounded-lg"
    />
    <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">{hackathon.title}</h3>
    
    {/* Flex container for individual fields */}
    <div className="grid grid-cols-2 gap-2 md:gap-3">
      <div className="bg-gray-100 p-2 rounded-lg flex items-center">
        <Calendar className="w-4 h-4 mr-1 text-gray-500" />
        <p className="text-xs md:text-sm text-gray-700">Date: {hackathon.date}</p>
      </div>

      <div className="bg-gray-100 p-2 rounded-lg flex items-center">
        <Users className="w-4 h-4 mr-1 text-gray-500" />
        <p className="text-xs md:text-sm text-gray-700">Registered: {hackathon.registeredPeople}</p>
      </div>

      <div className="bg-gray-100 p-2 rounded-lg flex items-center">
        <Globe className="w-4 h-4 mr-1 text-gray-500" />
        <p className="text-xs md:text-sm text-gray-700">Mode: {hackathon.mode}</p>
      </div>

      <div className="bg-gray-100 p-2 rounded-lg flex items-center">
        <MapPin className="w-4 h-4 mr-1 text-gray-500" />
        <p className="text-xs md:text-sm text-gray-700">Location: {hackathon.location}</p>
      </div>

      <div className="bg-gray-100 p-2 rounded-lg flex items-center">
        <Clock className="w-4 h-4 mr-1 text-gray-500" />
        <p className="text-xs md:text-sm text-gray-700">Remaining Days: {hackathon.remainingDays}</p>
      </div>

      {/* New Field: Organizer */}
      <div className="bg-gray-100 p-2 rounded-lg flex items-center">
        <User className="w-4 h-4 mr-1 text-gray-500" />
        <p className="text-xs md:text-sm text-gray-700">Organizer: {hackathon.organizer}</p>
      </div>
    </div>
  </div>
);

const Hackathons = () => {
  const [filterMode, setFilterMode] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  const filteredHackathons = hackathonsData.filter((hackathon) => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase());
    const isUpcoming = new Date(hackathon.date) >= new Date();
    const isPast = new Date(hackathon.date) < new Date();

    return (
      matchesSearch &&
      (filterMode === '' || hackathon.mode === filterMode) &&
      (filterDate === 'upcoming' ? isUpcoming : filterDate === 'past' ? isPast : true)
    );
  });

  return (
    <div className="p-4 lg:mt-0 mt-16 pt-24">
      {/* Top Bar with Filters and Search */}
      <div className="flex flex-wrap justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Upcoming Hackathons</h2>

        <div className="flex flex-wrap space-x-4 gap-2">
          {/* Search Input */}
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:border-blue-500 transition"
            placeholder="Search hackathons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Mode Filter */}
          <select
            className="border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:border-blue-500 transition"
            onChange={(e) => setFilterMode(e.target.value)}
            value={filterMode}
          >
            <option value="">All Modes</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          {/* Date Filter */}
          <select
            className="border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:border-blue-500 transition"
            onChange={(e) => setFilterDate(e.target.value)}
            value={filterDate}
          >
            <option value="">All Dates</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      {/* Hackathon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredHackathons.length > 0 ? (
          filteredHackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))
        ) : (
          <p className="text-gray-500">No hackathons found</p>
        )}
      </div>
    </div>
  );
};

export default Hackathons;
