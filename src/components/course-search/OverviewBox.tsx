'use client';
import mongoose from 'mongoose';
import React, { useState, useEffect } from 'react';
import TopicMinibox from './TopicMinibox';
import { Course } from '@/dbInterface/dbOperations';

type OverviewBoxProps = {
  isCourseSelected: boolean,
  courseInfo?: Course
}

const OverviewBox: React.FC<OverviewBoxProps> = ({
  isCourseSelected,
  courseInfo
} : OverviewBoxProps) => {

  //topicArray declaration
  let topicArray: string[] = ['Topic 1', 'Topic 2', 'Topic 3'];
  
  if (courseInfo?.topics) {
    // Ensure topics is treated as an array
    topicArray = Array.isArray(courseInfo.topics) 
      ? courseInfo.topics 
      : [courseInfo.topics];
  }

  return (
    <div className="bg-[#33203A] p-[20px] rounded-[20px]">
      {/*TITLE */}
      <div className="flex m-[20px]">
        <h3 className="text-[1.2em] text-[#F88AFF] mr-[20px]">Title:</h3>
        <h4 className="text-[#E2D0E6]">{isCourseSelected && courseInfo ? courseInfo.title : "Example title"}</h4>
      </div>

      {/* TOPICS */}
      <div className="flex m-[20px]">
        <h3 className="text-[1.2em] text-[#F88AFF] mr-[20px]">Topics:</h3>
        <div className="flex flex-wrap">
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
        <h4 className="text-[#E2D0E6]"> {isCourseSelected && courseInfo ? courseInfo.description : "Example description"} </h4>
      </div>

      {/* SUCCESS PLAN */}
      <div className="m-[20px]">
        <h3 className="text-[1.2em] text-[#F88AFF] mr-[20px]"> Plan for Success:</h3>
        {
          isCourseSelected && courseInfo ?
            <div className="flex flex-col">
              { // map plan and display each item as a list item
                courseInfo.plan && Array.isArray(courseInfo.plan) 
                  ? courseInfo.plan.map((item: string, index: number) => (
                      <h4 key={index} className="text-[#E2D0E6]">{item}</h4>
                    ))
                  : <h4 className="text-[#E2D0E6]">No success plan available</h4>
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
