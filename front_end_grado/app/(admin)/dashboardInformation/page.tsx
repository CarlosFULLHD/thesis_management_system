"use client";
import { title } from "@/components/primitives";
import StudentDashboard from "../components/studentDashboard";
import { StudentDashboardProvider } from "./providers/StudentDashboardProvider";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";

export default function PanelInformacion() {
  return (
    <ReactQueryClientProvider>
      <StudentDashboardProvider>
        <div className="">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-6">
            Panel de control para aceptar estudiantes a Taller de Grado I
          </h1>

          <StudentDashboard />
        </div>
      </StudentDashboardProvider>
    </ReactQueryClientProvider>
  );
}
