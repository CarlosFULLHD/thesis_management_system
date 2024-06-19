"use client"

import {Spinner} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  return (
    <Spinner label="Cargando..." color="warning" />
  );
};
