'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import useComments from '@/hooks/useComments';
import useAddComment from '@/hooks/useAddComment';
import Comment from './Comment';
import Button from './Button';

const commentSchema = z.object({
  text: z.string().min(1, { message: 'Comment cannot be empty' }),
});

const CommentList = ({ postId }) => {
  const { data: comments, isLoading } = useComments(postId);
  const { mutate: addComment, isPending } = useAddComment(postId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = (data) => {
    addComment(data.text, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="mt-4 pt-4 border-t border-border-color">
      {isLoading && <p className="text-text-secondary">Loading comments...</p>}
      {comments && comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex space-x-2">
        <input
          {...register('text')}
          placeholder="Write a comment..."
          className="flex-1 bg-tertiary border border-border-color rounded-full px-4 py-2 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? '... ' : 'Post'}
        </Button>
      </form>
      {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text.message}</p>}
    </div>
  );
};

export default CommentList;
