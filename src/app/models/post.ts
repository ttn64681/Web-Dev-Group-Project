import mongoose, {Schema, Document, Model } from "mongoose";

interface PostTemplate extends Document {
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

const commentSchema = new Schema<Comment>({
    posterUsername: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    parentPostId: {
        type: String,
        required: true
    }
})

const postSchema = new Schema<PostTemplate>({
    postTitle: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
    },
    postUrl: {
        type: String,
        required: true
    },
    postLikes: {
        type: Number,
        required: true
    },
    postComments: {
        type: [commentSchema],
        required: true
    },
});

const Post: Model<PostTemplate> = 
    mongoose.models.Post || mongoose.model<PostTemplate>("Post", postSchema);

export default Post;