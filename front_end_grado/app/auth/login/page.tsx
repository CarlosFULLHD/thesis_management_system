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
  console.log({session,status})

  useEffect(() => {
      if (status === 'authenticated') {
          // redirección basada en el rol
          const userRole = session?.user?.role;

          switch (userRole) {
              case 'COORDINADOR':
                  router.push('/dashboardCoordinador');
                  break;
              case 'ESTUDIANTE':
                  router.push('/dashboardEstudiante');
                  break;
              default:
                  router.push('/acceso-denegado');
                  break;
          }
      }
  }, [status, session, router]);

  const handleSignIn = () => signIn('google');

  return (
      <div className="w-full flex flex-col items-center min-h-screen">
          <div className="flex flex-col items-center mt-10 p-10 shadow-md">
              <Card>
                  <CardBody>
                      <GoogleSignInButton onSignInSuccess={handleSignIn} />
                  </CardBody>
              </Card>
          </div>
      </div>
  );
}
