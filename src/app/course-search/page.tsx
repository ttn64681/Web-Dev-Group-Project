'use client';

import CourseSearch from '@/components/CourseSearch';
import connectMongoDB from '../../../config/mongodb';

export default function CourseSearchPage() {
  // TODO: Add page layout
  // TODO: Add styling
  // TODO: Add error boundary
  // TODO: Add loading states
  connectMongoDB();

  return (
    <div>
      <CourseSearch />
    </div>
  );
}
