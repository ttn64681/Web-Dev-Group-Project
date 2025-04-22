'use client';
import React, { useState, useEffect } from 'react';

type CommentBoxProps = {
  username: string,
  commentText: string
}

const CommentBox: React.FC<CommentBoxProps> = ({
  username,
  commentText
}: CommentBoxProps) => {
  return (
    <div className="bg-comment-bg-purple p-4 rounded-lg">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-neon-pink">{username}</h3>
        </div>
        <h4 className="text-comment-text-white-pink">{commentText}</h4>
      </div>
    </div>
  );
};

export default CommentBox;
