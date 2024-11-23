"use client";
import React, { useContext, useState } from 'react';
import { User, Users, Briefcase, Calendar, Menu, UserPlus } from 'lucide-react'; // Added UserPlus icon
import { globalContext } from '@/context_api/globalContext';
import UserSection from './UserSection';
import Requests from './Requests';



const Content = ({ user, setUser, selectedSection }) => {
  const [requests, setRequests] = useState([])


  return (

    <div className="flex overflow-y-auto h-full w-full justify-center bg-gray-100 p-2 transition-all duration-300">
      {selectedSection == "users" && (
        <UserSection user={user} setUser={setUser} />
      )}

      {selectedSection == "requests" && (
        <Requests requests={requests} setRequests={setRequests} />
      )}
    </div>
  )
}

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState({})
  const [selectedSection, setSelectedSection] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start sidebar closed
  const { admin } = useContext(globalContext)
  const [hackathon, setHackathon] = useState({})

  const handleUserIconClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setSidebarOpen(false); // Close sidebar when a section is selected
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };



  const Navbar = () => (
    <nav className="bg-gray-800 text-white h-16 fixed w-full z-30 flex items-center justify-between p-4 shadow-lg">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="md:hidden text-white">
          <Menu size={30} /> {/* Lucide Menu icon */}
        </button>
        <div className="text-2xl font-semibold ml-4">Hackermars</div>
      </div>
      <div className="relative flex flex-row gap-2 items-center">
        <p>{admin.name}</p>
        <User size={30} onClick={handleUserIconClick} className="cursor-pointer" /> {/* Lucide User icon */}
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black shadow-lg rounded-lg py-2 z-10">
            <ul className="divide-y divide-gray-200">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-t-lg">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li> {/* Added "Settings" option */}
              <li className="px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer rounded-b-lg">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )


  const Aside = () => (
    <aside
      className={`bg-gray-800 text-white h-full z-20 absolute lg:static  transition-transform duration-300 
            ${sidebarOpen ? 'left-0' : '-left-64'} md:left-0 md:w-64 shadow-lg`}
    >
      <ul className="p-4">
        <li
          className={selectedSection == "users" ? "flex items-center space-x-2 py-3 px-4 bg-gray-700 cursor-pointer" : "flex items-center space-x-2 py-3 px-4 hover:bg-gray-700 cursor-pointer"}
          onClick={() => handleSectionChange('users')}
        >
          <Users className="text-xl" /> {/* Lucide Users icon */}
          <span>Users</span>
        </li>
        <li
          className={selectedSection == "hackathons" ? "flex items-center space-x-2 py-3 px-4 bg-gray-700 cursor-pointer" : "flex items-center space-x-2 py-3 px-4 hover:bg-gray-700 cursor-pointer"}
          onClick={() => handleSectionChange('hackathons')}
        >
          <Calendar className="text-xl" /> {/* Lucide Calendar icon */}
          <span>Hackathons</span>
        </li>
        <li
          className={selectedSection == "projects" ? "flex items-center space-x-2 py-3 px-4 bg-gray-700 cursor-pointer" : "flex items-center space-x-2 py-3 px-4 hover:bg-gray-700 cursor-pointer"}
          onClick={() => handleSectionChange('projects')}
        >
          <Briefcase className="text-xl" /> {/* Lucide Briefcase icon */}
          <span>Projects</span>
        </li>
        <li
          className={selectedSection == "addAdmins" ? "flex items-center space-x-2 py-3 px-4 bg-gray-700 cursor-pointer" : "flex items-center space-x-2 py-3 px-4 hover:bg-gray-700 cursor-pointer"}
          onClick={() => handleSectionChange('addAdmins')}
        >
          <UserPlus className="text-xl" /> {/* Lucide UserPlus icon for Add Admins */}
          <span>Add Admins</span>
        </li>
        <li
          className={selectedSection == "requests" ? "flex items-center space-x-2 py-3 px-4 bg-gray-700 cursor-pointer" : "flex items-center space-x-2 py-3 px-4 hover:bg-gray-700 cursor-pointer"}
          onClick={() => handleSectionChange('requests')}
        >
          <UserPlus className="text-xl" /> {/* Lucide UserPlus icon for Add Admins */}
          <span>Hosting Requests</span>
        </li>
      </ul>
    </aside>
  )




  if (!admin?.name) {
    return null
  }

  return (
    <div className="h-screen p-0 m-0 relative flex flex-col font-sans">
      <Navbar />

      <div className="flex h-full relative pt-16 ">
        <Aside />
        <Content user={user} setUser={setUser} selectedSection={selectedSection} />
      </div>
    </div>
  );
};

export default Dashboard;
