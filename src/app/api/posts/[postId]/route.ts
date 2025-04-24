import { NextRequest, NextResponse } from 'next/server';
import { fetchCoursePost } from '@/dbInterface/dbOperations';

/** GET /api/posts/[postId] - Get a specific post by ID
 * Frontend call example:
 * fetch('/api/posts/PostObjectId')
 */
export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const result = await fetchCoursePost(params.postId);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to fetch post',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post: result.post,
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch post',
      },
      { status: 500 }
    );
  }
}
