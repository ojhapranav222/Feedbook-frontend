'use client';

import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, className }) => {
  const baseClasses = 'w-full font-bold py-2 cursor-pointer px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200';

  const variants = {
    primary: 'bg-[var(--accent)] text-white hover:bg-blue-700',
    secondary: 'bg-[var(--bg-tertiary)] text-text-primary hover:bg-opacity-80',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
