"use client";

import { FaPlus } from 'react-icons/fa';
import ProfileMenu from './ProfileMenu';
import SearchBar from './SearchBar';

const DesktopNavbar = ({ router, user }) => (
    <div className='lg:flex hidden flex-row items-center justify-between w-[80%] mx-auto py-2'>
        <div className='flex flex-row gap-4 items-center'>
            <h5 className='text-xl font-bold text-gray-900'>HackerMars</h5>
            <SearchBar />
        </div>

        <ul className='flex space-x-6 text-gray-700 items-center text-base'>
            <li className='cursor-pointer hover:text-blue-600' onClick={() => router.push('/')}>Home</li>
            <li className='cursor-pointer hover:text-blue-600' onClick={() => router.push('/hackathons')}>Hackathons</li>
            <li className='cursor-pointer hover:text-blue-600' onClick={() => router.push('/practice')}>Practice</li>
            <li className='flex items-center space-x-2'>
                <button className='px-3 py-1.5 border rounded-full bg-white text-gray-800 border-gray-300 hover:bg-gray-100 flex items-center space-x-1 transition duration-300 text-base'>
                    <FaPlus className='text-gray-800' />
                    <span>Host</span>
                </button>
                <ProfileMenu user={user} />
            </li>
        </ul>
    </div>
);

export default DesktopNavbar;
