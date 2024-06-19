//userProfile.tsx
"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { useSession } from "@/app/providers/SessionProvider";

export default function UserProfile() {
  const { userDetails, logout } = useSession();
  // Renderiza condicionalmente para evitar diferencias de hidratación
  if (typeof window === "undefined" || !userDetails) {
    return null; // considerar un placeholder adecuado que coincida en ambos entornos, pero por ahroa esto funciona
  }

  return (
    <div className="flex items-center gap-4 w-64 ">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform font-bold absolute right-6 md:flex"
            description={
              <span className="hidden md:block text-white dark:text-white">
                {userDetails?.role}
              </span>
            }
            name={
              <span className="hidden md:block text-white dark:text-white">
                {userDetails?.name}
              </span>
            }
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="solid">
          <DropdownItem key="settings" href="/EditarPerfil">
            Editar Perfil
          </DropdownItem>
          {/* <DropdownItem key="analytics">Analiticas</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Ayuda y Preguntas Frecuentes
          </DropdownItem> */}
          <DropdownItem key="logout" color="danger" onClick={logout}>
            <p className="text-danger hover:text-white font-bold">
              {" "}
              Cerrar Sesion
            </p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
