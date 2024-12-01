"use client"
import React, { useContext, useEffect, useState } from 'react';
import { Calendar, Users, Clock, ExternalLink } from 'lucide-react';
import { globalContext } from '@/context_api/globalContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';



//essential functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getStatusColor = (status) => {
  switch(status) {
    case 'ongoing':
      return 'bg-green-50 text-green-700';
    case 'upcoming':
      return 'bg-blue-50 text-blue-700';
    case 'completed':
      return 'bg-gray-50 text-gray-700';
    default:
      return 'bg-gray-50 text-gray-700';
  }
};




//component
const RegisteredHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const {user} = useContext(globalContext);
  const router = useRouter();

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'/hackathon/getevents', {
          ids: user?.registered_events
        },{
          headers :{
            "Content-Type" : "application/json"
          }
        });
        
        console.log(res.data)
        if(res.data.res){
          setHackathons(res.data.events);
        }
        else{
          console.log(res.data.msg);
          toast.error(res.data.msg);
        }
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      }
    };

    if (user?.registered_events?.length) {
      fetchHackathons();
    }
  }, [user]);

  if(!user?.name) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pt-20">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-900">Registered Hackathons</h2>
        <p className="mt-1 text-sm text-gray-500">Your active hackathon registrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hackathons?.length > 0 && hackathons.map((hackathon) => (
          <div 
            key={hackathon._id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:border-gray-200 transition-all duration-200"
          >
            {/* Image */}
            <div className="relative h-32 overflow-hidden">
              <img
                src={process.env.NEXT_PUBLIC_BACKEND_URL + "/" + hackathon.image}
                alt={hackathon.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(hackathon.mode)}`}>
                  {hackathon.mode}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mb-2">
                {hackathon.title}
              </h3>

              <div className="space-y-1.5">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                  <span>{formatDate(hackathon.start_date)} - {formatDate(hackathon.end_date)}</span>
                </div>

                <div className="flex items-center text-xs text-gray-500">
                  <Users className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                  <span>{hackathon.registered_users.length|| 0} / {hackathon.max_users} teams</span>
                </div>

                {/* Progress Bar */}
                <div className="mt-2">
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(((hackathon.registered_users.length || 0) / hackathon.max_users) * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => router.push(`/hackathon/${hackathon._id}`)}
                className="mt-3 w-full flex items-center justify-center gap-1.5 bg-white text-blue-600 border border-blue-100 hover:border-blue-200 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200"
              >
                View Details
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {(!hackathons || hackathons.length === 0) && (
        <div className="text-center py-8 bg-white rounded-lg border border-gray-100">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">No Hackathons Found</h3>
          <p className="text-xs text-gray-500">You haven't registered for any hackathons yet.</p>
        </div>
      )}
    </div>
  );
};

export default RegisteredHackathons;