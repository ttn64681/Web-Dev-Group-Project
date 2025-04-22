'use client';
import React, { useState, useEffect } from 'react';
import LinkUnit from './LinkUnit';
import VideoPostUnit from './VideoPostUnit';

const ResourcesBox: React.FC = () => {
  return (
    <div>
      <div className="pt-[20px] pb-[30px] px-[40px]">
        <h3 className="text-[#F88AFF] font-bold text-[1.2em]">A.I. Top-5 Recommended:</h3>
        <div>
          <LinkUnit />
          <LinkUnit />
          <LinkUnit />
        </div>
      </div>
      <div className="bg-[#33203A] p-[15px] rounded-[12px]">
        <h3 className="text-white p-[20px] font-bold text-[1.2em]">Student Top Recommended:</h3>
        <div className="flex flex-wrap justify-between px-[20px]">
          <VideoPostUnit showTrash={false}/>
          <VideoPostUnit showTrash={false}/>
          <VideoPostUnit showTrash={false}/>
        </div>
      </div>
    </div>
  );
};

export default ResourcesBox;
