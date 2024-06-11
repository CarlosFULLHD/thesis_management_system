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
  ],
};
