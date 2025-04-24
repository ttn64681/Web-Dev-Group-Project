'use client';
import mongoose from 'mongoose';
import { useState, useEffect } from 'react';
import CourseSearchArea from './course-search/CourseSearchArea';
import OverviewBox from './course-search/OverviewBox';
import ResourcesBox from './course-search/ResourcesBox';
import Sidebar from './course-search/Sidebar';
import { MagnifyingGlass, FileText } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import ResourceForum from './course-search/ResourceForum';
import { Course } from '@/dbInterface/dbOperations';
import { Post } from '@/dbInterface/dbOperations';

type CourseSearchProps = {
  activeTab: string;
  isCourseSelected: boolean;
  isPostSelected: boolean;
  courseInfo?: Course;
  postInfo?: Post;
};

const CourseSearch: React.FC<CourseSearchProps> = ({
  activeTab,  
  isCourseSelected,
  isPostSelected,
  courseInfo,
  postInfo
}: CourseSearchProps) => {
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

  //ROUTER==========================================================

  const router = useRouter();

  //STATE MANAGEMENT ==============================================

  const [courseSearchData, setCourseSearchData] = useState({
    prefix: '-',
    courseNum: '',
    courseName: '',
  });

  const [courseJSON, setcourseJSON] = useState({
    title: '-',
    topics: '-',
    description: '-',
    successPlan: '-',
  });

  const showOverview = () => {
    if (courseInfo) {
      router.push(`/course-search/${courseInfo.courseId}`);
    } else {
      router.push('/course-search');
    }
  };
  
  const showResources = () => {
    if (courseInfo) {
      router.push(`/course-search/${courseInfo.courseId}/resources`);
    }
  };


  //Course submission 
  async function submitInfo(e: React.MouseEvent<HTMLButtonElement>) {
    //Prevents default behavior
    e.preventDefault();

    //Checks if valid information is filled out
    if (courseSearchData.prefix.length === 4 && courseSearchData.courseNum.length === 4 && courseSearchData.courseName.length > 0) {
      try {
        //Retrieves course JSON information from prefix, courseNum, and courseName provided
        const courseData = await getSearchInfo(courseSearchData.prefix, courseSearchData.courseNum, courseSearchData.courseName);
        
        if (courseData) {
          // Update the courseInfo state with the fetched data
          setcourseJSON({
            title: courseData.title || '-',
            topics: courseData.topics || '-',
            description: courseData.description || '-',
            successPlan: Array.isArray(courseData.plan) ? courseData.plan.join(', ') : '-',
          });
          
          //Retrieves course id (CS1301) and pushes to the course page
          router.push(`/course-search/${courseData.courseId}`);
        }
      } catch (error) {
        console.error("Error submitting course search:", error);

      }
    } else {
      console.log("Invalid input data:", courseSearchData);

    }
  }

  async function getSearchInfo(prefix: string, courseNum: string, title: string) {
    try {
      //Fetches information
      const response = await fetch(`/api/courses?prefix=${encodeURIComponent(prefix)}&number=${encodeURIComponent(courseNum)}&title=${encodeURIComponent(title)}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Course search response:", data);
      
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch course information");
      }
      
      return data.course;
    } catch (error) {
      console.error("Error fetching course:", error);
      // Return a default course object or throw the error
      throw error;
    }
  }

  //Updates search info when input is placed into the form
  const updateSearchInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  //COMPONENT MATERIALS ============================================

  return (
    <div className="flex min-h-screen">
      {/*SIDEBAR*/}
      <div className="h-screen sticky top-0">
        <Sidebar />
      </div>

      <div className="w-full md:w-3/5 mr-[30px] md:mx-auto h-full pb-10">
        {/*TITLE*/}
        {activeTab == "Overview" ? 
          (
            <div className="flex gap-2 md:gap-0 justify-center items-center mt-[50px] mb-[30px]">
              <MagnifyingGlass
                size={64}
                color="#6CFEFE"
                className="w-12 h-12 md:w-16 md:h-16 md:mx-[10px] drop-shadow-[0_0_10px_rgba(108,254,254,1)]"
              />
              <h2 className="font-dongle text-6xl md:text-7xl text-[#6CFEFE] md:mx-[10px] drop-shadow-[0_0_10px_rgba(108,254,254,1)]">
                Course Search
              </h2>
            </div>
          ):(
            <div className="flex justify-center items-start mt-[50px] mb-[30px]">
              <FileText
                size={64}
                color="#F09A35"
                className="w-14 h-14 md:w-16 md:h-16 ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(240,154,53,1)]"
              />
              <h2 className="font-dongle text-6xl md:text-7xl text-[#F09A35] ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(240,154,53,1)] ">
                Resources
              </h2>
            </div>
          )
        }

        {isPostSelected ? (
          /* RESOURCE FORUM - Shows if user has selected a post*/
          postInfo && <ResourceForum postInfo={postInfo}/>
        ) : (
          /* SEARCH AREA - Shows if user has not selected a post and on search mode*/
          <div>
            <h4 className="font-nunito text-[#D163D7] text-sm sm:text-base m-[10px]">
              Enter the 4 letter prefix, 4 digit number, and course name.
            </h4>
            <div className="mt-[10px] mb-[10px]">
              <CourseSearchArea submitFunc={submitInfo} editFunc={updateSearchInfo}/>
            </div>

            {/* TABS*/}
            <div className="">
              <button
                onClick={showOverview}
                className={`m-[10px] p-[5px] px-[15px] ${activeTab === 'Overview' ? 'bg-[#301936] text-[#F88AFF] border-[#F88AFF]' : 'text-white border-white'} hover:scale-110 transition-transform duration-200 border-[2px] rounded-[12px] inline`}
              >
                Overview
              </button>
              <button
                onClick={showResources}
                className={`m-[10px] p-[5px] pl-[15px] pr-[15px] ${activeTab === 'Resources' ? 'bg-[#301936] text-[#F88AFF] border-[#F88AFF]' : 'text-white border-white'} hover:scale-110 transition-transform duration-200 border-[2px] rounded-[12px] inline ${isCourseSelected ? "opacity-100" : "opacity-25" }`}
              >
                Resources
              </button>
            </div>

            {/* OVERVIEW OR RESOURCES BOX*/}
            <div className="mt-[10px]">
              {activeTab == 'Overview' ? <OverviewBox isCourseSelected={isCourseSelected} courseInfo={courseInfo} /> : <ResourcesBox isCourseSelected={isCourseSelected} courseInfo={courseInfo}/>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSearch;
