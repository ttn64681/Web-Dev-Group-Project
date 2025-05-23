import { NextRequest, NextResponse } from 'next/server';
import {
  addCourse,
  fetchCourse,
  searchAndAddCourse,
  fetchAllCourses,
  fetchCoursesByPrefix,
} from '@/dbInterface/dbOperations';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

/** GET /api/courses - Get all courses (used for course searches)
 * Frontend call example:
 * fetch('/api/courses', {
 *   method: 'GET',
 * })
 *
 * GET /api/courses?prefix=CSCI&number=1301&title=Introduction%20to%20Computer%20Science - Get specific course by prefix & number
 * If course doesn't exist, it will be created automatically.
 * Frontend call example:
 * fetch('/api/courses?prefix=CSCI&number=1301&title=Introduction%20to%20Computer%20Science', {
 *   method: 'GET',
 * })
 *
 * GET /api/courses?courseId=CSCI-1301 - Get specific course by courseId
 * Frontend call example:
 * fetch('/api/courses?courseId=CSCI-1301', {
 *   method: 'GET',
 * })
 *
 * GET /api/courses?prefix=CSCI - Get all courses with the given prefix
 * Frontend call example:
 * fetch('/api/courses?prefix=CSCI', {
 *   method: 'GET',
 * })
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters via URL
    // e.g. http://localhost:3000/api/courses?prefix=CSCI&number=1301&title=Introduction%20to%20Computer%20Science&courseId=CSCI-1301
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix');
    const number = searchParams.get('number');
    const title = searchParams.get('title') || '';
    const courseId = searchParams.get('courseId') || '';

    console.log(
      `API Request: prefix=${prefix}, number=${number}, title=${title}, courseId=${courseId}`
    );

    // If courseId is provided, try to fetch by courseId first (to be used in contribute)
    if (courseId) {
      console.log(`Attempting to fetch course by courseId: ${courseId}`);
      const [coursePrefix, courseNumber] = courseId.split('-');

      // Check if courseId is in correct format
      if (!coursePrefix || !courseNumber) {
        console.error(`Invalid courseId format: ${courseId}`);
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid courseId format. Expected format: PREFIX-NUMBER (e.g., CSCI-1301)',
          },
          { status: 400 }
        );
      }

      // Fetch course by courseId's prefix and number
      const result = await fetchCourse(coursePrefix, courseNumber);
      console.log(`Fetch result by courseId:`, result);

      if (result.success && result.course) {
        console.log(`Returning course found by courseId: ${courseId}`);
        return NextResponse.json({
          success: true,
          course: result.course,
        });
      }
    }

    // If only prefix is provided (no number), fetch all courses with that prefix
    if (prefix && !number) {
      console.log(`Fetching all courses with prefix: ${prefix}`);
      const result = await fetchCoursesByPrefix(prefix);

      if (!result.success) {
        console.error(`Failed to fetch courses by prefix:`, result.error);
        return NextResponse.json(
          {
            success: false,
            error: result.error || 'Failed to fetch courses by prefix',
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        courses: result.courses,
      });
    }

    // If prefix and number are provided, fetch specific course
    if (prefix && number) {
      console.log(`Attempting to fetch course: ${prefix}-${number}`);

      // First try to fetch the course
      const result = await fetchCourse(prefix, number);
      console.log(`Fetch result:`, result);

      // If course doesn't exist or fetch failed, create it
      if (!result.success || !result.course) {
        console.log(`Course not found, attempting to create: ${prefix}-${number}`);

        // Create the course with the provided title and add to mongoDB
        const createResult = await searchAndAddCourse(prefix, number, title);
        console.log(`Create result:`, createResult);

        if (!createResult.success || !createResult.course) {
          console.error(`Failed to create course:`, createResult.error);
          return NextResponse.json(
            {
              success: false,
              error: createResult.error || 'Failed to create course',
            },
            { status: 500 }
          );
        }
        return NextResponse.json({
          success: true,
          course: createResult.course,
        });
      } // if course doesn't exist, create it

      // if course exists, return it
      console.log(`Returning existing course: ${prefix}-${number}`);
      return NextResponse.json({
        success: true,
        course: result.course,
      });
    } // if prefix and number are provided, fetch specific course

    // Otherwise, fetch all courses
    console.log('No specific course requested, fetching all courses');
    const result = await fetchAllCourses();
    if (!result.success || !result.courses) {
      console.error(`Failed to fetch all courses:`, result.error);
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to fetch courses',
        },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      courses: result.courses,
    });
  } catch (error) {
    console.error('Error in courses API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/** POST /api/courses - Used to create a course when prefix, number, and title are provided
 * Called when searching for a course in course-search.
 * Frontend call example:
 * fetch('/api/courses', {
 *   method: 'POST',
 *   body: JSON.stringify({ prefix: 'CSCI', number: '1301', title: 'Introduction to Computer Science' }),
 * })
 */
// export async function POST(request: NextRequest) {
//   try {
//     const { prefix, number, title } = await request.json();

//     // Validate required fields
//     if (!prefix || !number || !title) {
//       return NextResponse.json(
//         { error: 'Prefix, number, and title are required' },
//         { status: 400 }
//       );
//     }

//     const result = await searchAndAddCourse(prefix, number, title);

//     if (!result.success) {
//       return NextResponse.json({ error: result.error }, { status: 500 });
//     }

//     return NextResponse.json(result.course);
//   } catch (error) {
//     console.error('Error creating course:', error);
//     return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
//   }
// }
