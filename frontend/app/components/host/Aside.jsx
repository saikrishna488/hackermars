"use client";
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { globalContext } from '@/context_api/globalContext';
import { Image, File, User, Tag, Phone, Mail, Calendar } from 'lucide-react';

const iconMap = {
  title: <File color="#4A90E2" />,
  image: <Image color="#E94E77" />,
  team_size: <User color="#F5A623" />,
  about: <Tag color="#50E3C2" />,
  themes: <Tag color="#F8E71C" />,
  judges: <User color="#7B92D8" />,
  organizers: <User color="#D0021B" />,
  description: <File color="#B8E986" />,
  partners: <User color="#9013FE" />,
  prizes: <Tag color="#F39C12" />,
  date: <Calendar color="#C0392B" />,
  mode: <Tag color="#8E44AD" />,
  phone: <Phone color="#3498DB" />,
  email: <Mail color="#2ECC71" />,
  fee: <Tag color="#E67E22" />,
  eligibility: <Tag color="#D35400" />,
  start_time: <Calendar color="#9B59B6" />,
  end_time: <Calendar color="#34495E" />,
  conducted_by: <User color="#2980B9" />,
  visibility: <Tag color="#16A085" />,
};

const Aside = () => {
  const { client } = useContext(globalContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Sidebar state
  const router = useRouter(); // Initialize useRouter

  // Scroll to the selected field and close the menu
  const scrollToField = (field) => {
    document.getElementById(field)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false); // Close sidebar after selection
  };

  return (
    <>
      {/* Menu button for mobile */}
      <div className="lg:hidden flex justify-between items-center p-4 w-full bg-white shadow-md">
        <h4 className='font-bold text-xl'>Client Panel</h4>
        <button
          className="lg:hidden z-50 w-12 h-12 bg-black border-2 shadow-sm text-white rounded-full focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {client.profile_url ? (
            <img
              src={process.env.NEXT_PUBLIC_BACKEND_URL + "/" + client.profile_url}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`lg:relative fixed inset-y-0 left-0 bg-gray-100 shadow-lg transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 w-3/4 lg:w-1/4 p-4 overflow-y-auto z-40`}
      >
        <h2 className="font-semibold text-lg mb-4">Client Info</h2>
        <div className="flex items-center mb-4">
          {client.profile_url ? (
            <img
              src={process.env.NEXT_PUBLIC_BACKEND_URL + "/" + client.profile_url}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-2 object-cover"
            />
          ) : (
            <User className="w-12 h-12 rounded-full mr-2" />
          )}
          <div>
            <h3 className="font-medium">{client.name}</h3>
            <p className="text-gray-500 text-sm">{client.email}</p>
            <p className="text-gray-600 text-sm">Credits: {client.credits}</p>
          </div>
        </div>

        {/* Back to Host Button */}
        <button
          className="flex items-center bg-blue-600 text-white rounded-lg p-3 mb-4 hover:bg-blue-700 transition"
          onClick={() => router.push('/host')} // Navigate to /host
        >
          <span className="font-medium">Back to Host</span>
        </button>

        <h2 className="font-semibold text-lg mb-4">Fields</h2>
        <div className="space-y-4">
          {Object.keys(iconMap).map((field) => (
            <div
              key={field}
              className="flex items-center bg-white shadow-lg rounded-lg p-3 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => scrollToField(field)}
            >
              {iconMap[field]}
              <span className="ml-2 font-medium">{field.replace(/_/g, ' ').toUpperCase()}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Overlay when the sidebar is open on small screens */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Aside;
