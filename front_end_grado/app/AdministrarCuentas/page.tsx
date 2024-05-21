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
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-6">
            Panel de control para administrar todas las cuentas de la U.C.B.
          </h1>

          <UserDashboard />
        </div>
      </UserDashboardProvider>
    </ReactQueryClientProvider>
  );
}
