import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../config/mongodb";
import Post from "@/app/models/post";

interface RouteParams {
    params: {
        postId: string
    }
}

//Gets the singular post information by id OR courseInfo(Used when clicking on post video)
export async function GET(request: NextRequest, {params}: RouteParams) {

    //Extracts params
    const {postId} = await params;

    //Connects to the DB
    await connectMongoDB();

    //Returns all the posts that could be found
    const post = await Post.findOne({_id: postId});
    return NextResponse.json({post}, {status: 200});
}

//Edits the post (Used primarily to increase likes or add comments to a post)
export async function PUT(request: NextRequest, {params}: RouteParams) {

    //Extracts params
    const {postId} = await params;
    const {postTitle, postDescription, postUrl, postLikes, postComments} = await request.json();

    //Connects to database
    await connectMongoDB();

    //Updates individual post
    await Post.findByIdAndUpdate(postId, {postTitle, postDescription, postUrl, postLikes, postComments});
    return NextResponse.json({message: "Post successfully updated"}, {status: 201});
}

//Deletes the post entry - Only used when post gets deleted by owner
export async function DELETE(request: NextRequest, {params}: RouteParams) {
    //Extracts url params    
    const {postId} = await params;

    //Connects to the DB
    await connectMongoDB();

    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
        return NextResponse.json({message: "Post not found"}, {status: 200});
    }
    return NextResponse.json({message: "Post deleted"}, {status: 200});
}
