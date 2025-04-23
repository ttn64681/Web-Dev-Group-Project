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
  _id: string;      // MongoDB ObjectID
  username: string; // The user's unique username
  password: string; // The user's hashed password
};

/**
 * Represents a course in the database
 */
export type Course = {
  _id: string;                // MongoDB ObjectID
  courseId: string;           // "CSCI-1301"
  prefix: string;             // "CSCI"
  number: string;             // "1301"
  title: string;
  description?: string;
  topics?: string;
  prerequisites?: string[];
  plan?: Array<string>;
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
  _id?: string;                            // MongoDB ObjectID
  title: string;                          // "Sick Coding Tips"
  description: string;
  url: string;                            // youtube, link, or music link (youtube)
  thumbnail?: string;
  postType: 'youtube' | 'link' | 'music';
  course: string;                       // ObjectID (mongodb) of the course this post belongs to
  user: any;                           // ObjectID (mongodb) of the user who created the post
  likes: string[];                       // array of user IDs who liked the post
  comments?: Comment[];                    // array of comments on the post (initialized as empty array)
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
      // courseId is already concatenated from prefix and number w/in searchAndAddCourse
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
    })/*.populate('posts'); // Replaces post ObjectIDs with full post documents (first time search = empty array of post ObjectIDs)*/

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
export async function searchAndAddCourse(prefix: string, number: string, title: string) {
  await connectMongoDB();

  try {
    // First check if course exists using fetchCourse
    const existingCourse = await fetchCourse(prefix, number);

    if (existingCourse.success && existingCourse.course) { // if course exists
      return existingCourse; // Return the existing course
    }

    // If course not found, use Gemini API to get course information
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not defined in environment variables.");
      return { 
        success: false, 
        error: "GEMINI_API_KEY is not defined. Please set it in your environment variables." 
      };
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Using the current course information from the University of Georgia's Bulletin courses website, provide a detailed overview of 
${prefix} ${number} (${title}) at the University of Georgia, and return the 
title from bulletin, 
course description from bulletin, 
course topics from bulletin, 
related prerequisites from bulletin, a 
feasible plan for success (according to the class and professor) (the plan for success should simply be an array of strings), 
and the course's top-5 free study links/urls from google (array of multiple top 5 recommended study resource links according to google that are best for the course and are free and are valid, working urls, along with a description for each of the 5 links) 
information in JSON format, with only the keys: "title", "description", "topics", "prerequisites", "plan", and "urls" (with the keys "url" and "description" inside the urls array). Use exactly these keys. Do not create any extra keys other than these. Do not use markdown code.`;

    const result = await model.generateContent(prompt);
    console.log('Gemini result: ', result);
    const response = await result.response;
    console.log('Gemini response: ', response);
    const text = response.text();
    console.log('Gemini text: ', text);
    
    // Validate that we got a response
    if (!text) {
      console.error('Empty response from Gemini API');
      return {
        success: false,
        error: 'Failed to get course information from AI'
      };
    }

    let courseJSON;
    try {
      // Clean response text by removing markdown code block markers (if any) and any extra whitespace
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      
      // Parse JSON response
      courseJSON = JSON.parse(cleanedText);
      
      // Ensure plan is always an array of strings
      if (courseJSON.plan) {
        if (typeof courseJSON.plan === 'string') {
          // if plan is a string, try to parse it as JSON in case it's a stringified array
          try {
            const parsedPlan = JSON.parse(courseJSON.plan);
            courseJSON.plan = Array.isArray(parsedPlan) ? parsedPlan : [courseJSON.plan];
          } catch {
            // if parsing fails, treat it as a single string item in array
            courseJSON.plan = [courseJSON.plan];
          }
        } else if (!Array.isArray(courseJSON.plan)) {
          // if plan neither string nor array, convert to array
          courseJSON.plan = [String(courseJSON.plan)];
        }
      } else {
        // if plan null/undefined
        courseJSON.plan = [];
      }
      
      console.log('Processed plan:', courseJSON.plan);
      
    } catch (parseError) { // if parsing fails
      console.error('Failed to parse Gemini API response:', parseError);
      return {
        success: false,
        error: 'Failed to parse course information'
      };
    }

    // Validate required fields
    if (!courseJSON.title || !courseJSON.description) {
      console.error('Missing required fields in Gemini API response:', courseJSON);
      return {
        success: false,
        error: 'Invalid course information received'
      };
    }

    // Create new course with properly mapped data
    // newCourse is the course object, not the courseId
    const newCourse = await Course.create({
      courseId: `${prefix}-${number}`,
      prefix: prefix.toUpperCase().trim(),
      number,
      title: courseJSON.title || title.trim(), // Use Gemini's title if available, otherwise use user's
      description: courseJSON.description,
      topics: courseJSON.topics,
      prerequisites: courseJSON.prerequisites,
      plan: courseJSON.plan || [], // Keep as array, default to empty array if undefined
      resourceUrls: courseJSON.urls?.map((url: { url: string, description: string }) => ({
        url: url.url,
        description: url.description
      })) || [], // Map each object in gemini's urls array to new course object's resourceUrls array
      posts: [] // Initialize empty posts array
    });

    // Log the resourceUrls structure for verification
    console.log('Resource URLs structure:', JSON.stringify(newCourse.resourceUrls, null, 2));

    return { success: true, course: newCourse };
  } catch (error) {
    console.error('Error searching course:', error);
    return {
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to search course'
    };
  }
}

/**
 * Adds a new post to a course
 * @param postData - Post data without comments and likes (which are initialized empty)
 * @returns Object containing success status and either the post or an error message
 */
export async function addPost(postData: Post) {
  await connectMongoDB();
  try {
    // First get the course to ensure it exists
    const course = await Course.findOne({ courseId: postData.course });
    if (!course) {
      return { success: false, error: 'Course not found' };
    }

    // Create the post with initialized empty arrays for comments and likes
    const post = await Post.create({ // mongoose method that creates new post in the database
      ...postData,
      course: course._id, // Use the course's MongoDB _id
      comments: [], // Initialize empty comments array
      likes: []     // Initialize empty likes array
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
 * @param courseId - The ID of the course ("CSCI-1301")
 * @returns Object containing success status and either the posts or an error message
 */
export async function fetchCoursePosts(courseId: string) {
  await connectMongoDB();

  try {
    // First get the course
    const course = await Course.findOne({ courseId }); // search for course by courseId
    if (!course) {
      return { success: false, error: 'Course not found' };
    }

    // Find all posts for the course and populate the user, comments, and course
    const posts = await Post.find({ course: course._id })
      /*
      .populate('user', 'username') // Replace user ObjectID with user document (only username field)
      .populate('course') // Replace course ObjectID with full course document
      .populate('comments.user', 'username') // Replace comments user ObjectIDs with user documents (only username field)
      */
      .sort({ likes: -1, createdAt: -1 }); // Sort by most likes first, then by newest first

    console.log('Posts: ', posts);

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
export async function addComment(postId: string, commentData: Comment) {
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

/**
 * Deletes a post from the database
 * @param postId - The ID of the post to delete
 * @param userId - The ID of the user attempting to delete the post
 * @returns Object containing success status and either a success message or an error message
 */
/*export async function deletePost(postId: string, userId: string) {

  try {
    await connectMongoDB();

    // First find the post to check if it exists and if the user is authorized
    const post = await Post.findById(postId);
    
    // if post not found
    if (!post) {
      return {
        success: false,
        error: 'Post not found'
      };
    }

    // Check if user is the owner of the post
    if (post.user.toString() !== userId) {
      return {
        success: false,
        error: 'Not authorized'
      };
    }

    // Get the course to update its posts array
    const course = await Course.findById(post.course);
    if (course) {
      // Remove the post ID from the course's posts array
      await Course.findByIdAndUpdate(course._id, {
        $pull: { posts: postId } // $pull removes the post ID from the posts array
      });
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);

    return {
      success: true,
      message: 'Post deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting post:', error);
    return {
      success: false,
      error: 'Failed to delete post'
    };
  }
}*/

export async function fetchCoursePost(postId: string) {
  try {
    await connectMongoDB();
    const post = await Post.findById(postId)
    /*
      .populate('user', 'name image')
      .populate('comments.user', 'name image')
    */
      .lean(); // returns the post as a plain JavaScript object
    
    if (!post) {
      return {
        success: false,
        error: 'Post not found'
      };
    }

    // Type assertion to help TypeScript understand the structure
    const typedPost = post as any;

    return {
      success: true,
      post: {
        ...typedPost,
        _id: typedPost._id.toString(),
        user: typedPost.user,
        comments: typedPost.comments ? typedPost.comments.map((comment: any) => ({
          ...comment,
          _id: comment._id,//toString()
          user: comment.user ? {
            ...comment.user,
            _id: comment.user._id//toString()
          } : null
        })) : []
      }
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      success: false,
      error: 'Failed to fetch post'
    };
  }
}

/**
 * Fetches all courses with the given prefix
 * @param prefix - Course prefix (e.g., "CSCI")
 * @returns Object containing success status and either the courses array or an error message
 */
export async function fetchCoursesByPrefix(prefix: string) {
  await connectMongoDB();

  try {
    // Find all courses with the given prefix
    const courses = await Course.find({
      prefix: prefix,
    });

    return { 
      success: true, 
      courses 
    };
  } catch (error) {
    console.error('Error fetching courses by prefix:', error);
    return { 
      success: false, 
      error: 'Failed to fetch courses by prefix' 
    };
  }
}
