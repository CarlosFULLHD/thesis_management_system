"use client"
import { title } from "@/components/primitives";
import StudentDashboard from "../components/studentDashboard";

import { ReactQueryClientProvider } from "@/app/(public)/form/providers/ReactQueryClientProvider";

export default function PanelInformacion() {
  return (
    <ReactQueryClientProvider>
    <div className="w-full">
      <h1 className="text-3xl font-bold py-2">
        Panel de control para aceptar estudiantes a Taller de Grado I
      </h1>

      <StudentDashboard />
    </div>
  </ReactQueryClientProvider>
  );
}
