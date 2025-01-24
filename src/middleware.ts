import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const PUBLIC_PATHS = ['/login', '/signup', '/about', '/contact', '/services'];
    const token = request.cookies.get('token')?.value || '';
    

    const isPublicPath = PUBLIC_PATHS.includes(path);
    const isDashboardPath = path.startsWith('/dashboard');

    if (isPublicPath) {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }
 

    if (isDashboardPath) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }

    if (!token && isDashboardPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
  


    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/about',
        '/contact',
        '/services',
        '/dashboard/:path*',
    ],
};
