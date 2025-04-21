'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LoveBtn from './LoveBtn';
import TrashBtn from './TrashBtn';
import { useRouter } from 'next/navigation';

type VideoPostUnitProps = {
    showTrash: boolean;
};

const VideoPostUnit: React.FC<VideoPostUnitProps> = ({showTrash}) => {
  const router = useRouter();
  const redirectToForum = () => {
    router.push('/course-search/courseId/resources/postId');
  };

  return (
    <div>
      <button className="hover:scale-110 transition-transform duration-200">
        <Image
          src={'https://picsum.photos/id/16/254/154'}
          alt={'Video thumbnail'}
          width={220}
          height={128}
          className="rounded-[10px]"
          onClick={redirectToForum}
        />
      </button>
      <div className="flex justify-between">
        <div className="flex gap-2 w-[100px]">
          <LoveBtn />
          {showTrash && <TrashBtn />}
        </div>
        <div className=" ">
          <h4 className="text-white">user123</h4>
        </div>
      </div>
    </div>
  );
};

export default VideoPostUnit;
