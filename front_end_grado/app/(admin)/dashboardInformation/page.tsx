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
          <h1 className="text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark py-6">
            Solicitudes de Inscripción
          </h1>

          <StudentDashboard />
        </div>
      </StudentDashboardProvider>
    </ReactQueryClientProvider>
  );
}
