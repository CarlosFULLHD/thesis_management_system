<<<<<<< HEAD
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
=======
import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Rutas protegidas
const protectedRoutes = [
  "/Hito-coordinador/Listar-periodo",
  "/Perfil-grado/Listar-perfiles-grado-test",
  "/Periodo-academico/Actual",
  "/Informacion-publica/Gestion-info-publica",
  "/AdministrarCuentas",
  "/dashboardInformation",
  "/Codigo-temporal/Crear",
  "/form_docentes"
];

const docenteRoutes = ["/Mis-estudiantes"];

const estudianteRoutes = [
  "/Hito-estudiante/Carta-estudiante",
  "/Perfil-grado/Estudiante",
  // "/EstudiantesAbandono",
  "/Tareas/Estudiante/Historial",
  "/Defensa-formal/Estudiante/Seleccion",
];
// Rutas públicas
const publicPaths = new Set([
  '/', '/Login', '/error', '/public',
  '/acceso-denegado', '/Buscar-biblioteca', '/form',
  '/Informacion-publica/Mostrar-info-publica', '/Codigo-temporal/Verificar', 
  '/tutors','/_next/static/','/_next/image','/EditarPerfil'
]);

// Verifica si la ruta es pública
function isPublicPath(pathname: string): boolean {
  return publicPaths.has(pathname);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir acceso a rutas públicas y rutas internas de Next.js
  if (pathname.startsWith('/_next/static/') || isPublicPath(pathname)) {
    return NextResponse.next();
  }

  console.log('Requested URL:', request.nextUrl.href); // Log the requested URL

  const cookieStore = cookies();
  const jwt = cookieStore.get("token");
  console.log('JWT cookie:', jwt); // Log the JWT cookie object


  const codeVerified = cookieStore.get("codeVerified");
  if (pathname === "/form_docentes" && (!codeVerified || codeVerified.value !== "true")) {
    console.log('Code not verified, redirecting to verification page.');
    return NextResponse.redirect(new URL("/Codigo-temporal/Verificar", request.url));
  }


  if (!jwt) {
    console.log('No JWT found, redirecting to login.');
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  try {
    console.log('JWT found:', jwt.value);
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode("Rd7yFqUFlUqy4HMNT6HzT0jN9tMRSv9Q") // Reemplaza "secret" con tu clave secreta real
    );
    console.log('JWT payload:', payload);

    const userRole = payload.role;
    console.log('User role:', userRole);

   // Verificar acceso a rutas protegidas por rol específico
   if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (userRole !== 'COORDINADOR' && userRole !== 'ADMIN') {
      console.log('User does not have the required role, redirecting to access denied.');
      return NextResponse.redirect(new URL("/acceso-denegado", request.url));
    }
  } else if (docenteRoutes.includes(request.nextUrl.pathname)) {
    if (userRole !== 'DOCENTE' && userRole !== 'COORDINADOR' && userRole !== 'ADMIN') {
      console.log('User does not have the required role, redirecting to access denied.');
      return NextResponse.redirect(new URL("/acceso-denegado", request.url));
    }
  } else if (estudianteRoutes.includes(request.nextUrl.pathname)) {
    if (userRole !== 'ESTUDIANTE' && userRole !== 'COORDINADOR' && userRole !== 'ADMIN') {
      console.log('User does not have the required role, redirecting to access denied.');
      return NextResponse.redirect(new URL("/acceso-denegado", request.url));
    }
  }

    return NextResponse.next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.redirect(new URL("/Login", request.url));
  }
}

// Configurar el matcher para proteger solo las rutas especificadas
export const config = {
  matcher: [
    ...protectedRoutes,
    ...docenteRoutes,
    ...estudianteRoutes,
     "/form_docentes"
  ],
};
>>>>>>> origin/main
