import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import Course from "@/app/models/course";

//Gets all the courses (Used for course searches)
export async function GET() {

    //Connects to the DB
    await connectMongoDB();

    //Returns all the courses that could be found
    const courses = await Course.find();
    return NextResponse.json({courses});
}

//Creates a new course (Used to create a course when prefix and num doesn't exist)
export async function POST(request: NextRequest) {

    //Gets the course information
    const {prefix, number, title, description, topics, resources} = await request.json();

    //Returns all the courses 
    await connectMongoDB()
    
    await Course.create({prefix, number, title, description, topics, resources});
    return NextResponse.json({message: "Course added to the database successfully."}, {status: 201});
    
}


