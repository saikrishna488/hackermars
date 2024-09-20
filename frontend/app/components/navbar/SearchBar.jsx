"use client";

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ isScrolled, isDropdownVisible, setIsDropdownVisible }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    return (
        <div className={`relative w-full ${isScrolled ? 'hidden' : 'block'} transition-opacity duration-300`}>
            <div className={`flex items-center border rounded-full ${isScrolled ? 'border-blue-600' : 'border-gray-300'} transition-colors duration-300`}>
                <FaSearch className='text-gray-500 ml-3' size={18} />
                <input
                    type="search"
                    placeholder="Search"
                    className='border-none rounded-full px-3 py-1.5 w-full focus:outline-none text-sm'
                    onFocus={() => setDropdownVisible(true)}
                    onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
                />
            </div>
            {dropdownVisible && (
                <div className='absolute top-full left-0 w-full mt-2 p-4 border border-gray-300 rounded-lg shadow-lg bg-white'>
                    <h4 className='text-gray-800 font-semibold mb-2 text-sm'>Categories</h4>
                    <div className='flex flex-row flex-wrap gap-2'>
                        <button className='px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 transition duration-300 text-sm'>Practice</button>
                        <button className='px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 transition duration-300 text-sm'>Hackathons</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
