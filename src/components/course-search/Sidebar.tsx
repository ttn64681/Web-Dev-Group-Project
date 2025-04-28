'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from '@phosphor-icons/react';
import { ArrowRight } from '@phosphor-icons/react';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Course } from '@/dbInterface/dbOperations';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const [openStatus, setOpenStatus] = useState<Boolean>(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [prefixSearchData, setPrefixSearchData] = useState<string>('');

  const toggleOpen = () => {
    setOpenStatus(!openStatus);
    console.log('toggled');
  };

  //Continuously collects search data
  const updateSearchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrefixSearchData(e.target.value);
  };

  //Submits info when a sufficient prefix is found
  const submitInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const cleanedPrefix = prefixSearchData.toUpperCase().trim().replace(' ', '');
    if (cleanedPrefix.length == 4) {
      //Gets data for a specific prefix
      const response = await fetch(`/api/courses/?prefix=${cleanedPrefix}`, {
        method: 'GET',
      });

      console.log(response);
      //Updates accordingly
      const courseData = await response.json();
      setCourses(courseData.courses);
    } else if (cleanedPrefix.length == 0) {
      alert('Please enter a valid prefix');
      return;
    }
  };

  //Redirects to appropriateCourse
  const courseRedirect = (e: React.MouseEvent<HTMLElement>) => {
    const courseId = e.currentTarget.id;
    router.push(`/course-search/${courseId}`);
  };

  //Fetches initial courses.
  useEffect(() => {
    const fetchInitialCourses = async () => {
      //Gets all courses
      const response = await fetch(`/api/courses`, {
        method: 'GET',
      });

      //Updates accordingly
      const courseData = await response.json();
      setCourses(courseData.courses);
    };

    fetchInitialCourses();
  }, []);

  return (
    <div className={`flex h-full transition-transform duration-300 ease-in-out -z-10`}>
      {/*Sidebar Contents*/}
      <div className={`bg-[#28162F] pl-[25px] pr-[25px] h-full min-w-[390px] max-w-[500px] ${openStatus ? 'block' : 'hidden'}`}>
        <div className="flex flex-row pt-[20px] align-items">
          <h3 className="font-nunito text-[#B590C4] text-[18px] mr-[20px]">Existing Classes: </h3>
          <div className="flex">
            <input
              type="text"
              name="courseName"
              placeholder="Course Prefix"
              className="h-10 p-[5px] min-w-[150px] max-w-full bg-[#33203A] border-[2px] border-[#6CFEFE] rounded-l-[10px] text-white placeholder-opacity-40"
              onChange={updateSearchData}
              required
            />
            <button
              className="h-10 p-[5px] px-[8px] bg-[#33203A] border-[2px] border-l-0 border-[#6CFEFE] rounded-r-[10px]"
              aria-label="Search course"
              onClick={submitInfo}
            >
              <MagnifyingGlass size={24} className="align-middle" color="white" />
            </button>
          </div>
        </div>
        <hr className="my-[20px] sidebar-white-purple"></hr>
        <div className="overflow-y-auto h-[calc(100%-100px)]">
          {courses.map((course) => (
            <h3
              id={course.courseId}
              key={course._id}
              className="text-[#B590C4] transition-all duration-100 hover:cursor-pointer pt-[10px] pb-[10px] pl-[5px] pr-[5px] opacity-100 hover:text-white hover:bg-opacity-[3%] hover:bg-white rounded-[10px]"
              onClick={courseRedirect}
            >
              {course.title}
            </h3>
          ))}
        </div>
      </div>

      {/*Tab-in and out button*/}
      <div>
        <button
          onClick={toggleOpen}
          className={`bg-[#28162F] mt-[10px] pt-[40px] pb-[40px] pl-[10px] pr-[10px] rounded-r-[5px] border border-[#F88AFF] transition-transform duration-200 hover:text-white hover:bg-[#33203A] hover:border-white/90`}
        >
          {openStatus ? (
            <ArrowLeft size={16} className="hover:text-white" color="#F88AFF" />
          ) : (
            <ArrowRight size={16} color="#F88AFF" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
