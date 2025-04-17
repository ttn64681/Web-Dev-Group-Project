import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import Course from "@/app/models/course";

interface RouteParams {
    params: {
        courseId: string
    }
}

//Gets the singular course information by id ()
export async function GET(request: NextRequest, {params}: RouteParams) {

    const {courseId} = await params;

    //Connects to the DB
    await connectMongoDB();

    //Returns all the courses that could be found (if params are length 9, the string is formatted as ABCD-1234)
    if (courseId.length == 9) {

        //Parses out prefix and number from route params
        const courseSearchArray = courseId.split('-');
        const coursePrefix = courseSearchArray[0];
        const courseNumber = courseSearchArray[1];

        //Gets course
        const course = await Course.findOne({prefix: coursePrefix, number: courseNumber});
        return NextResponse.json({course}, {status: 200});
    } 

    const course = await Course.findOne({_id: courseId});
    return NextResponse.json({course}, {status: 200});

}

//Edits the course (Used primarily to add AI links or new post)
export async function PUT(request: NextRequest, {params}: RouteParams) {

    //Extracts params
    const {courseId} = await params;
    const {prefix, number, title, description, topics, resources} = await request.json();

    //Connects to database
    await connectMongoDB();

    //Updates individual post
    await Course.findByIdAndUpdate(courseId, {prefix, number, title, description, topics, resources});
    return NextResponse.json({message: "Course successfully updated"}, {status: 201});
}

//Deletes the course - Should not really be used but made just in case...
export async function DELETE(request: NextRequest, {params}: RouteParams) {
    //Extracts url params    
    const {courseId} = await params;

    //Connects to the DB
    await connectMongoDB();

    //Deletes course and returns appropriate message if found or not found
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
        return NextResponse.json({message: "Post not found"}, {status: 200});
    }
    return NextResponse.json({message: "Post deleted"}, {status: 200});
}
