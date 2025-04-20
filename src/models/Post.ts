/**
 * Post Model
 *
 * Defines the Post model schema to be used in the database.
 */
import mongoose, { Schema, Document } from 'mongoose';

// Interface for the Post model
export interface PostTemplate extends Document {
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  postType: 'youtube' | 'link' | 'music';
  course: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  comments: Array<{
    // Array of comment objects on the post
    user: mongoose.Types.ObjectId;
    comment: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for the Post model
const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    thumbnail: { type: String },
    postType: { type: String, enum: ['youtube', 'link', 'music'], required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Specified Indexes for efficient querying (you can call a specific index by name in the query of .sort())
PostSchema.index({ createdAt: -1 }); // Sort posts by date (newest first)
PostSchema.index({ likes: -1 }); // Sort posts by likes (descending)

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
