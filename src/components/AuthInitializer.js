'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '@/redux/slices/authSlice';

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      dispatch(setToken(token));
    } else {
      // Ensure loading is false even if there's no token
      dispatch(clearToken());
    }
  }, [dispatch]);

  return null; // This component does not render anything.
};

export default AuthInitializer;
