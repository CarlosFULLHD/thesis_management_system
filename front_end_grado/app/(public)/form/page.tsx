"use client";
import { title } from "@/components/primitives";
import FormRegistration from "../_components/formRegistration";
import { ReactQueryClientProvider } from "./providers/ReactQueryClientProvider";
import { StudentProvider } from "./providers/studentProvider";

export default function Form() {
  return (
    <ReactQueryClientProvider>
      <StudentProvider>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-6">
            Formulario de Inscripción
          </h1>
          <h2 className="text-xl mb-4">
            Después de llenar el formulario dirígete a dirección de carrera para
            entregar tu propuesta de grado
            <br />
            <br />
            Cualquier problema comunicarse a{" "}
            <span className="font-bold">o.figueroa@ucb.edu.bo</span>
            <br />
          </h2>

          <FormRegistration />
        </div>
      </StudentProvider>
    </ReactQueryClientProvider>
  );
}
