/**
 * Course Model
 *
 * Defines the Course model schema to be used in the database.
 */
import mongoose, { Schema, Document } from 'mongoose';

export interface CourseTemplate extends Document {
  courseId: string;
  prefix: string;
  number: string;
  title: string;
  topics?: string[];
  description?: string;
  prerequisites?: string[];
  plan?: string;
  resourceUrls?: Array<{
    url: string;
    description: string;
  }>;
  posts: mongoose.Types.ObjectId[]; // Reference to array of post object ids
  createdAt: Date; // for sorting/filtering purposes only
  updatedAt: Date; // for sorting/filtering purposes only
}

const CourseSchema: Schema = new Schema(
  {
    courseId: { type: String, required: true, unique: true },
    prefix: { type: String, required: true },
    number: { type: String, required: true },
    title: { type: String, required: true },
    topics: [{ type: String }],
    description: { type: String },
    prerequisites: [{ type: String }],
    plan: { type: String },
    resourceUrls: [{
      url: { type: String, required: true },
      description: { type: String, required: true }
    }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // Reference to array of post object ids
  },
  { timestamps: true }
);

// Specified Indexes for efficient querying (you can call a specific index by name in the query of .sort())
CourseSchema.index({ prefix: 1, number: 1 }, { unique: true }); // Sort courses by prefix and number (ascending)

export default mongoose.models.Course || mongoose.model<CourseTemplate>('Course', CourseSchema);
