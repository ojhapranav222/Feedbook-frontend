'use client';

import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="w-full max-w-xl p-4 mx-auto bg-[var(--bg-secondary)] rounded-lg shadow-md animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-[var(--bg-tertiary)] rounded-full"></div>
        <div className="ml-3">
          <div className="h-4 bg-[var(--bg-tertiary)] rounded w-24"></div>
          <div className="h-3 bg-[var(--bg-tertiary)] rounded w-16 mt-1"></div>
        </div>
      </div>
      <div className="h-4 bg-[var(--bg-tertiary)] rounded w-full mb-2"></div>
      <div className="h-4 bg-[var(--bg-tertiary)] rounded w-3/4 mb-4"></div>
      <div className="h-48 bg-[var(--bg-tertiary)] rounded-lg"></div>
    </div>
  );
};

export default LoadingSkeleton;
