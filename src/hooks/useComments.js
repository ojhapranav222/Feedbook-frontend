'use client';

import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const fetchComments = async ({ postId, axios }) => {
  const { data } = await axios.get(`/feeds/${postId}/comments`);
  return data;
};

const useComments = (postId) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments({ postId, axios }),
    enabled: !!postId, // Only run the query if postId is available
  });
};

export default useComments;
