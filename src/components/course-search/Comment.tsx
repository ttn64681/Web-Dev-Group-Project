'use client';
import React, { useState, useEffect } from 'react';

const Comment: React.FC = () => {
  return (
    <div className="bg-comment-bg-purple p-4 rounded-lg">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-neon-pink">Username</h3>
        </div>
        <h4 className="text-comment-text-white-pink">My opinion!</h4>
      </div>
    </div>
  );
};

export default Comment;
