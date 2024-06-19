"use client";
import { title } from "@/components/primitives";
import FormRegistration from "../_components/formRegistration";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import { StudentProvider } from "../_providers/studentProvider";

export default function Form() {
  return (
    <ReactQueryClientProvider>
      <StudentProvider>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark pb-6">
            Formulario de Inscripción
          </h1>
          <h2 className="text-xl mb-4">
            Después de llenar el formulario dirígete a dirección de carrera para
            entregar tu propuesta de grado
          </h2>
          <FormRegistration />
          <br />
          <p className="italic">
            En caso de cualquier problema comunicarse a{" "}
            <span className="font-bold">centrodeayuda@ucb.edu.bo</span>
          </p>
        </div>
      </StudentProvider>
    </ReactQueryClientProvider>
  );
}
