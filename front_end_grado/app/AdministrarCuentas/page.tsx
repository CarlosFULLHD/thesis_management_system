"use client";
import { title } from "@/components/primitives";
import UserDashboard from "./components/UserDashboard";
import { UserDashboardProvider } from "./providers/UserDashboardProvider";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";

export default function PanelInformacion() {
  return (
    <ReactQueryClientProvider>
      <UserDashboardProvider>
        <div className="">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark py-6">
            Administrar Todos los usuarios
          </h1>

          <UserDashboard />
        </div>
      </UserDashboardProvider>
    </ReactQueryClientProvider>
  );
}
