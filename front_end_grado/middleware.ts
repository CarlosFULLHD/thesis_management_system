import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  console.log('Requested URL:', request.nextUrl.href); // Log the requested URL

  const cookieStore = cookies();
  const jwt = cookieStore.get("token");
  console.log('JWT cookie:', jwt); // Log the JWT cookie object
  
  if (!jwt) {
    console.log('No JWT found, redirecting to login.');
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  try {
    console.log('JWT found:', jwt.value);
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode("Rd7yFqUFlUqy4HMNT6HzT0jN9tMRSv9Q") 
      // "secret" es la clave secreta real del backend
    );
    console.log('JWT payload:', payload);
    return NextResponse.next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.redirect(new URL("/Login", request.url));
  }
}

export const config = {
  matcher: ["/dashboardInformation/:path*"],
};
