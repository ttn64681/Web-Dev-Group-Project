import { NextRequest , NextResponse } from "next/server";
import connectMongoDB from "../../config/mongodb";
import Course from "@/app/models/course";
import User from "@/app/models/user";

type User = {
    username: string,
    password: string,
}

type Course = {
    prefix: string;
    number: number;
    title: string;
    description: string;
    topics: string[]
    resources: {
        aiLinks: string[],
        postIds: string[]
    }
}

type Post = {
    postTitle: string;
    postDescription: string;
    postUrl: string;
    postLikes: number;
    postComments: Comment[];
}

type Comment = {
    posterUsername: string;
    comment: string
    parentPostId: string
}

async function addUser(userJSON: User) {
    const {username, password} = userJSON;

    await connectMongoDB();

    await User.create({username, password});
    return {message: "User added"};
}

async function addCourse(courseJSON: Course) {
    const {prefix, number, title, description, topics, resources} = courseJSON;
    await connectMongoDB();
}

async function addPost(postJSON: Post) {
    await connectMongoDB();

}

async function addCommentToPost(postID: String, commentJSON: String) {
    await connectMongoDB();
}

async function fetchCourse(prefix : String, number: String) {
    await connectMongoDB();

    const course = await Course();
    return NextResponse.json({course});

}

async function fetchCoursePosts(courseId: String) {
    await connectMongoDB();

}
