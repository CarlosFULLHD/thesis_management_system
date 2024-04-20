// authButtons.tsx
"use client";

import React from "react";
import { NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { useSession } from "@/app/providers/SessionProvider";
import { Link } from "@nextui-org/link";
import UserProfile from "./userProfile";

export const SignInButton = () => {
  const { token } = useSession();
  const isLoggedIn = !!token; // Convertir la presencia de token en un booleano para verificar si el usuario está logueado

  return (
    <>
      {isLoggedIn ? (
        <UserProfile /> // Mostrar perfil de usuario si está logueado
      ) : (
        <Button as={Link} href="/Login">
          Login
        </Button>
      )}
    </>
  );
};
