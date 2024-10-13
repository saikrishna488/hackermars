"use client";

import { useState, useContext } from 'react';
import { User, Calendar, LogOut, X, Home, ClipboardList, FileText, Plus, Book, Trophy, PlusCircle, ListCheck } from 'lucide-react'; // Import Lucide Icons
import { globalContext } from '@/context_api/globalContext';
import { useRouter } from 'next/navigation';

const ProfileMenu = ({ user }) => {
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const { setUser } = useContext(globalContext);
    const router = useRouter();

    const logout = () => {
        setUser({});
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    return (
        <div onClick={() => setIsProfileVisible(!isProfileVisible)} className=' flex flex-col items-center cursor-pointer'>
            {user?.name ? (
                <>
                    {user.profile_url ? (
                        <img
                            src={user.login_type === 'google' ? user.profile_url : process.env.NEXT_PUBLIC_BACKEND_URL + "/" + user.profile_url}
                            className='rounded-full w-11 h-11 border-2 border-gray-300 hover:border-gray-400 transition duration-300 object-cover'
                            alt="User profile"
                        />
                    ) : (
                        <div className='flex items-center justify-center rounded-full w-11 h-11 bg-gray-400 border hover:border-gray-400 transition duration-300'>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    )}

                    {isProfileVisible && (
                        <div className="bg-white rounded-lg absolute top-0 w-[300px] right-0 max-w-[400px] flex flex-col text-sm shadow-lg z-50">
                            {/* Close Icon */}
                            <div className='flex justify-end p-2'>
                                <button onClick={() => setIsProfileVisible(false)}>
                                    <X className='text-gray-600 hover:text-gray-900' size={16} />
                                </button>
                            </div>

                            {/* Profile Info */}
                            <div className='p-4 flex flex-row items-center relative gap-2 border-b rounded-lg'>
                                {user.profile_url ? (
                                    <img
                                        src={user.login_type === 'google' ? user.profile_url : process.env.NEXT_PUBLIC_BACKEND_URL + "/" + user.profile_url}
                                        className='rounded-full w-11 h-11 border-2 hover:border-gray-400 transition duration-300 object-cover'
                                        alt="User profile"
                                    />
                                ) : (
                                    <div className='flex items-center justify-center rounded-full w-11 h-11 bg-gray-400 border hover:border-gray-400 transition duration-300'>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className='flex flex-col relative'>
                                    <h4 className='font-semibold text-gray-800'>{user.name}</h4>
                                    <span className='text-gray-500 text-sm break-words'>{user.email}</span>
                                </div>

                            </div>

                            {/* Menu List */}
                            <ul className="flex flex-col p-4 space-y-4 text-sm">
                                <li className="flex items-center cursor-pointer bg-gray-100 hover:bg-blue-100 rounded-lg p-3" onClick={() => router.push('/')}>
                                    <Home size={20} className="mr-2 text-gray-600" />
                                    Home
                                </li>
                                <li className="flex items-center cursor-pointer bg-gray-100 hover:bg-blue-100 rounded-lg p-3" onClick={() => router.push('/practice')}>
                                    <Book size={20} className="mr-2 text-gray-600" />
                                    Practice
                                </li>
                                <li className="flex items-center cursor-pointer bg-gray-100 hover:bg-blue-100 rounded-lg p-3" onClick={() => router.push('/hackathons')}>
                                    <Trophy size={20} className="mr-2 text-gray-600" />
                                    Hackathons
                                </li>
                                <li className="flex items-center cursor-pointer bg-gray-100 hover:bg-blue-100 rounded-lg p-3" onClick={() => router.push('/host')}>
                                    <PlusCircle size={20} className="mr-2 text-gray-600" />
                                    Host
                                </li>
                                <li className="flex items-center cursor-pointer bg-gray-100 hover:bg-blue-100 rounded-lg p-3" onClick={() => router.push('/profile')}>
                                    <User size={20} className="mr-2 text-gray-600" />
                                    Profile
                                </li>
                                <li className="flex items-center cursor-pointer bg-gray-100 hover:bg-blue-100 rounded-lg p-3" onClick={() => router.push('/registered-events')}>
                                    <ListCheck size={20} className="mr-2 text-gray-600" />
                                    Registered Events
                                </li>
                                <li className="flex items-center cursor-pointer bg-red-100 hover:bg-red-200 rounded-lg p-3" onClick={logout}>
                                    <LogOut size={20} className="mr-2 text-red-600" />
                                    Logout
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
