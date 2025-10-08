'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';
import toast from 'react-hot-toast';

const createPost = async ({ formData, axios }) => {
  const { data } = await axios.post('/feeds', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

const useCreatePost = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => createPost({ formData, axios }),
    onSuccess: () => {
      // Invalidate and refetch the feeds query to show the new post
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      toast.success('Post created successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create post. Please try again.');
    },
  });
};

export default useCreatePost;
