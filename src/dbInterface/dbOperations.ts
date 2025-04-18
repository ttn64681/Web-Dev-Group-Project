/**
 * Database Operations Library
 *
 * This file contains all the database operations for the CourseHub application.
 * These functions are used by the API routes to interact with the database.
 */
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../config/mongodb';
import Course from '../models/Course';
import Post from '../models/Post';
// import User from "../models/User";
import { GoogleGenerativeAI } from '@google/generative-ai';

// ######### TYPE DEFINITIONS #########

/**
 * Represents a user in the database
 */
export type User = {
  username: string; // The user's unique username
  password: string; // The user's hashed password
};

/**
 * Represents a course in the database
 */
export type Course = {
  courseId: string;           // "CSCI-1301"
  prefix: string;             // "CSCI"
  number: string;             // "1301"
  title: string;
  description?: string;
  topics?: string;
  prerequisites?: string[];
  plan?: string;
  resourceUrls?: Array<{
    url: string;
    description: string;
  }>;
  posts?: string[];           // array of post IDs associated with this course
};

/**
 * Represents a post in the database
 */
export type Post = {
  title: string;                          // "Sick Coding Tips"
  description: string;
  url: string;                            // youtube, link, or music link (youtube)
  thumbnail?: string;
  postType: 'youtube' | 'link' | 'music';
  course: string;                         // ID of the course this post belongs to "CSCI-1301"
  user: string;                           // ObjectID (mongodb) of the user who created the post
  likes?: string[];                       // array of user IDs who liked the post
  comments?: Comment[];                   // array of comments on the post
};

/**
 * Represents a comment on a post
 */
export type Comment = {
  user: string; // ObjectID (mongodb) of the user who made the comment
  comment: string; // The comment text
  createdAt?: Date; // Optional timestamp of when the comment was created
};

// ######### DATABASE OPERATIONS #########
/** These functions handle all interactions with the MongoDB database.
 * Each function includes error handling and returns a standardized response
 **/

/**
 * Adds a new course to the database
 * @param courseData - Course data
 * @returns Object containing success status and either the course or an error message
 */
export async function addCourse(courseData: Course) {
  await connectMongoDB();

  try {
    // Create the course with an automatically generated courseId
    const course = await Course.create({
      // courseId is already concatenated from prefix and number w/in searchCourse
      ...courseData,
    });
    return { success: true, course };
  } catch (error) {
    console.error('Error adding course:', error);
    return { success: false, error: 'Failed to add course' };
  }
}

/**
 * Fetches a single course by its prefix and number
 * @param prefix - Course prefix ("CSCI")
 * @param number - Course number ("1301")
 * @returns Object containing success status and either the course or an error message
 */
export async function fetchCourse(prefix: string, number: string) {
  await connectMongoDB();

  try {
    // Find the course and populate its posts
    const course = await Course.findOne({
      prefix: prefix.toUpperCase(),
      number,
    }).populate('posts'); // Replaces post ObjectIDs with full post documents

    return { success: true, course };
  } catch (error) {
    console.error('Error fetching course:', error);
    return { success: false, error: 'Failed to fetch course' };
  }
}

/**
 * Searches for a course, creating it if not found using Gemini API
 * @param prefix - Course prefix
 * @param number - Course number
 * @param title - Course title
 * @returns Object containing success status and either the course or an error message
 */
export async function searchCourse(prefix: string, number: string, title: string) {
  await connectMongoDB();

  try {
    // First check if course exists using fetchCourse
    const existingCourse = await fetchCourse(prefix, number);

    if (existingCourse.success) {
      return existingCourse; // Return the existing course
    }

    // If not found, use Gemini API to get course information
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Using the current course information from the University of Georgia's Bulletin courses website, provide a detailed overview of 
${prefix} ${number} (${title}) at the University of Georgia, and return the 
title from bulletin, 
course description from bulletin, 
course topics from bulletin, 
related prerequisites from bulletin, a 
feasible plan for success (according to the class and professor) (the plan for success should be code-output friendly, as in an array of strings), 
and the course's top-5 free study links/urls from google (array of multiple top 5 recommended study resource links according to google that are best for the course and are free and are valid, working urls, along with a description for each of the 5 links) 
information in JSON format, with only the keys: "title", "description", "topics", "prerequisites", "plan", and "urls" (with the keys "url" and "description" inside the urls array). Use exactly these keys. Do not create any extra keys other than these.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const courseJSON = JSON.parse(text);

    // Create new course with Gemini data
    const newCourse = await Course.create({
      courseId: `${prefix}-${number}`,
      prefix: prefix.toUpperCase(),
      number,
      title,
      ...courseJSON,
    });

    return { success: true, course: newCourse };
  } catch (error) {
    console.error('Error searching course:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to search course',
    };
  }
}

/**
 * Adds a new post to a course
 * @param postData - Post data without comments and likes (which are initialized empty)
 * @returns Object containing success status and either the post or an error message
 */
export async function addPost(postData: Omit<Post, 'comments' | 'likes'>) {
  await connectMongoDB();

  try {
    // First get the course to ensure it exists
    const course = await Course.findOne({ courseId: postData.course });
    if (!course) {
      return { success: false, error: 'Course not found' };
    }

    // Create the post
    const post = await Post.create({
      ...postData,
      course: course._id, // Use the course's MongoDB _id
    });

    // Update the course's posts array
    await Course.findByIdAndUpdate(course._id, {
      $push: { posts: post._id }, // $push adds the post ID to the posts array
    });

    return { success: true, post };
  } catch (error) {
    console.error('Error adding post:', error);
    return { success: false, error: 'Failed to add post' };
  }
}

/**
 * Fetches all posts for a specific course
 * @param courseId - The ID of the course
 * @returns Object containing success status and either the posts or an error message
 */
export async function fetchCoursePosts(courseId: string) {
  await connectMongoDB();

  try {
    // First get the course
    const course = await Course.findOne({ courseId });
    if (!course) {
      return { success: false, error: 'Course not found' };
    }

    // Find all posts for the course and populate the user, comments, and course
    const posts = await Post.find({ course: course._id })
      .populate('user', 'username') // Replace user ObjectID with user document (only username field)
      .populate('course') // Replace course ObjectID with full course document
      .populate('comments.user', 'username') // Replace comments user ObjectIDs with user documents (only username field)
      .sort({ likes: -1, createdAt: -1 }); // Sort by most likes first, then by newest first

    return { success: true, posts };
  } catch (error) {
    console.error('Error fetching course posts:', error);
    return { success: false, error: 'Failed to fetch posts' };
  }
}

/**
 * Adds a comment to a post
 * @param postId - The ID of the post
 * @param commentData - Comment data without createdAt (which is set automatically)
 * @returns Object containing success status and either the updated post or an error message
 */
export async function addComment(postId: string, commentData: Omit<Comment, 'createdAt'>) {
  await connectMongoDB();

  try {
    // Update the post by adding the new comment
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            ...commentData,
            createdAt: new Date(), // Add current timestamp
          },
        },
      },
      { new: true } // Return the updated document
    ).populate('comments.user', 'username'); // Replaces comment user ObjectIDs with user documents (only username field)

    if (!post) {
      return { success: false, error: 'Post not found' };
    }

    return { success: true, post };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { success: false, error: 'Failed to add comment' };
  }
}

/**
 * Adds a like to a post
 * @param postId - The ID of the post
 * @param userId - The ID of the user liking/unliking
 * @returns Object containing success status and either the updated post or an error message
 */
export async function likePost(postId: string, userId: string) {
  try {
    await connectMongoDB();

    // Use $addToSet to add user to likes array if use is not already present
    const post = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true }
    ).lean(); // returns the post as a plain JavaScript object

    if (!post) {
      // if post not found
      return {
        success: false,
        error: 'Post not found',
      };
    }

    return {
      // post found and updated with like
      success: true,
      post,
    };
  } catch (error) {
    console.error('Error liking post:', error);
    return {
      success: false,
      error: 'Failed to like post',
    };
  }
}

/**
 * Removes a like from a post
 * @param postId - The ID of the post
 * @param userId - The ID of the user unliking
 * @returns Object containing success status and either the updated post or an error message
 */
export async function unlikePost(postId: string, userId: string) {
  try {
    await connectMongoDB();

    // Use $pull to remove user from likes array
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    ).lean();

    if (!post) {
      return {
        success: false,
        error: 'Post not found',
      };
    }

    return {
      success: true,
      post,
    };
  } catch (error) {
    console.error('Error unliking post:', error);
    return {
      success: false,
      error: 'Failed to unlike post',
    };
  }
}

/**
 * Fetches all courses from the database
 * @returns Object containing success status and either the courses or an error message
 */
export async function fetchAllCourses() {
  await connectMongoDB();
  try {
    const courses = await Course.find().sort({ prefix: 1, number: 1 }); // Sort by prefix (A to Z) then by number (ascending)
    return { success: true, courses };
  } catch (error) {
    console.error('Error fetching all courses:', error);
    return { success: false, error: 'Failed to fetch courses' };
  }
}
