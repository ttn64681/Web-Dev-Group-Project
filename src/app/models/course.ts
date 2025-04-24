import mongoose, { Schema, Document, Model } from 'mongoose';

interface CourseTemplate extends Document {
  prefix: string;
  number: number;
  title: string;
  description: string;
  topics: string[];
  resources: {
    aiLinks: string[];
    postIds: string[];
  };
}

const courseSchema = new Schema<CourseTemplate>({
  prefix: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topics: {
    type: [String],
    required: true,
  },
  resources: {
    type: {
      aiLinks: {
        type: [String],
        required: true,
      },
      postIds: {
        type: [String],
        required: true,
      },
    },
    required: true,
  },
});

const Course: Model<CourseTemplate> =
  mongoose.models.Post || mongoose.model<CourseTemplate>('Course', courseSchema);

export default Course;
