'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LoveBtn from './LoveBtn';
import TrashBtn from './TrashBtn';
import { useRouter } from 'next/navigation';

type VideoPostUnitProps = {
  forumMode: boolean, 
  postId: string,
  courseId?: string,
  thumbnail?: string,
  likes: number,
  username: string,
  isLiked: boolean
}

const VideoPostUnit: React.FC<VideoPostUnitProps> = ({
  forumMode,
  postId,
  courseId,
  thumbnail, 
  likes, 
  username,
  isLiked
}
  : VideoPostUnitProps
) => {

  //Establishes router
  const router = useRouter();

  //Redirects to the forum
  const redirectToForum = () => {
    router.push(`/course-search/courseId/resources/${postId}`);
  };

  //Handles deletion of post and redirection when deleted
  const trashClick = async () => {

    //Deletes post information
    const deleteResponse = await fetch(`api/posts/${postId}`, {
    method: 'DELETE',
    });

    await deleteResponse.json();

    //Redirects back as trash btn should only be accessible on the forum side
    router.push(`/course-search/${courseId}/resources`)

  }

  const isUserPostOwner = () => {
    return true
  }

  return (
    <div>
      <button className="hover:scale-110 transition-transform duration-200" title="Video thumbnail">
        <Image
          title="Video thumbnail"
          src={thumbnail ? thumbnail : "https://picsum.photos/id/5/264/154"}
          alt={'Video thumbnail'}
          width={264}
          height={154}
          className="rounded-[10px]"
          onClick={forumMode ? () => {} : redirectToForum} //If on forum mode, button is unclickable
        />
      </button>
      {
        forumMode ? 
          <div className="flex justify-between">
            <div className="flex p-[10px] justify-between w-[100px]">
              <LoveBtn likes={likes} likedStatus={isLiked} postId={postId}/>
                {
                  isUserPostOwner() && <TrashBtn onclickFunc={trashClick}/> //Renders only if user is the post owner
                }
            </div>
            <div className="p-[10px] pr-[20px]">
              <h4 className="text-white">{username}</h4>
            </div>
          </div>
        : 
          <div className="flex justify-between">
            <div className="flex p-[10px] justify-between w-[100px]">
              <LoveBtn likes={likes} likedStatus={isLiked} postId={postId}/>
            </div>
            <div className="p-[10px] pr-[20px]">
              <h4 className="text-white">{username}</h4>
            </div>
          </div>
      }
    </div>
  );
};

export default VideoPostUnit;
