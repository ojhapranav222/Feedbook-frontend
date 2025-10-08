'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const fetchFeeds = async ({ pageParam = 1, axios }) => {
  const { data } = await axios.get(`/feeds?page=${pageParam}&limit=10`);
  return data;
};

const useFeeds = () => {
  const axios = useAxios();

  return useInfiniteQuery({
    queryKey: ['feeds'],
    queryFn: ({ pageParam }) => fetchFeeds({ pageParam, axios }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });
};

export default useFeeds;