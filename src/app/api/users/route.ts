import connectMongoDB from '../../../../config/mongodb';
import User from '../../models/userSchema';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  await connectMongoDB();
  const hashedPassword = await bcrypt.hash(password, 5);
  await User.create({ username, password: hashedPassword });
  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}
