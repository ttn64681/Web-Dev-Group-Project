import { NextRequest, NextResponse } from 'next/server';
import { authConfig } from './app/auth.config';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  console.log('Middleware executing for path:', pathname);

  const session = await auth();
  console.log('Middleware session:', JSON.stringify(session, null, 2));

  const isAuthenticated = !!session?.user;
  console.log('Is authenticated:', isAuthenticated);

  const publicPaths = ['/', '/login'];

  //searchParams passes information to the page being redirected to
  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('reason', 'not_logged_in');
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/contribute/:path*'],
};
export default middleware;

