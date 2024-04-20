//SidebarRoutes.tsx
"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { BarChart, Compass, Layout, List, Table } from "lucide-react";
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
  guest: [
    { icon: Layout, label: "Formulario", href: "/form" },
    { icon: Table, label: "Buscar biblioteca", href: "/BuscarBiblioteca" },
    { icon: Table, label: "Información pública", href: "/MostrarInfoPublica" },

    { icon: Table, label: "Código temporal", href: "/CodigoTemporal" },
  ],
  teacher: [
    { icon: List, label: "Courses", href: "/teacher/courses" },
    { icon: BarChart, label: "Analytics", href: "/teacher/analytics" },
  ],
  coordinator: [
    { icon: Table, label: "Inscritos", href: "/EstudiantesInscritos" },
    { icon: Table, label: "Desertion", href: "/EstudiantesAbandono" },
    { icon: Table, label: "Coordinador-info", href: "/dashboardInformation" },
    { icon: Table, label: "Gestión info pública", href: "/GestionInfoPublica" },

    {
      icon: Table,
      label: "Crear codigo temporal",
      href: "/CrearCodigoTemporal",
    },
  ],
};

export const SidebarRoutes = () => {
  const { userDetails } = useSession();
  //Estudiante
  //Docente
  //Coodinador
  const pathname = usePathname();
  let routesToShow = routesConfig.guest; // default to guest routes
  if (userDetails) {
    if (userDetails.role === "DOCENTE") {
      routesToShow = routesConfig.teacher;
    } else if (userDetails.role === "COORDINADOR") {
      routesToShow = routesConfig.coordinator.concat(routesConfig.guest);
    }
  }
  return (
    <Accordion
      defaultExpandedKeys={["guest"]}
      selectionMode="multiple"
      variant="splitted"
    >
      {Object.entries(routesConfig).map(([key, routes]) => (
        <AccordionItem
          key={key}
          title={key.replace(/([a-z])([A-Z])/g, "$1 $2")}
          className=" text-center text-sky-700 text-xl font-[500] hover:text-slate-600 hover:bg-slate-300/20"
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
