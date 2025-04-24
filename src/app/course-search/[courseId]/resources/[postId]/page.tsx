'use client';
import { useState, useEffect } from 'react';
import CourseSearch from '@/components/CourseSearch';
import connectMongoDB from '../../../../../../config/mongodb';
import { Course } from '@/dbInterface/dbOperations';
import { Post } from '@/dbInterface/dbOperations';

export default function CourseSearchPage() {
  // TODO: Add page layout
  // TODO: Add styling
  // TODO: Add error boundary
  // TODO: Add loading states

  //Default pages
  const [currCourse, setCurrCourse] = useState<Course | undefined>(undefined);
  const [currPost, setCurrPost] = useState<Post | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //URL PROCESSING
  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get the courseId from the URL
        const currURL = new URL(window.location.href);
        const currURLpath = currURL.pathname;
        // Extract the courseId from the path (e.g., /course-search/CSCI-1301/resources)
        const pathParts = currURLpath.split('/');
        const courseId = pathParts[pathParts.indexOf('course-search') + 1];

        console.log('Fetching course with ID:', courseId);

        // Fetch the course using the courseId
        const response = await fetch(`/api/courses?courseId=${encodeURIComponent(courseId)}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch course: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch course information');
        }

        console.log('Course data received:', data.course);
        setCurrCourse(data.course);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPostInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get the postId from the URL
        const currURL = new URL(window.location.href);
        const currURLpath = currURL.pathname;
        // Extract the postId from the path (e.g., /course-search/CSCI-1301/resources)
        const pathParts = currURLpath.split('/');
        const postId = pathParts[pathParts.indexOf('resources') + 1];

        console.log('Fetching post with ID:', postId);

        // Fetch the course using the postId
        const response = await fetch(`/api/posts/${encodeURIComponent(postId)}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch post information');
        }

        console.log('Post data received:', data.post);
        setCurrPost(data.post);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseInfo();
    fetchPostInfo();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className="text-[#6CFEFE] text-xl">Loading course information...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className="text-[#F88AFF] text-xl">Error: {error}</div>
        </div>
      ) : (
        <CourseSearch
          activeTab="Resources"
          isCourseSelected={!!currCourse}
          isPostSelected={true}
          courseInfo={currCourse}
          postInfo={currPost}
        />
      )}
    </div>
  );
}
