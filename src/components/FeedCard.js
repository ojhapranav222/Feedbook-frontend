'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Button from './Button';
import CommentList from './CommentList';
import useReportPost from '@/hooks/useReportPost';

dayjs.extend(relativeTime);

const FeedCard = ({ post }) => {
  const { id, author, text_content, images, created_at, _count } = post;
  const [showComments, setShowComments] = useState(false);
  const { mutate: reportPost, isSuccess } = useReportPost();

  const handleReport = () => {
    reportPost(id);
  };

  return (
    <div className="w-full max-w-xl p-4 mx-auto my-4 bg-[var(--bg-secondary)] rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center font-bold text-[var(--text-primary)]">
          {author.first_name.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="font-bold text-[var(--text-primary)]">{`${author.first_name} ${author.last_name}`}</p>
          <p className="text-xs text-[var(--text-secondary)]">{dayjs(created_at).fromNow()}</p>
        </div>
      </div>
      {text_content && <p className="text-[var(--text-primary)] mb-4">{text_content}</p>}
      {images && images.length > 0 && (
        <div className={`mb-4 grid gap-2 ${
          images.length === 1 ? 'grid-cols-1' : 
          images.length === 3 ? 'grid-cols-2 grid-rows-2' : 
          'grid-cols-2'
        }`}>
          {images.map((image, index) => (
            <div 
              key={image.id} 
              className={`relative w-full ${
                images.length === 1 ? 'h-96' :
                images.length === 3 && index === 0 ? 'row-span-2 h-full' :
                'h-48'
              }`}
            >
              <Image
                src={image.image_url}
                alt={`Post image ${index + 1}`}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center">
        <button onClick={() => setShowComments(!showComments)} className="text-sm w-[50%] text-[var(--text-secondary)] cursor-pointer hover:underline">
          {_count.comments} Comments
        </button>
        <Button variant="secondary" onClick={handleReport} disabled={isSuccess}>
          {isSuccess ? 'Reported' : 'Report'}
        </Button>
      </div>
      {showComments && <CommentList postId={id} />}
    </div>
  );
};

export default FeedCard;
