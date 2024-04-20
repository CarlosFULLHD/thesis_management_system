import { Session } from "@auth0/nextjs-auth0";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
//SINMIDDEWARE ACTIVADO
export const config = { 
    //Aqui se deben añadir todas las rutas restringidas para los usuarios no registrados en el sistema
    matcher: [
        /* "/dashboardLetters",
        "/ListarInformacion",
        "/GestionInfoPublica",
        "/BuscarBiblioteca" */
    ],
};

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.SECRET });
    const url = req.nextUrl.clone();
    
    // Verifica si el usuario tiene un rol y si está tratando de acceder a una ruta restringida
    if (url.pathname.startsWith("/dashboardLetters") 
    || url.pathname.startsWith("/GestionInfoPublica")
    || url.pathname.startsWith("/StudentsList")
    //|| url.pathname.startsWith("/otrasRutasEspecificas")
    ) {
        console.log("Token: ",token);
        if (token && token.role === "COORDINADOR") {
            return NextResponse.next(); // Permitir el acceso al coordinador
        } else {
            return NextResponse.redirect(new URL('/auth/accesoDenegado', req.url)); // Redirigir si no es coordinador
        }
    }
    if (url.pathname.startsWith("/BuscarBiblioteca") 
    //|| url.pathname.startsWith("/otrasRutasEspecificas")
    ) {
        console.log("Token: ",token);
        if (token && token.role === "ESTUDIANTE") {
            return NextResponse.next(); // Permitir el acceso al estudiante
        } else {
            return NextResponse.redirect(new URL('/auth/accesoDenegado', req.url)); // Redirigir si no es coordinador
        }
    }
    
    // Permitir el acceso si no está tratando de acceder a una ruta restringida o si es un estudiante
    return NextResponse.next();
} 
 