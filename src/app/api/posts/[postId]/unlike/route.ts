import { NextRequest, NextResponse } from 'next/server';
import { unlikePost } from '@/dbInterface/dbOperations';
import { auth } from '../../../../../../auth';

// the unlike should be a post or put request
// should it be put or post?


/** POST /api/posts/[postId]/unlike - Used to unlike a post
 * Frontend call example:
 * fetch('/api/posts/${postId}/unlike', {
 *   method: 'DELETE'
 * })
 */
export async function DELETE(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    // Get the authenticated user's session
    const session = await auth();
    const userId = session?.user?.id;
    
    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 });
    }

    const result = await unlikePost(params.postId, userId);

    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: result.error || 'Failed to unlike post' 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Post unliked successfully'
    });
  } catch (error) {
    console.error('Error unliking post:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to unlike post' 
    }, { status: 500 });
  }
}
