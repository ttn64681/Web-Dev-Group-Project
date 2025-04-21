import { NextRequest, NextResponse } from 'next/server';
import { fetchCoursePosts } from '@/dbInterface/dbOperations';

// GET /api/posts - Get all posts for a course to display in sidebar
// Frontend call example:
// GET /api/posts?courseId=123 - Get all posts for a specific course
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId') || '';

  try {
    const result = await fetchCoursePosts(courseId);
    if (!result.success) {
        return NextResponse.json({ 
          success: false, 
          error: result.error || 'Failed to fetch posts' 
        }, { status: 500 });
    }
    return NextResponse.json({ 
      success: true, 
      posts: result.posts 
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch posts' 
    }, { status: 500 });
  }
}
