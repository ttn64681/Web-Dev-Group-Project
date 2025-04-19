'use client';
import mongoose from 'mongoose';
import React, { useState, useEffect } from 'react';
import TopicMinibox from './TopicMinibox';

type OverviewBoxProps = {
  isCourseSelected: boolean;
  courseInfo?: {
    courseId: string;
    prefix: string;
    number: string;
    title: string;
    topics: string[];
    description: string;
    prerequisites: string[];
    plan: string;
    resourceUrls: Array<{
      url: string;
      description: string;
    }>;
    posts: mongoose.Types.ObjectId[]; // Reference to array of post object ids
    createdAt: Date; // for sorting/filtering purposes only
    updatedAt: Date; // for sorting/filtering purposes only
  }
}

const OverviewBox: React.FC = (
  isCourseSelected,
  courseInfo
) => {
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
        {
          isCourseSelected ?
            <div className="flex">
              {
                courseInfo.topics.map((topic: string) => {
                  <TopicMinibox key={topic} topicText={topic} />
                })
              }
            </div>
          :
            <div className="flex">
              <TopicMinibox topicText='Topic 1'/>
              <TopicMinibox topicText='Topic 2'/>
              <TopicMinibox topicText='Topic 3'/>
            </div>
        }
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
                courseInfo.plan.map((planPoint : string) => {
                  <h4 className="text-[#E2D0E6]">{planPoint}</h4>
                })
              }
            </div>
            :
            <div className="flex flex-col">
              <h4 className="text-[#E2D0E6]">Success plan point 1</h4>
              <h4 className="text-[#E2D0E6]">Success plan point 2</h4>
            </div>
        }
      </div>
    </div>
  );
};

export default OverviewBox;
