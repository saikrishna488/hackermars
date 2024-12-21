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
  <div className="bg-white p-3 rounded-lg border border-gray-100 hover:border-blue-100 transition-all duration-200">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <h4 className="text-sm font-semibold text-gray-900 mt-0.5">{value}</h4>
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
      className="group bg-white rounded-lg border border-gray-100  hover:border-blue-100 
                transition-all duration-200 overflow-hidden cursor-pointer"
    >
      <div className="aspect-[21/9] relative">
        <img
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${event.image}`}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        
        <div className="absolute inset-x-3 bottom-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white font-medium text-sm leading-tight line-clamp-2">
              {event.title}
            </h3>
            <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium ${
              isActive 
                ? 'bg-green-500/90 text-white' 
                : 'bg-white/90 text-gray-700'
            }`}>
              {isActive ? 'Active' : 'Completed'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="space-y-3">
          {/* Progress Section */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-500">Registration Progress</span>
              <span className="font-medium text-gray-900">
                {event.registered_users.length}/{event.max_users}
              </span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  progress >= 90 ? 'bg-orange-500' : 'bg-blue-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{event.registered_users.length} Teams</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{new Date(event.start_date).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
              })}</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 
                           bg-gray-50 text-gray-600 rounded-md text-xs font-medium
                           group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            Manage Event
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user ,setHackathon} = useContext(globalContext);
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathon/showspecific`,
          { client_id: user._id },
          {
            headers: { "Content-Type": "application/json" }
          }
        );

        console.log(response.data);
        if (response.data.res) {
          setEvents(response.data.hackathons);
        } else {
          toast.error(response.data.msg);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchEvents();
    }
  }, [user]);

  const stats = [
    {
      icon: Trophy,
      label: "Total Events",
      value: events.length
    },
    {
      icon: Users,
      label: "Total Participants",
      value: events.reduce((acc, event) => acc + event.registered_users.length, 0)
    },
    {
      icon: Target,
      label: "Active Events",
      value: events.filter(event => new Date(event.end_date) > new Date()).length
    }
  ];

  const handleEvent = (event)=>{
    setHackathon(event)
    router.push(`/host/dashboard/hackathon`);
  }

  const handleHostHackathon = ()=>{
    setHackathon(null)
    router.push("/host/hosthackathon");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/10 py-4 pt-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Host Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your hackathon events</p>
          </div>
          <button
            onClick={() => handleHostHackathon()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm
                     font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Create Event
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-lg border border-gray-100 bg-white">
            <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">No Events Found</h3>
            <p className="text-xs text-gray-500">Create your first hackathon event to get started</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={()=>handleEvent(event)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;