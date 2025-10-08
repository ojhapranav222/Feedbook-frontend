'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import FeedCard from './FeedCard';
import LoadingSkeleton from './LoadingSkeleton';

const FeedList = ({ data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="space-y-4 w-full max-w-xl">
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  const allPosts = data?.pages.flatMap(page => page) ?? [];

  if (allPosts.length === 0) {
    return <p className="text-center text-text-secondary mt-8">No posts yet. Be the first to share!</p>;
  }

  return (
    <div className="space-y-4 w-full max-w-xl">
      {allPosts.map((post, index) => {
        if (index === allPosts.length - 1) {
          return <div ref={ref} key={post.id}><FeedCard post={post} /></div>;
        }
        return <FeedCard key={post.id} post={post} />;
      })}

      {isFetchingNextPage && <LoadingSkeleton />}
      {!hasNextPage && allPosts.length > 0 && (
        <p className="text-center text-text-secondary py-4">No more posts to load.</p>
      )}
    </div>
  );
};

export default FeedList;

