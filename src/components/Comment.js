'use client';

import React from 'react';
import dayjs from 'dayjs';

const Comment = ({ comment }) => {
  const { author, text_content, createdAt } = comment;

  return (
    <div className="flex items-start space-x-3 py-2">
      <div className="w-8 h-8 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center font-bold text-[var(--text-primary)] text-sm">
        {author.first_name.charAt(0)}
      </div>
      <div className="flex-1 bg-[var(--bg-tertiary)] rounded-lg p-2">
        <div className="flex items-center justify-between">
          <p className="font-bold text-[var(--text-primary)] text-sm">{`${author.first_name} ${author.last_name}`}</p>
          <p className="text-xs text-text-secondary">{dayjs(createdAt).fromNow()}</p>
        </div>
        <p className="text-[var(--text-primary)] text-sm mt-1">{text_content}</p>
      </div>
    </div>
  );
};

export default Comment;
