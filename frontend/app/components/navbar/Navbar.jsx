"use client";

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { globalContext } from '@/context_api/globalContext';
import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const { user } = useContext(globalContext);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`bg-white w-full fixed top-0 left-0 right-0 shadow-md z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
            <MobileNavbar isScrolled={isScrolled} router={router} />
            <DesktopNavbar router={router} user={user} />
        </div>
    );
};

export default Navbar;
