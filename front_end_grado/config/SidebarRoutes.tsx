//SidebarRoutes.tsx
"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  ClipboardPen,
  Compass,
  Shield,
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
  Mail,
  FolderOpen,
  Contact,
  CookingPot,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "@/components/sidebaritem";
import { useSession } from "@/app/providers/SessionProvider";
import { ElementType } from "react";
interface Route {
  icon: ElementType;
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
      label: "Herramienta de ayuda: Proyectos pasados",
      href: "/Buscar-biblioteca",
    },
    {
      icon: Code,
      label: "Código temporal*",
      href: "/Codigo-temporal/Verificar",
    },
    {
      icon: Users,
      label: "Tutores UCB",
      href: "/tutors",
    },
  ],
  Acciones: [
    //{ icon: Users, label: "Mis tutores", href: "/AssignedRapporteurs" },

    {
      icon: Mail,
      label: "Mi propuesta trabajo",
      href: "/Hito-estudiante/Carta-estudiante",
    },
    {
      icon: FolderOpen,
      label: "Mi perfil de grado",
      href: "/Perfil-grado/Estudiante",
    },
    // {
    //   icon: TriangleAlert,
    //   label: "Abadonar Taller de Grado",
    //   href: "/EstudiantesAbandono",
    // },
    {
      icon: Hourglass,
      label: "Mis tareas",
      href: "/Tareas/Estudiante/Historial",
    },
    {
      icon: Shield,
      label: "Mi defensa formal",
      href: "/Defensa-formal/Estudiante/Seleccion",
    },
  ],
  Docente: [
    {
      icon: Users,
      label: "Mis estudiantes",
      href: "/Mis-estudiantes",
    },
    // {
    //   icon: UserRoundCog,
    //   label: "Editar mi pefil",
    //   href: "/EditarPerfilDocente",
    // },
  ],
  Administrar: [
    {
      icon: Users,
      label: "Solicitudes de Inscripción",
      href: "/dashboardInformation",
    },
    {
      icon: Contact,
      label: "Estudiantes Inscritos",
      href: "/EstudiantesInscritos",
    },
    {
      icon: CookingPot,
      label: "Abandonos y Bajas Pendientes",
      href: "/EstudiantesAbandono",
    },
    {
      icon: UserRoundPlus,
      label: "Crear codigo temporal",
      href: "/Codigo-temporal/Crear",
    },
    // {
    //   icon: Table,
    //   label: "Asignar tutores",
    //   href: "/assignProfessor/assignTutors",
    // },
    // {
    //   icon: Table,
    //   label: "Asignar relatores",
    //   href: "/assignProfessor/assignRapporteurs",
    // },
    // { icon: Users, label: "Inscritos", href: "/EstudiantesInscritos" },
    // { icon: UserRoundX, label: "Desertion", href: "/EstudiantesAbandono" },
    //{
    //  icon: Compass,
    //  label: "Perfiles de grado",
    //  href: "/Perfil-grado/Lista-perfiles-grado",
    //},
    {
      icon: List,
      label: "Cartas postulación",
      href: "/Hito-coordinador/Listar-periodo",
    },
    {
      icon: Compass,
      label: "Perfiles de grado",
      href: "/Perfil-grado/Listar-perfiles-grado-test",
    },
    {
      icon: CalendarCheck,
      label: "Periodo Academico",
      href: "/Periodo-academico/Actual",
    },
    {
      icon: Table,
      label: "Gestionar Noticias",
      href: "/Informacion-publica/Gestion-info-publica",
    },

    {
      icon: Users,
      label: "Administrar Usuarios",
      href: "/AdministrarCuentas",
    },
  ],
};

export const SidebarRoutes = () => {
  const { userDetails } = useSession();

  let routesToShow: { key: string; routes: Route[] }[] = [
    { key: "Información", routes: routesConfig.Información },
  ];

  if (userDetails) {
    // Añadimos rutas adicionales basadas en el rol del usuario
    switch (userDetails.role) {
      case "ESTUDIANTE":
        // Añadimos rutas de ESTUDIANTE
        routesToShow.push({ key: "Acciones", routes: routesConfig.Acciones });
        break;
      case "DOCENTE":
        // Añadimos rutas de DOCENTE
        routesToShow.push({ key: "Docente", routes: routesConfig.Docente });
        break;
      case "COORDINADOR":
      case "ADMIN":
        // COORDINADOR y ADMIN ven todas las rutas
        routesToShow = routesToShow.concat(
          Object.entries(routesConfig)
            .filter(([key]) => key !== "Información")
            .map(([key, routes]) => ({ key, routes }))
        );
        break;
      // No necesitamos un caso default ya que siempre comenzamos con Información
    }
  }

  // Eliminar duplicados por clave
  const uniqueRoutes = new Map();
  routesToShow.forEach(({ key, routes }) => {
    if (!uniqueRoutes.has(key)) {
      uniqueRoutes.set(key, routes);
    }
  });

  return (
    <Accordion
      defaultExpandedKeys={["Información"]}
      selectionMode="multiple"
      variant="splitted"
    >
      {routesToShow.map(({ key, routes }) => (
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
