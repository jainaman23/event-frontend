import { NextResponse } from 'next/server';

const PRIVATE_ROUTES = ['/event/dashboard', '/event/verification'];

export function middleware(request) {
  const token = request.cookies.get('token');
  if (PRIVATE_ROUTES.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/event/login', request.url));
  }
}
