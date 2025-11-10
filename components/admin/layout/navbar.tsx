'use client'
import React from 'react';
import { Menu } from 'lucide-react';
import Image from 'next/image';

interface DashboardNavbarProps {
    toggleSidebar: () => void;
}

const Navbar: React.FC<DashboardNavbarProps> = ({ toggleSidebar }) => {
    return (
        <div className='flex items-center bg-blue-950 gap-3 justify-between lg:px-7 px-4 w-full py-3'>
            {/* Left Part */}
            <div className='flex items-center gap-4'>
                {/* Hamburger Menu - only show on mobile */}
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden block text-white text-2xl"
                >
                    <Menu />
                </button>

                 {/* Search Bar */}
                <h1 className='lg:text-2xl sm:text-xl font-bold text-white'>Welcome back Admin!</h1>
            </div>

            {/* Right Part */}
            <div className='flex items-center w-fit gap-3'>
                <Image
                    alt='profile'
                    width={50}
                    height={50}
                    src={'/profile.png'}
                    className=' w-11 h-11 rounded-full'
                />
            </div>
        </div>
    );
};

export default Navbar;
