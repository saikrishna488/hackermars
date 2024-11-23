"use client";

import { Plus, Home, ClipboardList, FileText } from 'lucide-react'; // Import Lucide Icons
import ProfileMenu from './ProfileMenu';

const DesktopNavbar = ({ router, user }) => (
    <div className="lg:flex hidden flex-row items-center justify-between w-[80%] mx-auto py-2 bg-white  rounded-lg transition-shadow duration-300">
        <div className="flex flex-row gap-4 items-center">
            <h5 className="text-xl font-bold text-gray-900 cursor-pointer" onClick={() => router.push('/')}>HackerMars</h5>
        </div>

        <ul className="flex space-x-6 text-gray-700 items-center text-base">
            <li className="flex items-center cursor-pointer hover:text-blue-600 transition duration-200 text-sm" onClick={() => router.push('/')}>
                <Home size={20} className="mr-1" /> Home
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-600 transition duration-200 text-sm" onClick={() => router.push('/hackathons')}>
                <ClipboardList size={20} className="mr-1" /> Hackathons
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-600 transition duration-200 text-sm" onClick={() => router.push('/projects')}>
                <FileText size={20} className="mr-1" /> Projects
            </li>
            <li className="flex items-center space-x-2">
                <button onClick={() => router.push('/host')} className="px-3 py-1.5 border rounded-full bg-white text-gray-800 border-gray-300 hover:bg-gray-100 flex items-center space-x-1 transition duration-300">
                    <Plus size={20} className="text-gray-800" />
                    <span className='text-sm'>Host</span>
                </button>
                <ProfileMenu user={user} />
            </li>
        </ul>
    </div>
);

export default DesktopNavbar;
