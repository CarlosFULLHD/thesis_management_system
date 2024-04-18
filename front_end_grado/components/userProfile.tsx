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
  const { logout } = useSession();
  return (
    <div className="flex items-center gap-4 w-40 ">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          {/* <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description="Estudiante"
            name="Carlos Daniel Nina Reynaga"
          /> */}
          <div className="bg-slate-50 rounded-md text-center hover:bg-blue-100">
            <h1 className="text-blue-950">Carlos Daniel Nina Reynaga</h1>

            <h2 className="text-yellow-300">Estudiante</h2>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="solid">
          <DropdownItem key="settings">Configuraciones</DropdownItem>
          <DropdownItem key="analytics">Analiticas</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Ayuda y Preguntas Frecuentes
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={logout}>
            <p className="text-danger"> Cerrar Sesion</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
