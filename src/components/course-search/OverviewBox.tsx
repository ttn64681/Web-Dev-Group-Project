'use client';
import React, { useState, useEffect } from 'react';
import TopicMinibox from './TopicMinibox';

const OverviewBox: React.FC = () => {
  return (
    <div className="bg-[#33203A] p-[15px] rounded-[12px]">
      <div className="flex m-[20px] items-center">
        <h3 className="text-[1.2em] text-[#F88AFF] mr-[20px] font-bold">Title:</h3>
        <h4 className="font-inter text-[#E2D0E6]">Course Title</h4>
      </div>
      <div className="flex m-[20px]">
        <h3 className="text-[1.2em] text-[#F88AFF] mr-[20px] font-bold">Topic:</h3>
        <div className="flex">
          <TopicMinibox />
          <TopicMinibox />
          <TopicMinibox />
        </div>
      </div>
      <div className="m-[20px]">
        <h3 className="text-[1.2em] text-[#F88AFF] mr-[20px] font-bold"> Description:</h3>
        <h4 className="font-inter text-[#E2D0E6]">description</h4>
      </div>
      <div className="m-[20px]">
        <h3 className="text-[1.2em] text-[#F88AFF] mr-[20px] font-bold"> Plan for Success:</h3>
        <h4 className="font-inter text-[#E2D0E6]">Success plan</h4>
      </div>
    </div>
  );
};

export default OverviewBox;
