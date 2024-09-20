"use client";

import { useState, useContext } from 'react';
import { FaUserCircle, FaCalendarAlt, FaSignOutAlt, FaTimes } from 'react-icons/fa';  // Import necessary icons
import { globalContext } from '@/context_api/globalContext';
import { useRouter } from 'next/navigation';





const ProfileMenu = ({ user }) => {
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const { setUser } = useContext(globalContext)
    const router = useRouter()



    const logout = () => {
        setUser({})
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    return (
        <div onClick={() => setIsProfileVisible(!isProfileVisible)} className='relative flex flex-col items-center cursor-pointer'>
            {user.name ? (
                <>

                    {
                        user.profile_url ? (
                            <img
                                src={user.login_type == 'google' ? user.profile_url : process.env.NEXT_PUBLIC_BACKEND_URL + "/" + user.profile_url}
                                className='hover:border-4 border-gray-500 border-2  rounded-full w-11 h-11 hover:border-gray-300 transition duration-300 object-center' 
                                
                                alt="User profile"
                            />
                        ) : (
                            <div className='flex items-center justify-center rounded-full w-11 h-11 bg-gray-400 border hover:border-gray-400 transition duration-300'>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )
                    }



                    {isProfileVisible && (
                        <div className="bg-white rounded-lg absolute top-14 right-0 w-[250px] flex flex-col text-sm shadow-lg z-50">
                            {/* Close Icon */}
                            <div className='flex justify-end p-2'>
                                <button onClick={() => setIsProfileVisible(false)}>
                                    <FaTimes className='text-gray-600 hover:text-gray-900' size={16} />
                                </button>
                            </div>

                            {/* Profile Info */}
                            <div className='p-4 flex flex-row items-center gap-3 border-b rounded-lg'>
                                {
                                    user.profile_url ? (
                                        <img
                                            src={user.login_type == 'google' ? user.profile_url : process.env.NEXT_PUBLIC_BACKEND_URL + "/" + user.profile_url}
                                            className='hover:border-4 rounded-full w-11 h-11 border-2 hover:border-gray-400 transition duration-300'
                                            alt="User profile"
                                        />
                                    ) : (
                                        <div className='flex items-center justify-center rounded-full w-11 h-11 bg-gray-400 border hover:border-gray-400 transition duration-300'>
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    )
                                }
                                <div className='flex flex-col'>
                                    <h4 className='font-semibold text-gray-800'>{user.name}</h4>
                                    <span className='text-gray-500 text-sm'>{user.email}</span>
                                </div>
                            </div>

                            {/* Menu List */}
                            <ul className='py-2'>
                                <li className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer'>
                                    <FaUserCircle className='text-gray-700' size={18} />
                                    <span>Profile</span>
                                </li>

                                <li className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer'>
                                    <FaCalendarAlt className='text-gray-700' size={18} />
                                    <span>Registered Events</span>
                                </li>

                                <li className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer' onClick={() => logout()} >
                                    <FaSignOutAlt className='text-gray-700' size={18} />
                                    <span>Logout</span>
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
