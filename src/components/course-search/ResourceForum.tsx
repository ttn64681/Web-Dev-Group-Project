'use client';
import React, { useState, useEffect } from 'react';
import VideoPostUnit from './VideoPostUnit';
import CommentBox from './CommentBox';
import { Comment } from '@/dbInterface/dbOperations';
import { ArrowLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { Post } from '@/dbInterface/dbOperations';

type ResourceBoxProps = {
  postInfo: Post
}

const ResourceForum: React.FC<ResourceBoxProps> = ({
  postInfo
}: ResourceBoxProps) => {

  //Commment state
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>(postInfo.comments);

  //Sets up the router
  const router = useRouter();

  //Handles adding comment into forum
  const addComment = async() => {

    //Adds comment locally
    if (commentText.length != 0) {
      setComments(
        [...comments, {
          user: 'User', //GET USER
          comment: commentText,
          //You can add date maybe but i want to throw up rn
        }]
      );
    }

    //Updates globally
    await fetch(`/api/posts/${postInfo._id.$oid}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment: commentText
      })
    })


  }

  //Handles change of comment text
  const commentTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  }

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
          <VideoPostUnit forumMode={true} postId={"1"} thumbnail="https://picsum.photos/id/5/264/154" likes={1} username="person1" isLiked={true} />
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
            name="comment"
            onChange={commentTextChange}
          ></textarea>
          <button 
            className="text-md text-sidebar-white-purple hover:text-neon-pink transition-colors duration-200" 
            onClick={addComment}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div>
        <h1 className="text-neon-pink text-xl mb-4">Comments</h1>
        <div className="space-y-4">
          {
            //Ensure comments must exist
            comments && 
            
            //Maps all the existing comments
            comments.map((comment) => {
              return <CommentBox username={comment.user} commentText={comment.comment} />
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ResourceForum;
