'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';
import toast from 'react-hot-toast';

const addComment = async ({ postId, text, axios }) => {
  const { data } = await axios.post(`/feeds/${postId}/comments`, { text_content: text });
  return data;
};

const useAddComment = (postId) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text) => addComment({ postId, text, axios }),
    onSuccess: () => {
      // Invalidate and refetch the comments for this post
      queryClient.invalidateQueries(['comments', postId]);
      toast.success('Comment added!');
    },
    onError: () => {
      toast.error('Failed to add comment. Please try again.');
    },
  });
};

export default useAddComment;
