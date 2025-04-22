'use client';
import mongoose from 'mongoose';
import React, { useState, useEffect } from 'react';
import TopicMinibox from './TopicMinibox';
import { Course } from '@/dbInterface/dbOperations';

type OverviewBoxProps = {
  isCourseSelected: boolean,
  courseInfo: Course
}

const OverviewBox: React.FC<OverviewBoxProps> = ({
  isCourseSelected,
  courseInfo
} : OverviewBoxProps) => {

  //topicArray declaration
  let topicArray = ['Topic 1', 'Topic 2', 'Topic 3'];
  if (courseInfo.topics) {
    topicArray = [];
    topicArray = courseInfo.topics.split(',');
  }


  return (
    <div className="bg-[#33203A] p-[20px] rounded-[20px]">
      {/*TITLE */}
      <div className="flex m-[20px]">
        <h3 className="text-[1.2em] text-[#F88AFF] mr-[20px]">Title:</h3>
        <h4 className="text-[#E2D0E6]">{isCourseSelected ? courseInfo.title : "Example title"}</h4>
      </div>

      {/* TOPICS */}
      <div className="flex m-[20px]">
        <h3 className="text-[1.2em] text-[#F88AFF] mr-[20px]">Topic:</h3>
          <div className="flex">
            {
              topicArray.map((topic: string) => {
                return <TopicMinibox key={topic} topicText={topic} />
              }) 
            }
          </div>
      </div>

      {/* DESCRIPTION */}
      <div className="m-[20px]">
        <h3 className="text-[1.2em] text-[#F88AFF] mr-[20px]"> Description:</h3>
        <h4 className="text-[#E2D0E6]"> {isCourseSelected ? courseInfo.description : "Example description"} </h4>
      </div>

      {/* SUCCESS PLAN */}
      <div className="m-[20px]">
        <h3 className="text-[1.2em] text-[#F88AFF] mr-[20px]"> Plan for Success:</h3>
        {
          isCourseSelected ?
            <div className="flex flex-col">
              {
                courseInfo.plan
              }
            </div>
            :
            <div className="flex flex-col">
              <h4 className="text-[#E2D0E6]">Success plan point 1</h4>
            </div>
        }
      </div>
    </div>
  );
};

export default OverviewBox;
