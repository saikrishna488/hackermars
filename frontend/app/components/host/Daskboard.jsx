"use client";

import React, { useContext, useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { globalContext } from '@/context_api/globalContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [hackathons, setHackathons] = useState([]);
  const { user, hackathon, setHackathon } = useContext(globalContext);
  const router = useRouter();

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathon/showspecific`, {
          client_id: user._id
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (res.data.res) {
          setHackathons(res.data.hackathons);
        } else {
          toast.error(res.data.msg);
        }
      } catch (err) {
        console.log(err);
        toast.error("Error Occurred");
      }
    };

    fetchHackathons();
  }, [user]);

  // New hackathon button
  const handleHost = () => {
    setHackathon(null)
    router.push('/host/hosthackathon');
  };

  const handleClick = (hackathon) => {
    setHackathon(hackathon);
    router.push('/host/dashboard/hackathon');
  };

  if (!user?.name) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Organized Events</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your hackathons and competitions</p>
        </div>
        
        <button
          onClick={handleHost}
          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors duration-200"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" />
          Host New Hackathon
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Events', value: hackathons?.length || 0 },
          { label: 'Active Events', value: hackathons?.filter(h => new Date(h.end_date) > new Date()).length || 0 },
          { label: 'Total Teams', value: hackathons?.reduce((acc, curr) => acc + curr.registered_users.length, 0) || 0 },
          { label: 'Completed Events', value: hackathons?.filter(h => new Date(h.end_date) < new Date()).length || 0 },
        ].map((stat, index) => (
          <div key={index} className="bg-white px-4 py-3 rounded-lg border border-gray-100 shadow-sm">
            <p className="text-xs font-medium text-gray-500">{stat.label}</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Events Grid */}
      {hackathons?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {hackathons.map((event) => (
            <div
              key={event._id}
              onClick={() => handleClick(event)}
              className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
            >
              {/* Event Image */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${event.image}`}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    new Date(event.end_date) > new Date()
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {new Date(event.end_date) > new Date() ? 'Active' : 'Completed'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 truncate mb-2">
                  {event.title}
                </h3>

                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                  <div className="flex items-center">
                    <User className="w-3.5 h-3.5 mr-1" />
                    {event.registered_users.length} Registered Teams
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {new Date(event.start_date).toLocaleDateString()}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mb-3">
                  <div className="bg-gray-50 px-2 py-1.5 rounded text-center">
                    <p className="text-[10px] text-gray-500">Team Size</p>
                    <p className="text-xs font-medium text-gray-700">{event.team_size || 'N/A'}</p>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded hover:bg-gray-100 transition-colors duration-200">
                  Manage Event →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
          <div className="text-gray-400 mb-2">
            <PlusCircle className="w-8 h-8 mx-auto" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">No events yet</h3>
          <p className="text-xs text-gray-500">Get started by hosting your first hackathon</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
