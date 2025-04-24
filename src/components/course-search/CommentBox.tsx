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

  const[usernameString, setUsernameString] = useState('')

  useEffect(() => {
    const getUsername = async() => {
      try {
        console.log(username)
        const response = await fetch(`/api/users/${username}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const userData = await response.json();

        setUsernameString(userData.username); // Adjust based on what data you return
      } catch (error) {
        console.error("Error loading user:", error);
      }
    }

    getUsername();

  });


  return (
    <div className="bg-comment-bg-purple p-4 rounded-lg">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-neon-pink">{usernameString}</h3>
        </div>
        <h4 className="text-comment-text-white-pink">{commentText}</h4>
      </div>
    </div>
  );
};

export default CommentBox;
