import { NextRequest, NextResponse } from 'next/server';
import { fetchCoursePosts, addPost } from '@/dbInterface/dbOperations';

/** GET /api/posts - Get all posts for a course to display in sidebar
* Frontend call example:
* GET /api/posts?courseId=123 - Get all posts for a specific course
*/
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

/** POST /api/posts - Create a new post
* Frontend call example:
* POST /api/posts - Create a new post
*
* Post type:
* export type Post = {
*   _id: string;                            // MongoDB ObjectID
*   title: string;                          // "Sick Coding Tips"
*   description: string;
*   url: string;                            // youtube, link, or music link (youtube)
*   thumbnail?: string;
*   postType: 'youtube' | 'link' | 'music';
*   course: string;                         // ID of the course this post belongs to "CSCI-1301"
*   user: string;                           // ObjectID (mongodb) of the user who created the post
*   likes?: string[];                       // array of user IDs who liked the post
*   comments?: Comment[];                   // array of comments on the post
* };
*/
export async function POST(request: NextRequest) {
  const { title, description, url, postType, course, user } = await request.json();

  try {
    const result = await addPost({ title, description, url, courseId });
  } catch (error) {
    console.error('Error adding post:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to add post' 
    }, { status: 500 });
  }
}

