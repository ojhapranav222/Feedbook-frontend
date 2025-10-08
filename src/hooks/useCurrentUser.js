'use client';

import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const fetchCurrentUser = async ({ axios }) => {
  const { data } = await axios.get('/users/me');
  return data;
};

const useCurrentUser = () => {
  const axios = useAxios();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => fetchCurrentUser({ axios }),
  });
};

export default useCurrentUser;