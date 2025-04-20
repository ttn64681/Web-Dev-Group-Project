import { NextRequest, NextResponse } from 'next/server';
import { likePost } from '@/dbInterface/dbOperations';
import { auth } from '../../../../../../auth';

/** POST /api/posts/[postId]/like - Used to like a post
 * Frontend call example:
 * fetch('/api/posts/PostObjectId/like', {
 *   method: 'POST',
 *   body: JSON.stringify({ userId: '123' }),
 * })
 */
export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    // Get the authenticated user's session
    const session = await auth();
    const userId = session?.user?.id;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await likePost(params.postId, userId);

    if (result.success) {
      return NextResponse.json(result.post);
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    console.error('Error liking post:', error);
    return NextResponse.json({ error: 'Failed to like post' }, { status: 500 });
  }
  
}
