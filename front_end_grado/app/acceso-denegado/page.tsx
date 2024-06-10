// app/acceso-denegado/page.tsx
import { Button } from "@nextui-org/button";
import React from "react";

export default function AccessDenied() {
  return (
    <div>
      <h1>Acceso Denegado</h1>
      <p>No tienes permiso para ver esta página</p>
      <Button className="bg-yellow-light text-black " href="/">
        Volver al inicio
      </Button>
    </div>
  );
}
