import { NextRequest, NextResponse } from 'next/server';
import { fetchCoursePosts, addPost, fetchCourse } from '@/dbInterface/dbOperations';

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
* fetch('/api/posts', {
*   method: 'POST',
*   body: JSON.stringify({ 
*     title: 'Sick Coding Tips', 
*     description: 'This is a description', 
*     url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
*     postType: 'youtube', 
*     courseId: 'CSCI-1301' 
*   }),
* })
*/
export async function POST(request: NextRequest) {
  // Get the authenticated user's session
  try {

    const { title, description, url, thumbnail, postType, courseId, userId, username } = await request.json();
    console.log(`INFO DUMP: ${title}, ${description}, ${url}, ${thumbnail}, ${postType}, ${courseId}, ${userId}`);
    
    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized'   
      }, { status: 401 });
    }

      // Get the post data from the request body
      // Validate required fields
      if (!title || !description || !url || !postType || !courseId ) {
        return NextResponse.json({ 
          success: false, 
          error: 'Missing required fields: title, description, url, postType, and course are required' 
        }, { status: 400 });
      }

      // Validate postType
      if (!['youtube', 'link', 'music'].includes(postType)) {
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid postType. Must be one of: youtube, link, music' 
        }, { status: 400 });
      }

      const [coursePrefix, courseNumber] = courseId.split('-');

      // Fetch course object id from courseId
      const course = await fetchCourse(coursePrefix, courseNumber);
      if (!course.success) {
        return NextResponse.json({ 
          success: false, 
          error: course.error || 'Failed to fetch course' 
        }, { status: 500 });
      }
      
      // Create the post data object
      const postData = {
        title,
        description,
        url,
        thumbnail,
        postType,
        course: course.course.courseId,
        user: userId,
        comments: [], // Initialize empty comments array
        likes: []     // Initialize empty likes array
      };

      // Add the post to the database
      const result = await addPost(postData);

      if (!result.success) {
        return NextResponse.json({ 
          success: false, 
          error: result.error || 'Failed to add post' 
        }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true, 
        post: result.post 
      }, { status: 201 });

  } catch (error) {

    console.error('Error adding post:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to add post' 
    }, { status: 500 });

  }
}
function getServerSession(authOptions: any) {
  throw new Error('Function not implemented.');
}

