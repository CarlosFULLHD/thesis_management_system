"use client";
import { title } from "@/components/primitives";
import FormRegistration from "../components/formRegistration";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import { ProfessorProvider } from "../form_docentes/providers/ProfessorProvider";

export default function Form() {
  return (
    <ReactQueryClientProvider>
      <ProfessorProvider>
        <div className="">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark pb-6">
            Formulario Docente
          </h1>

          <FormRegistration />
          <br />
          <p className="italic">
            En caso de cualquier problema comunicarse a{" "}
            <span className="font-bold">centrodeayuda@ucb.edu.bo</span>
          </p>
        </div>
      </ProfessorProvider>
    </ReactQueryClientProvider>
  );
}
