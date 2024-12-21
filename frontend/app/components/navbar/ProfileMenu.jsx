"use client";
import { useState, useContext, useEffect, useRef } from 'react';
import { 
  User, Bell, LogOut, Home, Trophy, 
  PlusCircle, ListCheck, Book, ChevronDown,
  Settings, UserCircle
} from 'lucide-react';
import { globalContext } from '@/context_api/globalContext';
import { useRouter } from 'next/navigation';

const MenuItem = ({ icon: Icon, label, onClick, variant = 'default', badge }) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-4 py-2.5 text-sm
      transition-all duration-200 hover:bg-gray-50/80
      ${variant === 'danger' 
        ? 'text-red-600 hover:text-red-700 hover:bg-red-50/80' 
        : 'text-gray-600 hover:text-gray-900'
      }
    `}
  >
    <Icon className={`w-4 h-4 ${variant === 'danger' ? 'text-red-500' : 'text-gray-400'}`} />
    <span className="font-medium">{label}</span>
    {badge && (
      <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

const UserAvatar = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  if (user.profile_url) {
    return (
      <div className={`${sizeClasses[size]} relative rounded-full ring-2 ring-white ring-offset-2`}>
        <img
          src={user.login_type === 'google' 
            ? user.profile_url 
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.profile_url}`
          }
          className="w-full h-full rounded-full object-cover"
          // alt={user.name}
        />
      </div>
    );
  }

  return (
    <div className={`
      ${sizeClasses[size]} rounded-full 
      bg-gradient-to-br from-blue-500 to-blue-600
      text-white flex items-center justify-center font-medium
      shadow-lg shadow-blue-500/20
    `}>
      {user.name.charAt(0).toUpperCase()}
    </div>
  );
};

const ProfileMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const { setUser } = useContext(globalContext);
  const router = useRouter();
  const menuRef = useRef(null);

  const menuItems = [
    { label: 'Profile', icon: User, route: '/profile' },
    { label: 'Dashboard', icon: Home, route: '/host' },
    { label: 'My Projects', icon: Book, route: '/projects/dashboard', },
    { label: 'My Events', icon: ListCheck, route: '/registeredevents' },
    { label: 'Discover Hackathons', icon: Trophy, route: '/hackathons' },
    { label: 'Discover Projects', icon: PlusCircle, route: '/projects' },
  ];



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  useEffect(() => {
    if (user?.notifications?.length) {
      setHasUnread(user.notifications.some(n => !n.isRead));
    }
  }, [user?.notifications]);

  const handleLogout = () => {
    setIsOpen(false);
    setUser({});
    ['token', 'google_token'].forEach(cookie => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    router.replace('/login');
  };

  if (!user?.name) {
    return (
      <button onClick={()=>router.replace('/login')} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
        bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium
        hover:from-blue-700 hover:to-blue-800 transition-all duration-200
        shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
      >
        <UserCircle className="w-4 h-4" />
        Login
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/notifications')}
          className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {hasUnread && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full
              ring-2 ring-white animate-pulse"
            />
          )}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 
            transition-all duration-200 group"
        >
          <UserAvatar user={user} size="sm" />
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 
            group-hover:text-gray-600 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl
          shadow-xl border border-gray-100/50 py-3 z-50 backdrop-blur-sm
          animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="px-4 py-3 flex items-center gap-4 border-b border-gray-100">
            <UserAvatar user={user} size="md" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 truncate">{user.name}</div>
              <div className="text-sm text-gray-500 truncate">{user.email}</div>
            </div>
          </div>

          <div className="py-2">
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                onClick={() => {
                  router.push(item.route);
                  setIsOpen(false);
                }}
              />
            ))}

            <div className="my-2 border-t border-gray-100" />
            
            {/* <MenuItem
              icon={Settings}
              label="Settings"
              onClick={() => {
                router.push('/settings');
                setIsOpen(false);
              }}
            /> */}
            
            <MenuItem
              icon={LogOut}
              label="Logout"
              variant="danger"
              onClick={handleLogout}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;