'use client';
import { useState, useEffect } from 'react';
import CourseSearchArea from './course-search/CourseSearchArea';
import OverviewBox from './course-search/OverviewBox';
import ResourcesBox from './course-search/ResourcesBox';
import Sidebar from './course-search/Sidebar';
import { MagnifyingGlass, FileText } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import ResourceForum from './course-search/ResourceForum';

type CourseSearchProps = {
  activeTab: string;
  courseId: string;
  isVideoSelected: boolean;
};

const CourseSearch: React.FC<CourseSearchProps> = ({
  activeTab,
  courseId,
  isVideoSelected,
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
    courseNum: 0,
    courseName: '',
  });

  const [courseData, setCourseData] = useState({
    title: '-',
    topics: '-',
    description: '-',
    successPlan: '-',
  });

  const showOverview = () => {
    router.push('/course-search/courseId/');
  };
  const showResources = () => {
    router.push('/course-search/courseId/resources/');
  };

  //COMPONENT MATERIALS ============================================

  return (
    <div className="flex min-h-screen">
      {/*SIDEBAR*/}
      <div className="h-screen sticky top-0">
        <Sidebar />
      </div>

      <div className="w-3/5 mx-auto h-full pb-10">
        {/*TITLE*/}
        {activeTab == "Overview" ? 
          (
            <div className="flex justify-center items-center mt-[50px] mb-[30px]">
              <MagnifyingGlass
                // size={50}
                color="#6CFEFE"
                className="w-14 h-14 sm:w-16 sm:h-16 ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(108,254,254,1)]"
              />
              <h2 className="font-dongle text-6xl sm:text-7xl text-[#6CFEFE] ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(108,254,254,1)]">
                Course Search
              </h2>
            </div>
          ):(
            <div className="flex justify-center items-start mt-[50px] mb-[30px]">
              <FileText
                // size={56}
                color="#F09A35"
                className="w-14 h-14 sm:w-16 sm:h-16 ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(240,154,53,1)]"
              />
              <h2 className="font-dongle text-6xl sm:text-7xl text-[#F09A35] ml-[10px] mr-[10px] drop-shadow-[0_0_10px_rgba(240,154,53,1)]">
                Resources
              </h2>
            </div>
          )
        }

        {isVideoSelected ? (
          /* RESOURCE FORUM - Shows if video is selected*/
          <ResourceForum />
        ) : (
          /* SEARCH AREA - Shows if video is not selected and on search mode*/
          <div>
            <h4 className="font-nunito text-[#D163D7] text-sm sm:text-base m-[10px]">
              Enter the 4 letter prefix, 4 digit number, and course name.
            </h4>
            <div className="mt-[10px] mb-[10px]">
              <CourseSearchArea />
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
                className={`m-[10px] p-[5px] pl-[15px] pr-[15px] ${activeTab === 'Resources' ? 'bg-[#301936] text-[#F88AFF] border-[#F88AFF]' : 'text-white border-white'} hover:scale-110 transition-transform duration-200 border-[2px] rounded-[12px] inline`}
              >
                Resources
              </button>
            </div>

            {/* TODO: Add course overview content and resources*/}
            <div className="mt-[10px]">
              {activeTab == 'Overview' ? <OverviewBox /> : <ResourcesBox />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSearch;
