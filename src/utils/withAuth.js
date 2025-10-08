'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { isAuthenticated, authLoading } = useSelector((state) => state.auth);

    useEffect(() => {
      // If not loading and not authenticated, redirect to login.
      if (!authLoading && !isAuthenticated) {
        router.replace('/auth/login');
      }
    }, [isAuthenticated, authLoading, router]);

    // While loading, show a loader.
    if (authLoading || !isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-primary">
          <p className="text-text-primary">Loading...</p>
        </div>
      );
    }

    // If authenticated, render the wrapped component.
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
