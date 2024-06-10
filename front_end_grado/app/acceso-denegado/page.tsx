// app/acceso-denegado/page.tsx
import { Button } from "@nextui-org/button";
import React from "react";

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-background-dark text-off-white p-4">
      <div className="bg-blue-light dark:bg-blue-dark rounded-lg p-6 shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Acceso Denegado</h1>
        <h2 className="text-3xl font-bold mb-4">Error 403</h2>
        <p className="mb-6">No tienes permiso para ver esta página</p>
        <Button
          className="bg-yellow-light dark:bg-yellow-dark text-black font-bold py-2 px-4 rounded hover:bg-yellow-600 transition duration-300 rounded-md"
          href="/"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
