'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';
import toast from 'react-hot-toast';

const reportPost = async ({ postId, axios }) => {
  const { data } = await axios.post('/reports', { feed_id: postId });
  return data;
};

const useReportPost = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => reportPost({ postId, axios }),
    onSuccess: () => {
      toast.success('Post reported successfully. It will be reviewed by our team.');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to report post. Please try again.');
    },
  });
};

export default useReportPost;
