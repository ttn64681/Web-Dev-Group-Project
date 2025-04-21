import { NextRequest, NextResponse } from 'next/server';
import { unlikePost } from '@/dbInterface/dbOperations';

export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const result = await unlikePost(params.postId, userId);

    if (!result) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error unliking post:', error);
    return NextResponse.json({ error: 'Failed to unlike post' }, { status: 500 });
  }
}
