"use client";

import { BarChart, Compass, Layout, List, Table } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "@/components/sidebaritem";

const guestRoutes = [
  {
    icon: Table,
    label: "Inicio",
    href: "/MostrarInfoPublica",
  },
  {
    icon: Layout,
    label: "Formulario",
    href: "/form",
  },
  {
    icon: Table,
    label: "Inscritos",
    href: "/EstudiantesInscritos",
  },
  {
    icon: Table,
    label: "Desertion",
    href: "/EstudiantesAbandono",
  },
  {
    icon: Table,
    label: "Coordinador-info",
    href: "/dashboardInformation",
  },
  {
    icon: Table,
    label: "Gestión info pública",
    href: "/GestionInfoPublica",
  },
  {
    icon: Table,
    label: "Buscar biblioteca",
    href: "/BuscarBiblioteca",
  },
  {
    icon: Table,
    label: "Información pública",
    href: "/MostrarInfoPublica",
  },
  {
    icon: Table,
    label: "Crear cogigo temporal",
    href: "/CrearCodigoTemporal",
  },
  {
    icon: Table,
    label: "Código temporal",
    href: "/CodigoTemporal",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  //Use this for conditional for any rol
  //Estudiante
  //Docente
  //Coodinador
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
