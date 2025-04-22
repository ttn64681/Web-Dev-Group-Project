import { NextRequest, NextResponse } from 'next/server';
import { addComment } from '@/dbInterface/dbOperations';
import { auth } from '../../../../../../auth';

/** POST /api/posts/[postId]/comment - Used to add a comment to a post
 * Frontend call example:
 * fetch('/api/posts/PostObjectId/comment', {
 *   method: 'POST',
 *   body: JSON.stringify({ comment: 'This is a comment' }),
 * })
 */
export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
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

      // Get comment data from request body
      const { comment } = await request.json();
      
      if (!comment) {
        return NextResponse.json({ 
          success: false, 
          error: 'Comment text is required' 
        }, { status: 400 });
      }
  
      const result = await addComment(params.postId, { user: userId, comment });
  
      if (!result.success) {
        return NextResponse.json({ 
          success: false, 
          error: result.error || 'Failed to add comment' 
        }, { status: 400 });
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Comment added successfully',
        post: result.post
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to add comment' 
      }, { status: 500 });
    }
  }