import { NextRequest, NextResponse } from 'next/server';
import {
  addCourse,
  fetchCourse,
  searchAndAddCourse,
  fetchAllCourses,
} from '@/dbInterface/dbOperations';

// GET /api/courses - Get all courses (used for course searches)
// GET /api/courses?prefix=CSCI&number=1301 - Get specific course
export async function GET(request: NextRequest) {
  try {
    // Get query parameters via URL
    // e.g. http://localhost:3000/api/courses?prefix=CSCI&number=1301
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix');
    const number = searchParams.get('number');

    // If prefix and number are provided, fetch specific course
    if (prefix && number) {
      const result = await fetchCourse(prefix, number);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 404 });
      }
      return NextResponse.json(result.course);
    }

    // Otherwise, fetch all courses
    const result = await fetchAllCourses();
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ courses: result.courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

// POST /api/courses - Used to create a course when prefix and number doesn't exist
export async function POST(request: NextRequest) {
  try {
    const { prefix, number, title } = await request.json();

    // Validate required fields
    if (!prefix || !number || !title) {
      return NextResponse.json(
        { error: 'Prefix, number, and title are required' },
        { status: 400 }
      );
    }

    const result = await searchAndAddCourse(prefix, number, title);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result.course);
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
