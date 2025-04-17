import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import Post from "@/app/models/post";

//Gets all the courses (Used for course searches)
export async function GET() {

    //Connects to the DB
    await connectMongoDB();

    //Returns all the courses that could be found
    const posts = await Post.find();
    return NextResponse.json({posts});
}

//Creates a new course (Used to create a course when prefix and num doesn't exist)
export async function POST(request: NextRequest) {

    //Gets the post information
    const {postTitle, postDescription, postUrl, postLikes, postComments} = await request.json();

    //Returns all the courses 
    await connectMongoDB()
    
    await Post.create({postTitle, postDescription, postUrl, postLikes, postComments});
    return NextResponse.json({message: "Post added to the database successfully."}, {status: 201});
    
}