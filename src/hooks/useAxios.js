'use client';

import { useSelector } from 'react-redux';
import axiosInstance from '@/lib/axios';
import { useEffect } from 'react';

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
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
