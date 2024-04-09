"use client";
import { title } from "@/components/primitives";
import FormRegistration from "../components/formRegistration";
import { ReactQueryClientProvider } from "./providers/ReactQueryClientProvider";
import { ProfessorProvider } from "../form_docentes/providers/ProfessorProvider";

export default function Form() {
  return (
    <ReactQueryClientProvider>
      <ProfessorProvider>
        <div className="">
          <h1 className="text-3xl font-bold py-2">Bienvenido Docente</h1>
          <h2 className="text-xl mb-4">
            Cuando hayas hecho tu inscripcion al sistema académico correctamente
            de la materia se te dará acceso al sistema, cualquier problema
            comunicarse a{" "}
            <span className="font-bold">o.figueroa@ucb.edu.bo</span>
            <br />
          </h2>

          <FormRegistration />
        </div>
      </ProfessorProvider>
    </ReactQueryClientProvider>
  );
}
