'use client';

import { useSelector } from 'react-redux';
import axiosInstance from '@/lib/axios';
import { useEffect } from 'react';

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        // Ensure ngrok bypass headers are always present
        config.headers['ngrok-skip-browser-warning'] = '6024';
        config.headers['User-Agent'] = 'FeedbookApp/1.0';
        
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
    };
  }, [token]);

  return axiosInstance;
};

export default useAxios;