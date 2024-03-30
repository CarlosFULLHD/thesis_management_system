"use client"
import { title } from "@/components/primitives";
import FormRegistration from "../_components/formRegistration";
import { ReactQueryClientProvider } from "./providers/ReactQueryClientProvider";
import {StudentProvider} from "./providers/studentProvider";

export default function Form() {
  return (
    <ReactQueryClientProvider>
    <StudentProvider>
    <div className="">
      <h1 className="text-3xl font-bold py-2">
        Inscríbete al Sistema de manejo de Taller de grado 1
      </h1>
      <h2 className="text-xl mb-4">
        Cuando hayas hecho tu inscripcion al sistema académico correctamente de
        la materia se te dará acceso al sistema, cualquier problema comunicarse
        a <span className="font-bold">o.figueroa@ucb.edu.bo</span>
        <br />
        PD: texto no oficial
      </h2>

      <FormRegistration />
    </div>
    </StudentProvider>
  </ReactQueryClientProvider>
    
  );
}
