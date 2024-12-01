"use client";
import { Plus, Home, ClipboardList, FileText, Code } from 'lucide-react';
import ProfileMenu from './ProfileMenu';

const NavLink = ({ icon: Icon, label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
      transition-all duration-200 relative group
      ${isActive 
        ? 'text-blue-600 bg-blue-50/80' 
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
      }
    `}
  >
    <Icon className={`w-4 h-4 transition-transform duration-200 ${
      isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'
    }`} />
    <span className="relative">
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
      )}
    </span>
  </button>
);

const DesktopNavbar = ({ router, user }) => {
  const currentPath = router.pathname;

  const navLinks = [
    { 
      icon: Home, 
      label: 'Home', 
      path: '/',
    },
    { 
      icon: ClipboardList, 
      label: 'Hackathons', 
      path: '/hackathons',
    },
    { 
      icon: FileText, 
      label: 'Projects', 
      path: '/projects',
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Code className="w-5 h-5 text-white" />
            </div>
            <button
              onClick={() => router.push('/')}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors flex items-center"
            >
              Hacker
              <span className="text-blue-600">Mars</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                icon={link.icon}
                label={link.label}
                onClick={() => router.push(link.path)}
                isActive={currentPath === link.path}
              />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push('/host')}
              className="lg:inline-flex hidden items-center gap-2 px-4 py-2.5 rounded-xl
                bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium
                hover:from-blue-700 hover:to-blue-800 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              <Plus className="w-4 h-4" />
              Host Event
            </button>

            <div className="h-8 w-px bg-gray-200" />
            
            <ProfileMenu 
              user={user}
              className="flex-shrink-0"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopNavbar;