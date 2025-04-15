'use client';

import CourseSearch from '@/components/CourseSearch';

export default function CourseSearchPage() {
  // TODO: Add page layout
  // TODO: Add styling
  // TODO: Add error boundary
  // TODO: Add loading states

  //Default pages

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <CourseSearch activeTab="Overview" courseId="" isVideoSelected={false} />
    </div>
  );
}
