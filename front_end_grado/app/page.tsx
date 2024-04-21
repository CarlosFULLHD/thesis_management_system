"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import MostrarInformacionPublica from "./Informacion-publica/Mostrar-info-publica/page";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Gestiona los&nbsp;</h1>
        <h1 className={title({ color: "blue" })}>Proyectos de Grado&nbsp;</h1>
      </div>
      <MostrarInformacionPublica />
    </section>
  );
}
