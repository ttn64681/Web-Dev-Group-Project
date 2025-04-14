'use client';

import CourseSearch from '@/components/CourseSearch';
import connectMongoDB from '../../../../../../config/mongodb';

export default function CourseSearchPage() {
  // TODO: Add page layout
  // TODO: Add styling
  // TODO: Add error boundary
  // TODO: Add loading states

  //Default pages 
  
  return (
    <div>
      <CourseSearch activeTab={"Resources"} courseId={""} isVideoSelected={true} />
    </div>
  );
}