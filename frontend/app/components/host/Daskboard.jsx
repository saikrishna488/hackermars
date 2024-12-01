"use client";
import React, { useContext, useEffect, useState } from 'react';
import { 
  PlusCircle, Users, Trophy, 
  Clock, Target, ArrowUpRight, AlertCircle 
} from 'lucide-react';
import { globalContext } from '@/context_api/globalContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100">
    <div className="flex items-center gap-4 sm:flex-col sm:items-start">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{value}</h4>
      </div>
    </div>
  </div>
);

const EventCard = ({ event, onClick }) => {
  const isActive = new Date(event.end_date) > new Date();
  const progress = (event.registered_users.length / event.max_users) * 100;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
    >
      <div className="aspect-[16/9] relative">
        <img
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${event.image}`}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        <div className="absolute inset-x-4 bottom-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2 [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.5)]">
              {event.title}
            </h3>
            <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
              isActive 
                ? 'bg-green-500 text-white' 
                : 'bg-white/90 text-gray-700'
            }`}>
              {isActive ? 'Active' : 'Completed'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {/* Progress Section */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Registration Progress</span>
              <span className="font-medium text-gray-900">
                {event.registered_users.length}/{event.max_users}
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  progress >= 90 ? 'bg-orange-500' : 'bg-blue-600'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{event.registered_users.length} Teams</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{new Date(event.start_date).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
              })}</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <span className="text-sm font-medium">Manage Event</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [hackathons, setHackathons] = useState([]);
  const { user, setHackathon } = useContext(globalContext);
  const router = useRouter();

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathon/showspecific`,
          { client_id: user._id },
          { headers: { "Content-Type": "application/json" }}
        );

        if (res.data.res) {
          setHackathons(res.data.hackathons);
        } else {
          toast.error(res.data.msg);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch hackathons");
      }
    };

    if (user?._id) {
      fetchHackathons();
    }
  }, [user]);

  if (!user?.name) return null;

  const stats = [
    { icon: Trophy, label: 'Total Events', value: hackathons?.length || 0 },
    { icon: Clock, label: 'Active Events', value: hackathons?.filter(h => new Date(h.end_date) > new Date()).length || 0 },
    { icon: Users, label: 'Total Teams', value: hackathons?.reduce((acc, curr) => acc + curr.registered_users.length, 0) || 0 },
    { icon: Target, label: 'Completed Events', value: hackathons?.filter(h => new Date(h.end_date) < new Date()).length || 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Event Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and monitor your hackathons</p>
          </div>
          
          <button
            onClick={() => {
              setHackathon(null);
              router.push('/host/hosthackathon');
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="font-medium">Host New Event</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Events Grid */}
        {hackathons?.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={() => {
                  setHackathon(event);
                  router.push('/host/dashboard/hackathon');
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-white rounded-xl border border-gray-100">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
            <p className="text-sm text-gray-500 mb-6">Get started by hosting your first hackathon</p>
            <button
              onClick={() => {
                setHackathon(null);
                router.push('/host/hosthackathon');
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span className="font-medium">Create Event</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;