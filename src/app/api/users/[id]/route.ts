// app/api/user/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../config/mongodb';
import User from '@/app/models/userSchema';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectMongoDB();
    const user = await User.findById(id).lean();

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { password, ...safeUser } = user;

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
