<<<<<<< HEAD
"use client";
import { useState, useEffect } from "react";
import CourseSearchArea from "./courseSearchComponents/CourseSearchArea";
import OverviewBox from "./courseSearchComponents/OverviewBox";
import ResourcesBox from "./courseSearchComponents/ResourcesBox";
import Sidebar from "./courseSearchComponents/Sidebar";
import { MagnifyingGlass } from "@phosphor-icons/react";
=======
'use client';
>>>>>>> 7d21621639288732e2c9bd66af32447f64896754

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

  //STATE MANAGEMENT ==============================================
  const [courseSearchData, setCourseSearchData] = useState({
    prefix: "-",
    courseNum: 0,
    courseName: "",
  });

  const [activeTab, setActiveTab] = useState('Overview');

  const [courseData, setCourseData] = useState({
    title: "-",
    topics: [],
    description: "-",
    successPlan: "-",
  });

  const [prevCourses, setPrevCourses] = useState([]);

  const showOverview = () => {
    setActiveTab('Overview');
  }
  const showResources = () => {
    setActiveTab('Resources');
  }

  //COMPONENT MATERIALS ============================================

  return (
    <div className="flex">
      {/*SIDEBAR*/}
      <div className="h-screen">
        <Sidebar />
      </div>

      <div className="w-3/5 ml-auto mr-auto">
        {/*TITLE*/}
        <div className="flex justify-center items-center mt-[50px] mb-[30px]">
          <MagnifyingGlass size={64} color="#6CFEFE" className="ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(108,254,254,1)]"/>
          <h2 className="text-[3em] text-[#6CFEFE] ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(108,254,254,1)]" >Course Search</h2>
        </div>

        {/* SEARCH AREA */}
        <h4 className="text-[#D163D7] m-[10px]">Enter the 4 letter prefix, 4 digit number, and course name.</h4>

        <div className="mt-[10px] mb-[10px]">
          <CourseSearchArea />
        </div>

        {/* TABS*/}
        <div className="">
          <button onClick={showOverview} className="m-[10px] p-[5px] pl-[15px] pr-[15px] text-white border border-[3px] border-white rounded-[10px] inline">
            Overview
          </button>
          <button onClick={showResources} className="m-[10px] p-[5px] pl-[15px] pr-[15px] text-white border border-[3px] border-white rounded-[10px] inline">
            Resources
          </button> 
        </div>

        {/* TODO: Add course overview content and resources*/}
        <div className="mt-[10px]">
          {activeTab == 'Overview' ? <OverviewBox /> : <ResourcesBox />}
        </div>

      </div>
    </div>
  );
};

export default CourseSearch;
