"use client";
import React, { useEffect } from 'react';
import { BASE_URL } from "@/config/globals";
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';
import { GoogleSignInButton } from '@/components/authButtons';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/router';

export default function SignInPage() {
  const router = useRouter();

  // Definir checkSession fuera de useEffect para que sea accesible en todo el componente
  async function checkSession() {
    const session = await getServerSession(authConfig);
    console.log("Session: ", session);

    if (session && session.user) {
      const email = session.user.email ?? ''; // Usar un string vacío como valor predeterminado
      const role = await getRole(email);
      console.log("Rol obtenido:", role);
      router.push("/dashboardInformation");
    }
  }

  useEffect(() => {
    checkSession();
  }, [router]); // Asegúrate de que las dependencias estén correctas

  async function getRole(email: string) {
    const url = `${BASE_URL}/auth/getRole`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const roleName = await response.text();
      return roleName;
    } catch (error) {
      console.error('Error al obtener el rol:', error);
      return '';
    }
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen py-0">
      <div className="flex flex-col items-center mt-10 p-10 shadow-md">
        <Card className="py-0">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            {/* Imagen y texto */}
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <GoogleSignInButton onSignInSuccess={checkSession} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
