// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  exp: number;
  userId: number;
  role: string;
}

// Define which roles can access which paths
interface RoleAccessControl {
  [key: string]: string[];
}
const roleAccessControl: RoleAccessControl = {
  '/dashboardLetters': ['COORDINADOR'],
  '/GestionInfoPublica': ['COORDINADOR'],
  '/StudentsList': ['COORDINADOR'],
  '/BuscarBiblioteca': ['ESTUDIANTE'],
};

export function middleware(req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/_next/static/') || pathname.startsWith('/manifest.json') || pathname === '/robots.txt' || pathname === '/sitemap.xml') {
        return NextResponse.next();
    }
    // List paths that should not trigger a redirect to login
    const publicPaths = ['/','/Login', '/error', '/public','/Buscar-biblioteca','/form'];

    // Avoid redirecting if the path is public
    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    // If there's no token and the path is not public, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/Login', req.url));
    }

    // If there is a token, or the path does not require authentication, let it proceed
    return NextResponse.next();
}
