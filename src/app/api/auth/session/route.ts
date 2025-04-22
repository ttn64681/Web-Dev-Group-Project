import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ 
        isAuthenticated: false,
        user: null 
      });
    }

    return NextResponse.json({ 
      isAuthenticated: true,
      user: {
        id: session.user?.id,
        username: session.user?.username
      }
    });
  } catch (error) {
    console.error('Error getting session:', error);
    return NextResponse.json({ 
      isAuthenticated: false,
      user: null,
      error: 'Failed to get session'
    }, { status: 500 });
  }
} 