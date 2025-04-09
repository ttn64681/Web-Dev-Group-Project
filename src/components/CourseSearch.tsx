"use client";
import { useState, useEffect } from "react";
import CourseSearchArea from "./courseSearchComponents/CourseSearchArea";
import OverviewBox from "./courseSearchComponents/OverviewBox";
import ResourcesBox from "./courseSearchComponents/ResourcesBox";
import { MagnifyingGlass } from "@phosphor-icons/react";

const CourseSearch: React.FC = () => {
  // TODO: Add state management for:
  // - Course search inputs
  // - Active tab
  // - Course data
  // - Previous courses
  // - Loading state
  // - Error state

  // TODO: Implement course search logic
  // TODO: Implement OpenAI API integration
  // TODO: Implement MongoDB integration

  //STATE MANAGEMENT
  const [courseSearchData, setCourseSearchData] = useState({
    prefix: "-",
    courseNum: 0,
    courseName: "",
  });

  const [activeTab, setActiveTab] = useState();

  const [courseData, setCourseData] = useState({
    title: "-",
    topics: [],
    description: "-",
    successPlan: "-",
  });

  return (
    <div className="w-3/5 m-auto">
      {/*TITLE*/}
      <div className="flex justify-center items-center">
        <MagnifyingGlass size={64} color="#6CFEFE" className="ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(108,254,254,1)]"/>
        <h2 className="text-[3em] text-[#6CFEFE] ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(108,254,254,1)]" >Course Search</h2>
      </div>

      {/* SEARCH AREA */}
      <h4 className="text-[#D163D7] m-[10px]">Enter the 4 letter prefix, 4 digit number, and course name.</h4>
      <CourseSearchArea />

      {/* TODO: Add tabs */}
      <div className="">
        <button className="m-[10px] p-[5px] pl-[15px] pr-[15px] text-white border border-[3px] border-white rounded-[10px] inline">
          Overview
        </button>
        <button className="m-[10px] p-[5px] pl-[15px] pr-[15px] text-white border border-[3px] border-white rounded-[10px] inline">
          Resources
        </button> 
      </div>

      {/* TODO: Add course overview content */}
      <div>
        <OverviewBox />
      </div>

      {/* TODO: Add resources content */}
      <div>
        <ResourcesBox />
      </div>

      {/* TODO: Add sidebar */}
      <div>
        <h3>Previous Courses</h3>
        {/* Previous/existing courses list will go here */}
      </div>
    </div>
  );
};

export default CourseSearch;
