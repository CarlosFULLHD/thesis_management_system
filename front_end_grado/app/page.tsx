"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import MostrarInformacionPublica from "./Informacion-publica/Mostrar-info-publica/page";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <section className="">
      <HeroSection />
      <MostrarInformacionPublica />
    </section>
  );
}
