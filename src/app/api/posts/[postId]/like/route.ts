import { NextRequest, NextResponse } from 'next/server';
import { likePost } from '@/dbInterface/dbOperations';
import { auth } from '../../../../../../auth';

/** POST /api/posts/[postId]/like - Used to like a post
 * Frontend call example:
 * fetch('/api/posts/PostObjectId/like', {
 *   method: 'PUT',
 * })
 */
export async function PUT(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    // Get the authenticated user's session
    const session = await auth();
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const result = await likePost(params.postId, userId);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to like post',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Post liked successfully',
    });
  } catch (error) {
    console.error('Error liking post:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to like post',
      },
      { status: 500 }
    );
  }
}
