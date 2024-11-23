"use client";

import { useState, useContext, useEffect } from 'react';
import { User, Bell, LogOut, X, Home, Trophy, PlusCircle, ListCheck,Book } from 'lucide-react'; // Import Lucide Icons
import { globalContext } from '@/context_api/globalContext';
import { useRouter } from 'next/navigation';

const ProfileMenu = ({ user }) => {
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [isUnread, setIsUnread] = useState(false);
    const { setUser } = useContext(globalContext);
    const router = useRouter();

    // Check for unread notifications
    useEffect(() => {
        if (user?.notifications?.length > 0) {
            const unreadMessages = user.notifications.filter(n => n.isRead === false);
            setIsUnread(unreadMessages.length > 0);
        }
    }, [user?.notifications]);

    // Logout function
    const logout = () => {
        setIsProfileVisible(false);
        setUser({});
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "google_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.replace('/login');
    };

    return (
        <div className='flex flex-col items-center cursor-pointer'>
            {user?.name ? (
                <>
                    {/* Bell Icon with Unread Dot */}
                    <div className='flex flex-row flex-shrink-0 items-center gap-3 relative'>
                        <div>
                            {/* Bell Icon */}
                            <span onClick={() => router.push('/notifications')} className="relative">
                                <Bell size={20} />
                                {/* Red dot when there are unread messages */}
                                {isUnread && (
                                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full" />
                                )}
                            </span>
                        </div>
                        
                        {/* Profile Image or Initial */}
                        {user.profile_url ? (
                            <img
                                onClick={() => setIsProfileVisible(!isProfileVisible)}
                                src={user.login_type === 'google' ? user.profile_url : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.profile_url}`}
                                className='rounded-full w-10 h-10 border-2 border-gray-300 hover:border-gray-400 transition duration-300 object-cover'
                                alt="User profile"
                            />
                        ) : (
                            <div onClick={() => setIsProfileVisible(!isProfileVisible)} className='flex items-center justify-center rounded-full w-11 h-11 bg-blue-200 border border-gray-300 hover:border-gray-400 transition duration-300'>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Profile Menu Popup */}
                    {isProfileVisible && (
                        <div className="bg-white rounded-lg absolute top-0 w-[300px] right-0 max-w-[400px] flex flex-col text-sm shadow-xl z-50">
                            <div className='flex justify-end p-2'>
                                <button onClick={() => setIsProfileVisible(false)}>
                                    <X className='text-gray-600 hover:text-gray-900' size={16} />
                                </button>
                            </div>

                            {/* Profile Info */}
                            <div className='p-4 flex flex-row items-center gap-2 border-b border-gray-200'>
                                {user.profile_url ? (
                                    <img
                                        src={user.login_type === 'google' ? user.profile_url : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.profile_url}`}
                                        className='rounded-full w-11 h-11 border-2 border-gray-300 hover:border-gray-400 transition duration-300 object-cover'
                                        alt="User profile"
                                    />
                                ) : (
                                    <div className='flex items-center justify-center rounded-full w-11 h-11 bg-blue-200 border border-gray-300 hover:border-gray-400 transition duration-300'>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className='flex flex-col'>
                                    <h4 className='font-semibold text-gray-800'>{user.name}</h4>
                                    <span className='text-gray-500 text-sm break-words'>{user.email}</span>
                                </div>
                            </div>

                            {/* Menu List */}
                            <ul className="flex flex-col w-full m-0 p-4 space-y-2">
                                {[
                                    { label: 'Home', icon: <Home size={20} />, route: '/' },
                                    { label: 'Projects', icon: <Book size={20} />, route: '/projects' },
                                    { label: 'Hackathons', icon: <Trophy size={20} />, route: '/hackathons' },
                                    { label: 'Host', icon: <PlusCircle size={20} />, route: '/host' },
                                    { label: 'Profile', icon: <User size={20} />, route: '/profile' },
                                    { label: 'Registered Events', icon: <ListCheck size={20} />, route: '/registered-events' },
                                ].map(({ label, icon, route }) => (
                                    <li onClick={() => router.push(route)} key={label} className="flex items-center cursor-pointer bg-gray-100 hover:bg-blue-200 rounded-lg p-3 transition duration-200 ease-in-out">
                                        {icon}
                                        <span className="ml-2 text-gray-700">{label}</span>
                                    </li>
                                ))}
                                <li className="flex items-center cursor-pointer bg-red-100 hover:bg-red-200 rounded-lg p-3 transition duration-200 ease-in-out" onClick={logout}>
                                    <LogOut size={20} className="mr-2 text-red-600" />
                                    <span className="text-red-700">Logout</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </>
            ) : (
                <button onClick={() => router.push('/login')} className='px-3 py-1.5 border rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 text-base'>
                    Login
                </button>
            )}
        </div>
    );
};

export default ProfileMenu;
