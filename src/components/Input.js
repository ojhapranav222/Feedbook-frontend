'use client';

import React from 'react';

const Input = ({ type = 'text', placeholder, register, name, error }) => {
  return (
    <div className="w-full mb-4">
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="w-full bg-secondary border border-border-color rounded-md px-3 py-2 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;
