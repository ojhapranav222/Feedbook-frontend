'use client';

import React from 'react';
import { FaUserCircle, FaUserFriends } from 'react-icons/fa';
import { IoTimeSharp } from 'react-icons/io5';
import { MdVerifiedUser } from "react-icons/md";
import dayjs from 'dayjs';
import useCurrentUser from '@/hooks/useCurrentUser';

const LeftSidebar = () => {
  const { data: user, isLoading, isError } = useCurrentUser();

  // Show loading state
  if (isLoading) {
    return (
      <aside className="hidden md:block fixed top-16 left-0 w-72 h-full p-4">
        <div className="animate-pulse space-y-2">
          <div className="h-12 bg-gray-700 rounded-lg"></div>
          <div className="h-12 bg-gray-700 rounded-lg"></div>
          <div className="h-12 bg-gray-700 rounded-lg"></div>
        </div>
      </aside>
    );
  }

  // Show error state
  if (isError || !user) {
    return (
      <aside className="hidden md:block fixed top-16 left-0 w-72 h-full p-4">
        <p className="text-red-500">Failed to load user data</p>
      </aside>
    );
  }

  const menuItems = [
    { 
      icon: <FaUserCircle size={24} className="text-[var(--accent)]" />, 
      label: user.first_name + ' ' + user.last_name,
      key: 'name'
    },
    { 
      icon: <FaUserFriends size={24} className="text-purple-500" />, 
      label: user.email,
      key: 'email'
    },
    { 
      icon: <IoTimeSharp size={24} className="text-orange-400" />, 
      label: `Joined ${dayjs(user.created_at).format('MMMM DD, YYYY')}`,
      key: 'joined'
    },
    { 
      icon: <MdVerifiedUser size={24} className="text-green-500" />, 
      label: user.username,
      key: 'username'
    },
  ];

  return (
    <aside className="hidden md:block fixed top-16 left-0 w-72 h-full p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.key}>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[var(--bg-tertiary)] cursor-pointer">
              {item.icon}
              <span className="font-semibold text-[var(--text-primary)]">
                {item.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default LeftSidebar;