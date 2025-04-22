'use client';
import {useState, useEffect} from 'react';
import CourseSearch from '@/components/CourseSearch';
import connectMongoDB from '../../../../config/mongodb';
import { Course } from '@/dbInterface/dbOperations';

export default function CourseSearchPage() {
  // TODO: Add page layout
  // TODO: Add styling
  // TODO: Add error boundary
  // TODO: Add loading states

  const [currCourse, setCurrCourse] = useState< Course | undefined>(undefined)

  //URL PROCESSING
  useEffect(() => {

    const fetchCourseInfo = async () => {
      const currURL = new URL(window.location.href);
      const currURLpath = currURL.pathname;
      const objectId = currURLpath.substring(currURLpath.lastIndexOf('/') + 1);

      const response = await fetch(`api/courses/${objectId}`, {
        method: 'GET'
      }) 

      setCurrCourse(await response.json())
    }

    fetchCourseInfo();

  }, []);


  //Processes the component 
  return (
    <div>
      <CourseSearch activeTab="Overview" isCourseSelected={false} isPostSelected={false} courseInfo={currCourse}/>
    </div>
  );
}
