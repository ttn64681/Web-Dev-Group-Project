'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LoveBtn from './LoveBtn';
import TrashBtn from './TrashBtn';
import { useRouter } from 'next/navigation';

type VideoPostUnitProps = {
  forumMode: boolean, 
  thumbnail: string,
  likes: number,
  username: string,
  isLiked: boolean
}

const VideoPostUnit: React.FC<VideoPostUnitProps> = ({
  forumMode,
  thumbnail, 
  likes, 
  username,
  isLiked
}
  : VideoPostUnitProps
) => {
  const router = useRouter();

  const redirectToForum = () => {
    router.push('/course-search/courseId/resources/postId');
  };

  const trashClick = () => {
    //Deletes post information
    /*

    */

    /*
    */
  }

  return (
    <div>
      <button className="hover:scale-110 transition-transform duration-200">
        <Image
          src={thumbnail}
          alt={'Video thumbnail'}
          width={264}
          height={154}
          className="rounded-[10px]"
          onClick={redirectToForum}
        />
      </button>
      {
        forumMode ? 
          <div>
          </div>
        : 
        <div className="flex justify-between">
        <div className="flex p-[10px] justify-between w-[100px]">
          <LoveBtn likes={likes} likedStatus={isLiked}/>
          <TrashBtn onclickFunc={trashClick}/>
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
