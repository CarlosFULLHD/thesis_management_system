// authButtons.tsx
"use client";

import React, { useEffect, useState } from "react";
import { NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { useSession } from "@/app/providers/SessionProvider";
import { Link } from "@nextui-org/link";
import UserProfile from "./userProfile";

export const SignInButton = () => {
  const { token } = useSession();
  const isLoggedIn = !!token; // Convertir la presencia de token en un booleano para verificar si el usuario está logueado

  // Estado para controlar la renderización en el cliente
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Activar la renderización en el cliente una vez que el componente se haya montado
    setIsClient(true);
  }, []);

  return (
    <NavbarItem>
      {isClient && isLoggedIn ? (
        <UserProfile /> // Mostrar perfil de usuario si está logueado y estamos en el cliente
      ) : (
        <Button
          as={Link}
          href="/Login"
          className="bg-yellow-50 dark:bg-yellow-25 text-white font-bold shadow-md"
        >
          Login
        </Button>
      )}
    </NavbarItem>
  );
};
