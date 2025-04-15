import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    return NextResponse.json(
      { message: 'MongoDB URI not found in environment variables' },
      { status: 500 }
    );
  }

  try {
    console.log('Attempting to connect to MongoDB......');
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully!');
    return NextResponse.json({ message: 'MongoDB connected successfully!' });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      {
        message: 'Failed to connect to MongoDB',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
