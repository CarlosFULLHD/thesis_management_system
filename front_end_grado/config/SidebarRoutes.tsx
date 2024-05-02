//SidebarRoutes.tsx
"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  BarChart,
  ClipboardPen,
  Compass,
  Layout,
  List,
  Table,
  Search,
  Users,
  UserRoundPlus,
  UserRoundX,
  ClipboardList,
  CalendarCheck,
  TriangleAlert,
  UserRoundCog,
  Code,
  Hourglass,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "@/components/sidebaritem";
import { useSession } from "@/app/providers/SessionProvider";
import { ElementType } from "react";
interface Route {
  icon: ElementType; // Using ElementType which can be any valid React component
  label: string;
  href: string;
}

// Define the structure of your routes configuration object
interface RoutesConfig {
  [key: string]: Route[];
}
const routesConfig: RoutesConfig = {
  //Informacion es PUBLIC
  //Acciones es ESTUDIANTE
  //Docente es DOCENTE
  //Administrar es COORDINADOR
  Información: [
    { icon: ClipboardPen, label: "Inscribirme", href: "/form" },
    {
      icon: Search,
      label: "Herramienta de ayuda: Proyectos Pasados",
      href: "/Buscar-biblioteca",
    },
    {
      icon: Code,
      label: "Código temporal*",
      href: "/Codigo-temporal/Verificar",
    },
  ],
  Acciones: [
    { icon: Users, label: "Mis tutores", href: "/AssignedRapporteurs" },
    {
      icon: TriangleAlert,
      label: "Abadonar Taller de Grado",
      href: "/EstudiantesAbandono",
    },
    {
      icon: Hourglass,
      label: "TimeLine de Tareas de Grado",
      href: "/Historial",
    },
  ],
  Docente: [
    {
      icon: Users,
      label: "Mis estudiantes",
      href: "/",
    },
    { icon: UserRoundCog, label: "Editar mi pefil", href: "/" },
  ],
  Administrar: [
    {
      icon: Users,
      label: "Solicitudes de Inscripción",
      href: "/dashboardInformation",
    },
    {
      icon: UserRoundPlus,
      label: "Crear codigo temporal",
      href: "/Codigo-temporal/Crear",
    },
    {
      icon: Table,
      label: "Asignar tutores",
      href: "/assignProfessor/assignTutors",
    },
    {
      icon: Table,
      label: "Asignar relatores",
      href: "/assignProfessor/assignRapporteurs",
    },
    { icon: Users, label: "Inscritos", href: "/EstudiantesInscritos" },
    { icon: UserRoundX, label: "Desertion", href: "/EstudiantesAbandono" },
    {
      icon: ClipboardList,
      label: "Gestionar Tareas de grado",
      href: "/Gestion-tareas/Elegir-taller",
    },
    {
      icon: Table,
      label: "Gestionar Perfil de grado",
      href: "/Perfil-grado/MostrarPerfilGrado",
    },
    {
      icon: CalendarCheck,
      label: "Periodo Academico",
      href: "/Periodo-academico/Actual",
    },
    {
      icon: Table,
      label: "Gestión info pública",
      href: "/Informacion-publica/Gestion-info-publica",
    },
  ],
};

export const SidebarRoutes = () => {
  const { userDetails } = useSession();
  //Estudiante
  //Docente
  //Coodinador
  const pathname = usePathname();
  let routesToShow = routesConfig.Información; // default to Información routes
  if (userDetails) {
    if (userDetails.role === "DOCENTE") {
      routesToShow = routesConfig.Docente;
    } else if (userDetails.role === "ESTUDIANTE") {
      routesToShow = routesConfig.Acciones;
    } else if (userDetails.role === "COORDINADOR") {
      routesToShow = routesConfig.Administrar.concat(routesConfig.Información);
    }
  }
  return (
    <Accordion
      defaultExpandedKeys={["Información"]}
      selectionMode="multiple"
      variant="splitted"
    >
      {Object.entries(routesConfig).map(([key, routes]) => (
        <AccordionItem
          key={key}
          title={key.replace(/([a-z])([A-Z])/g, "$1 $2")}
          className=" text-center text-sky-700  text-xl font-[500] hover:text-slate-600 hover:bg-slate-300/20"
        >
          <div className="flex flex-col text-center">
            {routes.map((route) => (
              <SidebarItem
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
              />
            ))}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
