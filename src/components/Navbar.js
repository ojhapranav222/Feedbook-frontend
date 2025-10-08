'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IoHome, IoPeople, IoStorefront, IoTv } from 'react-icons/io5';
import { FaBell, FaFacebookMessenger, FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { clearToken } from '@/redux/slices/authSlice';

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearToken());
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg-secondary)] shadow-md px-4 py-1 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-2 text-[var(--text-primary)] font-bold text-xl gap-4">
        <Image src="/logo.svg" alt="FeedBook Logo" width={40} height={40} />
        FeedBook
      </div>

      {/* Center Section */}
      <div className="hidden md:flex flex-grow justify-center items-center space-x-2">
        <div className="p-3 rounded-lg hover:bg-[var(--bg-tertiary)] cursor-pointer text-[var(--accent)] border-b-2 border-[var(--accent)]">
          <IoHome size={28} />
        </div>
        {/* <div className="p-3 rounded-lg hover:bg-[var(--bg-tertiary)] cursor-pointer text-text-secondary">
          <IoPeople size={28} />
        </div>
        <div className="p-3 rounded-lg hover:bg-[var(--bg-tertiary)] cursor-pointer text-text-secondary">
          <IoStorefront size={28} />
        </div>
        <div className="p-3 rounded-lg hover:bg-[var(--bg-tertiary)] cursor-pointer text-text-secondary">
          <IoTv size={28} />
        </div> */}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* <div className="p-3 bg-[var(--bg-tertiary)] rounded-full hover:bg-opacity-80 cursor-pointer">
          <FaFacebookMessenger size={20} className="text-text-primary" />
        </div>
        <div className="p-3 bg-[var(--bg-tertiary)] rounded-full hover:bg-opacity-80 cursor-pointer">
          <FaBell size={20} className="text-text-primary" />
        </div> */}
        <div className="relative">
          <div onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="p-3 bg-[var(--bg-tertiary)] rounded-full hover:bg-opacity-80 cursor-pointer">
            <FaUserCircle size={20} className="text-text-primary" />
          </div>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-secondary)] rounded-lg shadow-lg py-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
