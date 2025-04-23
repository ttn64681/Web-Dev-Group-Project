import { NextRequest, NextResponse } from 'next/server';
import { deletePost } from '@/dbInterface/dbOperations';
import { auth } from '../../../../../../auth';

/** DELETE /api/posts/[postId]/delete - Used to delete a post
 * Frontend call example:
 * fetch('/api/posts/[postId]/delete', {
 *   method: 'DELETE',
 * })
 */
export async function DELETE(request: NextRequest, { params }: { params: { postId: string } }) {
    try {
      // Get the authenticated user's session
      const { userId } = await request.json();
      
      if (!userId) {
        return NextResponse.json({ 
          success: false, 
          error: 'Unauthorized' 
        }, { status: 401 });
      }
  
      const result = await deletePost(params.postId, userId);
  
      if (!result.success) {
        return NextResponse.json({ 
          success: false, 
          error: result.error || 'Failed to delete post' 
        }, { status: 400 });
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Post deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to delete post' 
      }, { status: 500 });
    }
  }
