"use client";
import React, { useEffect } from 'react';
import { BASE_URL } from "@/config/globals";
import { getServerSession } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import { authConfig } from '@/lib/auth';
import { GoogleSignInButton } from '@/components/authButtons';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/router';

export default function SignInPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      // El usuario está autenticado, verificar el rol y redirigir
      const userRole = session?.user?.role;

      switch (userRole) {
        case 'COORDINADOR':
          router.push('/dashboardCoordinador');
          break;
        case 'ESTUDIANTE':
          router.push('/dashboardEstudiante');
          break;
        default:
          // Manejar casos donde el rol no es reconocido o el usuario no tiene rol
          router.push('/acceso-denegado');
          break;
      }
    }
  }, [status, session, router]);

  // Función para manejar el inicio de sesión
  const handleSignIn = () => {
    signIn('google'); // Asegúrate de que 'google' sea el ID correcto para tu proveedor de Google
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen py-0">
      <div className="flex flex-col items-center mt-10 p-10 shadow-md">
        <Card className="py-0">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            {/* Aquí podrías poner una imagen o texto como cabecera */}
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            {/* Usar GoogleSignInButton o un botón personalizado para iniciar sesión */}
            <GoogleSignInButton onSignInSuccess={handleSignIn} />
            {/* Si no tienes un GoogleSignInButton personalizado, puedes usar:
              <button onClick={handleSignIn}>Iniciar sesión con Google</button>
            */}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
