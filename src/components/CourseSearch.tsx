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
  isVideoSelected: boolean;
  courseInfo?: Course;
  postInfo?: Post;
};

const CourseSearch: React.FC<CourseSearchProps> = ({
  activeTab,  
  isCourseSelected,
  isVideoSelected,
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
    router.push('/course-search/courseId/');
  };
  const showResources = () => {
    if (isCourseSelected) {
      router.push('/course-search/courseId/resources/'); 
    }
  };


  //Course submission 
  async function submitInfo(e: React.MouseEvent<HTMLButtonElement>) {

    //Prevents default behavior
    e.preventDefault();

    //Checks if valid information is filled out
    if (courseSearchData.prefix.length == 4 && courseSearchData.courseNum.length == 4 && courseSearchData.courseName.length != 0) {

      //Retrieves course JSON information from prefix, courseNum, and courseName provided
      const courseJSON = await getSearchInfo(courseSearchData.prefix, courseSearchData.courseNum, courseSearchData.courseName);
      
      //Retrieves id and pushes 
      router.push(`course-search/${courseJSON._id}`);

    }
  }

  async function getSearchInfo(prefix: string, courseNum: string, title: string) {

    //Fetches information
    const response = 
    await fetch(`/api/courses?prefix=${prefix}&number=${courseNum}&title=${title}`, {
      method: 'GET'
    });

    await response.json();

    return response.json()

  }


  //Updates search info when input is placed into the form
  const updateSearchInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseSearchData(
      {
        ...courseSearchData,
        [e.target.name]: e.target.value 
      }        
    );
  }

  //COMPONENT MATERIALS ============================================

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/*SIDEBAR*/}
      <div className="h-full sticky top-0">
        <Sidebar />
      </div>

      <div className="w-3/5 ml-auto mr-auto h-full pb-10">
        {/*TITLE*/}
        {activeTab == 'Overview' ? (
          <div className="flex justify-center items-center mt-[50px] mb-[30px]">
            <MagnifyingGlass
              size={64}
              color="#6CFEFE"
              className="ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(108,254,254,1)]"
            />
            <h2 className="text-[3em] text-[#6CFEFE] ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(108,254,254,1)]">
              Course Search
            </h2>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-[50px] mb-[30px]">
            <FileText
              size={64}
              color="#F09A35"
              className="ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(240,154,53,1)]"
            />
            <h2 className="text-[3em] text-[#F09A35] ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(240,154,53,1)]">
              Resources
            </h2>
          </div>
        )}

        {isVideoSelected ? (
          /* RESOURCE FORUM - Shows if video is selected*/
          postInfo && <ResourceForum postInfo={postInfo}/>
        ) : (
          //Ensures courseInfo must exist
          courseInfo &&

          /* SEARCH AREA - Shows if video is not selected and on search mode*/

          <div>
            <h4 className="text-[#D163D7] m-[10px]">
              Enter the 4 letter prefix, 4 digit number, and course name.
            </h4>
            <div className="mt-[10px] mb-[10px]">
              <CourseSearchArea submitFunc={submitInfo} editFunc={updateSearchInfo}/>
            </div>

            {/* TABS*/}
            <div className="">
              <button
                onClick={showOverview}
                className={`m-[10px] p-[5px] pl-[15px] pr-[15px] ${activeTab === 'Overview' ? 'bg-[#301936] text-[#F88AFF] border-[#F88AFF]' : 'text-white border-white'} hover:scale-110 transition-transform duration-200 border border-[2px] rounded-[10px] inline`}
              >
                Overview
              </button>
              <button
                onClick={showResources}
                className={`m-[10px] p-[5px] pl-[15px] pr-[15px] ${activeTab === 'Resources' ? 'bg-[#301936] text-[#F88AFF] border-[#F88AFF]' : 'text-white border-white'} ${isCourseSelected ? "opacity-100" : "opacity-25"} hover:scale-110 transition-transform duration-200 border border-[2px] rounded-[10px] inline`}
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
