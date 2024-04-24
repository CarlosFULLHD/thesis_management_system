"use client";

import { BarChart, Compass, Layout, List, Table } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "@/components/sidebaritem";

const guestRoutes = [
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
    href: "/Informacion-publica/Gestion-info-publica",
  },
  {
    icon: Table,
    label: "Buscar biblioteca",
    href: "/Buscar-biblioteca",
  },
  {
    icon: Table,
    label: "Información pública",
    href: "/Informacion-publica/Mostrar-info-publica",
  },
  {
    icon: Table,
    label: "Crear cogigo",
    href: "/Codigo-temporal/Crear",
  },
  {
    icon: Table,
    label: "Código temporal",
    href: "/Codigo-temporal/Verificar",
  },
  {
    icon: Table,
    label: "Periodo académico",
		href: "/Periodo-academico/Actual"
  }
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
