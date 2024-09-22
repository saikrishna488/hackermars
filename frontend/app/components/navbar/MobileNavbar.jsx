"use client";

import { useState } from 'react';
import { Menu, X, Home, Book,Trophy,PlusCircle} from 'lucide-react'; // Import Lucide Icons
import SearchBar from './SearchBar';
import ProfileMenu from './ProfileMenu';

const MobileNavbar = ({ isScrolled, router, user }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    return (
        <div className='lg:hidden flex flex-col items-center justify-between w-full py-2'>
            <div className='flex w-full justify-between items-center p-4'>
                <h5 className='text-xl font-bold text-gray-900 cursor-pointer' onClick={() => router.push('/')}>HackerMars</h5>
                <div className='flex items-center space-x-3'>
                    <ProfileMenu user={user} />

                    {
                        user?.name ? null : (
                            <button className='text-gray-600 hover:text-gray-800' onClick={() => setIsMenuVisible(true)}>
                                <Menu size={22} />
                            </button>
                        )
                    }

                </div>
            </div>

            <SearchBar isScrolled={isScrolled} isDropdownVisible={isDropdownVisible} setIsDropdownVisible={setIsDropdownVisible} />

            {isMenuVisible && (
                <div className="fixed top-0 right-0 w-full bg-white shadow-lg z-50">
                    <div className="flex justify-between items-center p-4 border-b border-gray-300">
                        <h5 className="text-xl font-bold text-gray-900">HackerMars</h5>
                        <button className="text-gray-600 hover:text-gray-800" onClick={() => setIsMenuVisible(false)}>
                            <X size={22} />
                        </button>
                    </div>
                    <ul className="flex flex-col p-4 space-y-4 text-sm">
                        <li className="flex items-center cursor-pointer hover:text-blue-600" onClick={() => router.push('/')}>
                            <Home size={20} className="mr-2 text-gray-600" />
                            Home
                        </li>
                        <li className="flex items-center cursor-pointer hover:text-blue-600" onClick={() => router.push('/practice')}>
                            <Book size={20} className="mr-2 text-gray-600" />
                            Practice
                        </li>
                        <li className="flex items-center cursor-pointer hover:text-blue-600" onClick={() => router.push('/hackathons')}>
                            <Trophy size={20} className="mr-2 text-gray-600" />
                            Hackathons
                        </li>
                        <li className="flex items-center cursor-pointer hover:text-blue-600" onClick={() => router.push('/host')}>
                            <PlusCircle size={20} className="mr-2 text-gray-600" />
                            Host
                        </li>
                    </ul>
                </div>

            )}
        </div>
    );
};

export default MobileNavbar;
