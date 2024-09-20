"use client";

import { useState } from 'react';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import SearchBar from './SearchBar';

const MobileNavbar = ({ isScrolled, router }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    return (
        <div className='lg:hidden flex flex-col items-center justify-between w-full py-2'>
            <div className='flex w-full justify-between items-center p-4'>
                <h5 className='text-xl font-bold text-gray-900'>HackerMars</h5>
                <div className='flex items-center space-x-3'>
                    <button onClick={() => router.push('/login')} className='px-3 py-1.5 border rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 text-sm'>
                        Login
                    </button>
                    <button className='text-gray-600 hover:text-gray-800' onClick={() => setIsMenuVisible(true)}>
                        <FaBars size={22} />
                    </button>
                </div>
            </div>

            <SearchBar isScrolled={isScrolled} isDropdownVisible={isDropdownVisible} setIsDropdownVisible={setIsDropdownVisible} />

            {isMenuVisible && (
                <div className='fixed top-0 right-0 w-full bg-white shadow-lg z-50'>
                    <div className='flex justify-between items-center p-4 border-b border-gray-300'>
                        <h5 className='text-xl font-bold text-gray-900'>HackerMars</h5>
                        <button className='text-gray-600 hover:text-gray-800' onClick={() => setIsMenuVisible(false)}>
                            <FaTimes size={22} />
                        </button>
                    </div>
                    <ul className='flex flex-col p-4 space-y-4 text-sm'>
                        <li className='cursor-pointer hover:text-blue-600' onClick={() => router.push('/')}>Home</li>
                        <li className='cursor-pointer hover:text-blue-600' onClick={() => router.push('/practice')}>Practice</li>
                        <li className='cursor-pointer hover:text-blue-600' onClick={() => router.push('/hackathons')}>Hackathons</li>
                        <li className='cursor-pointer hover:text-blue-600'>Host</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MobileNavbar;
