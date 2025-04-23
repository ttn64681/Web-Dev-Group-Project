'use client';
import React, { useState, useEffect } from 'react';
import VideoPostUnit from './VideoPostUnit';
import CommentBox from './CommentBox';
import { Comment, Post } from '@/dbInterface/dbOperations';
import { ArrowLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'

type ResourceBoxProps = {
  postInfo: Post
}

const ResourceForum: React.FC<ResourceBoxProps> = ({
  postInfo
}: ResourceBoxProps) => {
  //Comment state
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>(postInfo.comments || []);
  const [userId, setUserId] = useState<String>('');
  const [liked, setLiked] = useState<boolean>(false);
  const [courseId, setCourseId] = useState<string>('');

  //Sets up the router
  const router = useRouter();

  //Sets up session
  const {data: session, status} = useSession();

  //Handles adding comment into forum
  const addComment = async() => {

    const userId = session?.user?.id;

    if (commentText.length === 0 || !postInfo._id) return;

    //Adds comment locally
    const newComment: Comment = {
      user: userId, //GET USER
      comment: commentText,
      // you can add date but i want to throw up rn
      // bruh its okay we wont add it rn
    };
    
    setComments([...comments, newComment]);
    setCommentText('');

    try {
      //Updates globally
      const response = await fetch(`/api/posts/${postInfo._id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
    } catch (error) {
      // Revert the local comment if the API call fails
      setComments(comments);
      console.error('Error adding comment:', error);
    }
  }

  //Handles change of comment text
  const commentTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  }

  /*
    Checks if a user has liked before
  */
  const checkHasLikedBefore = (likeArray: string[]) => {

      //User ID check
      const userId = session?.user?.id
  
      //If user is not authenticated, it is false for them and they cannot like.
      if (!userId) {
        return false;
      }

      //likeArray should be an array of ObjectId[]
      for (let i = 0; i < likeArray.length; i++) {
        const stringifiedId = likeArray[i].toString();

        if (userId == stringifiedId) {
          return true
        }
      }
      
      return false;

  }

  const extractCourseId = () => {
      // Get the courseId from the URL
      const currURL = new URL(window.location.href);
      const currURLpath = currURL.pathname;
      // Extract the courseId from the path (e.g., /course-search/CSCI-1301/resources)
      const pathParts = currURLpath.split('/');
      const extractedCourseId = pathParts[pathParts.indexOf('course-search') + 1];

      setCourseId(extractedCourseId);
  }

  useEffect(() => {
    const result = checkHasLikedBefore(postInfo.likes);
    setLiked(result);
    extractCourseId();
  }, []);

  return (
    <div className="bg-form-bg-purple p-6 rounded-lg font-inter">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-sidebar-white-purple hover:text-neon-pink transition-colors duration-200 mb-6"
        aria-label="Go back"
      >
        <ArrowLeft size={30} />
      </button>

      {/* Video Section */}
      <div className="flex gap-6 mb-2">
        <div className="flex flex-col">
          <VideoPostUnit 
            forumMode={true} 
            postId={postInfo._id || ''}
            courseId={courseId}
            thumbnail={postInfo.thumbnail}
            likes={postInfo.likes?.length || 0}
            username={postInfo.user}
            isLiked={liked} // This should be determined by checking if current user's ID is in postInfo.likes
          />
        </div>
        <div className="flex-1">
          <h3 className="text-neon-pink text-xl mb-2">{postInfo.title}</h3>
          <h3 className="text-white">{postInfo.description}</h3>
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
            value={commentText}
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
          {comments.map((comment, index) => (
            <CommentBox 
              key={index} 
              username={comment.user._id} 
              commentText={comment.comment} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceForum;
