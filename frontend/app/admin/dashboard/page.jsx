"use client";
import React, { useContext, useState } from 'react';
import { 
  User, 
  Users, 
  Briefcase, 
  Calendar, 
  Menu, 
  UserPlus, 
  UserCircle, 
  Settings, 
  LogOut, 
  MessageCircle, 
  LayoutDashboard, 
  Bell, 
  ChevronDown 
} from 'lucide-react'; 
import { globalContext } from '@/context_api/globalContext';
import UserSection from './UserSection';
import Requests from './Requests';
import Hackathons from './Hackathons';
import Projects from './Projects';
import AddAdmins from './AddAdmins';
import { useRouter } from 'next/navigation';



const Content = ({ user, setUser, selectedSection }) => {
  const [requests, setRequests] = useState([]);
  const {admin} = useContext(globalContext)

  const renderContent = () => {
    switch(selectedSection) {
      case "users":
        return <UserSection user={user} setUser={setUser} />;
      case "requests":
        return <Requests requests={requests} setRequests={setRequests} />;
      case "hackathons":
        return <Hackathons/>
      case "projects":
        return <Projects/>
      case "addAdmins":
        return admin.isSuperAdmin ? <AddAdmins /> : <div>Unauthorized</div>
      default:
        return null;
    }
  }

  return (
    <div className="flex-grow bg-gray-50 p-6 overflow-y-auto transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto">
        <div className="animate-fade-in-up">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState({})
  const [selectedSection, setSelectedSection] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const { admin,setAdmin } = useContext(globalContext)
  const router = useRouter();

  const handleUserIconClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setSidebarOpen(false); 
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };





  // handle logout
  const handleLogout = ()=>{
    setAdmin({})
    router.replace('/admin')
  }



  const Navbar = () => {

    return (
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button 
            onClick={toggleSidebar} 
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300 md:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-blue-100 text-blue-700 p-1.5 sm:p-2 rounded-full">
              <LayoutDashboard size={18} className="sm:w-5 sm:h-5" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">Admin Dashboard</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          
          <div className="relative group">
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={handleUserIconClick}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={20} className="text-blue-600" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-800">{admin.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <ChevronDown 
                size={16} 
                className="text-gray-500 transform group-hover:rotate-180 transition-transform duration-300" 
              />
            </div>
            
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{admin.name}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </div>
                <ul>
                  <li 
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                    onClick={() => router.push('/admin/profile')}
                  >
                    <UserCircle size={18} />
                    <span  className="text-sm">Profile</span>
                  </li>
                  <li 
                    className="px-4 py-2 hover:bg-red-50 cursor-pointer flex items-center space-x-2 text-red-500 hover:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <span  className="text-sm">Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }

  const Aside = () => (
    <aside
      className={`
        fixed top-16 bottom-0 w-64 bg-white border-r border-gray-200 shadow-lg 
        transform transition-transform duration-300 z-30
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:block
      `}
    >
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
      </div>
      <nav className="py-4">
        <ul className="space-y-1">
          {[
            { 
              section: "users", 
              icon: Users, 
              label: "Users", 
              className: "hover:bg-blue-50 hover:text-blue-600" 
            },
            { 
              section: "hackathons", 
              icon: Calendar, 
              label: "Hackathons", 
              className: "hover:bg-green-50 hover:text-green-600" 
            },
            { 
              section: "projects", 
              icon: Briefcase, 
              label: "Projects", 
              className: "hover:bg-purple-50 hover:text-purple-600" 
            },
            { 
              section: "addAdmins", 
              icon: UserPlus, 
              label: "Add Admins", 
              className: "hover:bg-indigo-50 hover:text-indigo-600" 
            },
            { 
              section: "requests", 
              icon: MessageCircle, 
              label: "Hosting Requests", 
              className: "hover:bg-orange-50 hover:text-orange-600" 
            }
          ].map(({ section, icon: Icon, label, className }) => (
            <li 
              key={section}
              className={`
                px-4 py-2 cursor-pointer flex items-center space-x-3 
                ${selectedSection === section 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600'}
                ${className} transition-all duration-300
              `}
              onClick={() => handleSectionChange(section)}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )




  if (!admin?.name) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Aside />
        
        <main className="flex-grow overflow-y-auto">
          <Content 
            user={user} 
            setUser={setUser} 
            selectedSection={selectedSection} 
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
