"use client";
import React from 'react';
import { FaDiscord } from 'react-icons/fa';

const JoinDiscordButton = () => {
    const handleClick = () => {
        window.location.href = 'https://discord.gg/your-discord-invite-link';
    };

    return (
        <div className='relative w-full'>
            {/* Centered Join Discord Button */}
            <div className='flex justify-center w-full'>
                <button
                    onClick={handleClick}
                    className='flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300'
                >
                    <FaDiscord size={20} /> {/* Discord icon */}
                    Join Discord Community
                </button>
            </div>

            {/* Floating Discord Icon with Text Rotated 90 Degrees */}
            <div
                className='fixed bottom-[150px] right-[-94px] -rotate-90  m-0 bg-black p-2 shadow-md cursor-pointer hover:bg-blue-700 flex items-center'
                onClick={handleClick} 
            >
                <div className='flex flex-row items-center text-white'>
                    <FaDiscord size={30} />
                    <span className='text-base ml-2'>Join Discord Community</span>
                </div>
            </div>
        </div>
    );
};

export default JoinDiscordButton;
