'use client';
import React, { useState, useEffect } from 'react';
import VideoPostUnit from './VideoPostUnit';
import Comment from './Comment';
import { ArrowLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

const ResourceForum: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-form-bg-purple p-6 rounded-lg font-inter">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-sidebar-white-purple hover:text-neon-pink transition-colors duration-200 mb-6"
      >
        <ArrowLeft size={30} />
      </button>

      {/* Video Section */}
      <div className="flex gap-6 mb-2">
        <div className="flex flex-col">
          <VideoPostUnit />
        </div>
        <div className="flex-1">
          <h3 className="text-neon-pink text-xl mb-2">Video Title</h3>
          <h3 className="text-white">Video Description</h3>
        </div>
      </div>

      {/* Comment Input */}
      <div>
        <h3 className="text-neon-pink text-xl mb-2">Leave a Comment!</h3>
        <div className="flex flex-col items-end">
          <textarea
            placeholder="Place your comment here."
            className="w-full p-4 rounded-lg bg-form-pink bg-opacity-10 border border-form-pink-border text-white resize-none mb-4 placeholder:text-form-gray-purple"
            rows={3}
          ></textarea>
          <button className="text-md text-sidebar-white-purple hover:text-neon-pink transition-colors duration-200">
            Submit
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div>
        <h1 className="text-neon-pink text-xl mb-4">Comments</h1>
        <div className="space-y-4">
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default ResourceForum;
