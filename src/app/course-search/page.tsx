'use client';

import CourseSearch from '@/components/CourseSearch';

export default function CourseSearchPage() {

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <CourseSearch activeTab="Overview" isCourseSelected={false} isPostSelected={false} />
    </div>
  );
}
