// middleware.ts

//Middleware routes not working yet
import { NextResponse, NextRequest } from 'next/server';

// Define the JWT payload structure
interface DecodedToken {
  exp: number;
  userId: number;
  role: string;
}

interface RoleAccessControl {
  [path: string]: string[];
}

const roleAccessControl: RoleAccessControl = {
  '/Tareas': ['ESTUDIANTE'],
  '/AssignedRapporteurs': ['ESTUDIANTE'],
  '/EstudiantesAbandono': ['ESTUDIANTE'],
  '/Proyectos': ['ESTUDIANTE'],
  '/Estudiantes-asignados-teacher': ['DOCENTE'],
  '/Editar-perfil': ['DOCENTE'],
  '/dashboardInformation': ['COORDINADOR'],
  '/CodigoTemporal/Crear': ['COORDINADOR'],
  '/EstudiantesInscritos': ['COORDINADOR'],
  '/Gestion-tareas': ['COORDINADOR'],
  '/GestionPerfilGrado': ['COORDINADOR'],
  '/Periodo-academico': ['COORDINADOR'],
  '/MostrarPerfilGrado': ['COORDINADOR'],
  '/Gestion-info-publica': ['COORDINADOR'],
};

const publicPaths = new Set([
  '/', '/Login', '/error', '/public',
  '/access-denied', '/Buscar-biblioteca', '/form',
  '/Informacion-publica/Mostrar-info-publica', '/Codigo-temporal/Verificar'
]);

function isPublicPath(pathname: string): boolean {
  return publicPaths.has(pathname);
}

function decodeJwt(token: string): DecodedToken | null {
  try {
    const payload = Buffer.from(token.split('.')[1], 'base64').toString();
    return JSON.parse(payload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

function userHasAccess(role: string, pathname: string): boolean {
  if (role === 'COORDINADOR') return true;  // Allowing 'COORDINADOR' to access any route.
  const allowedRoles = roleAccessControl[pathname];
  return allowedRoles && allowedRoles.includes(role);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/_next/static/') || isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // const token = req.headers.get('authorization')?.split(' ')[1];
  // if (!token) {
  //   return pathname.startsWith('/Login') ? NextResponse.next() : NextResponse.redirect(new URL('/Login', req.url));
  // }

  // const decoded = decodeJwt(token);
  // if (!decoded || !userHasAccess(decoded.role, pathname)) {
  //   return NextResponse.redirect(new URL('/access-denied', req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
