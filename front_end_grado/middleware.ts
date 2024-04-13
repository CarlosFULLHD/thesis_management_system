import { request } from 'http';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getUserRoleFromToken(token: string): string | null {
  try {
    const base64Url = token.split('.')[1]; // get payload from token which is at index 1
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const { role } = JSON.parse(jsonPayload);
    return role;
  } catch (e) {
    console.error('Failed to decode JWT', e);
    return null;
  }
}

export function middleware(req: NextRequest) { 
  const token = req.cookies.get('auth_token') as unknown as string;  // Type assertion here
  if (!token) {
    return new NextResponse(null, { status: 401 }); // Unauthorized response if no token
  }

  const role = getUserRoleFromToken(token);
  const url = req.nextUrl.clone();
  url.pathname = '/unauthorized'; // Redirect path for unauthorized access

  // Example: Only allow 'COORDINADOR' to access the /admin route
  if (req.nextUrl.pathname.startsWith('/form_docentes')) {
    if (role !== 'COORDINADOR') {
      return NextResponse.redirect(url);
    }
  }

  // Continue with the response for authorized access
  return NextResponse.next();
}

// Optionally, specify which paths this middleware applies to
export const config = {
  matcher: ['/restricted-area/:path*', '/restricted-area/:path*'],
};
