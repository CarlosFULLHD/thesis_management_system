import React from "react";
import { Accordion, AccordionItem, Avatar, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { GraduationCap,
  LaptopIcon,
  BriefcaseBusiness,
  ClipboardList,
  MailPlus,
  CalendarClock
 } from "lucide-react";

export const HeroSection = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -100; // Ajusta este valor según sea necesario
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="relative px-0 container flex flex-col lg:flex-row lg:flex-grow xl:max-w-none text-black dark:text-white m-0 text-center">
        <div className="relative z-10 w-full bg-off-white dark:bg-background-dark bg-[linear-gradient(to_right,#eaeaea_1px,transparent_1px),linear-gradient(to_bottom,#eaeaea_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#1b1b1b_1px,transparent_1px),linear-gradient(to_bottom,#1b1b1b_1px,transparent_1px)]">
          <div className="relative py-6 md:mt-28">
            <h1 className="text-4xl font-bold tracking-tighter lg:text-4xl xl:text-6xl md:px-16">
              Facilita tu Camino hacia la Graduación con el
              <span className="underline decoration-8 decoration-yellow-dark">
                {" "}
                Sistema de Talleres de Grado
              </span>
            </h1>
            <h2 className="text-lg tracking-tighter pt-3 md:px-32 lg:text-2xl xl:text-2xl">
              Nuestro sistema te acompaña en cada paso para alcanzar tus metas
              académicas de manera efectiva y organizada.
            </h2>

            <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-center lg:gap-10 lg:w-full">
              <div className="w-full px-2 lg:w-auto">
                <Button
                  onClick={() => scrollToSection("modalidades")}
                  className="w-full md:w-50 lg:mt-7 mx-auto text-xl font-bold bg-yellow-light dark:bg-yellow-dark hover:text-black shadow-lg shadow-blue-light text-white py-6 px-4 lg:px-5 flex items-center justify-center relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
                >
                  Modalidades
                </Button>
              </div>
              <div className="w-full px-2 lg:w-auto">
                <Button
                  onClick={() => scrollToSection("instrucciones")}
                  className="w-full md:w-50 lg:mt-7 mx-auto text-xl font-bold bg-yellow-light dark:bg-yellow-dark hover:text-black shadow-lg shadow-blue-light text-white py-6 px-4 lg:px-5 flex items-center justify-center relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
                >
                  Instrucciones
                </Button>
              </div>
              <div className="w-full px-2 lg:w-auto">
                <Button
                  onClick={() => scrollToSection("noticias")}
                  className="w-full md:w-50 lg:mt-7 mx-auto text-xl font-bold bg-yellow-light dark:bg-yellow-dark hover:text-black shadow-lg shadow-blue-light text-white py-6 px-4 lg:px-5 flex items-center justify-center relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
                >
                  Noticias
                </Button>
              </div>
              <div className="w-full px-4 lg:w-auto mt-4 lg:mt-0 lg:px-0">
                <Button
                  href="#inscripcion"
                  className="w-full md:w-50 mx-auto text-xl lg:text-xl font-bold text-yellow-dark md:mt-6 py-6 px-4 lg:px-5 flex items-center justify-center"
                >
                  Inscríbete Ahora ⮕
                </Button>
              </div>
            </div>
          </div>

          <div id="modalidades" className="relative py-6 md:mt-16 px-4 lg:px-16 mx-4 w-full">
            <h2 className="text-3xl font-bold tracking-tighter lg:text-2xl xl:text-5xl md:px-16 mb-8">
              Modalidades de Graduación
            </h2>
            <p className="text-xl lg:text-xl mb-4">
              Existen dos modalidades principales para tu graduación:
            </p>
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-1/3 px-4 mb-4">
                <Card>
                  <CardHeader>
                  <div className={`border-2 p-2 rounded-lg border-warning`}>
                    <LaptopIcon size={24} />
                  </div>
                    <h4 className="ml-4">Tesis/Proyecto Grado</h4>
                  </CardHeader>
                  <CardBody>
                    <h5 className="text-sm">
                      Necesitas proponer un tema. Revisa proyectos anteriores en la pestaña "Herramienta de Proyectos Pasados".
                    </h5>
                  </CardBody>
                </Card>
              </div>
              <div className="w-full lg:w-1/3 px-4 mb-4">
                <Card>
                  <CardHeader>
                  <div className={`border-2 p-2 rounded-lg border-primary-500`}>
                    <GraduationCap size={24} />
                  </div>
                    <h4 className="ml-4">Graduación Excelencia</h4>
                  </CardHeader>
                  <CardBody>
                    <h5 className="text-sm">
                      Necesitas tener notas por encima de 90, sin ninguna materia reprobada o abandonada en toda la malla curricular.
                    </h5>
                  </CardBody>
                </Card>
              </div>
              <div className="w-full lg:w-1/3 px-4 mb-4">
                <Card>
                  <CardHeader>
                  <div className={`border-2 p-2 rounded-lg border-warning`}>
                    <BriefcaseBusiness size={24} />
                  </div>
                    <h4 className="ml-4">Trabajo Dirigido</h4>
                  </CardHeader>
                  <CardBody>
                    <h5 className="text-sm">
                      Necesitarás hacer un trabajo específico en una empresa, esto se coordina junto a un tutor de la empresa a la que harás el trabajo, al igual que un tutor para la UCB que vea tu progreso. Tienes que cumplir un objetivo dentro de la empresa para aprobar exitosamente.
                    </h5>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>

          <div id="instrucciones" className="relative py-6 md:mt-16 px-4 lg:px-16 mx-4 w-full">
            <h2 className="text-3xl font-bold tracking-tighter lg:text-2xl xl:text-5xl md:px-16 mb-8">
              Instrucciones
            </h2>
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-2/3 px-4 mb-4">
                <Accordion selectionMode="multiple">
                  <AccordionItem
                    key="1"
                    aria-label="Requisitos Académicos"
                    startContent={<div className={`border-2 p-2 rounded-lg border-primary-500`}>
                    <ClipboardList size={24} />
                  </div>}
                    title="Requisitos Académicos"
                  >
                    <ul className="list-disc list-inside text-left text-sm lg:text-sm">
                      <li>
                        Máximo 3 materias cursadas este semestre (pasantía o
                        trabajo dirigido cuenta como materia).
                      </li>
                      <li>
                        Completar exitosamente:
                        <ul className="list-disc list-inside ml-6">
                          <li>Inglés 4</li>
                          <li>
                            Materias del 2do ciclo o inferiores (1-6 semestre)
                          </li>
                          <li>Las 3 materias religiosas</li>
                        </ul>
                      </li>
                    </ul>
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="Proceso de Inscripción"
                    startContent={<div className={`border-2 p-2 rounded-lg border-warning`}>
                    <MailPlus size={24} />
                  </div>}
                    title="Proceso Inscripción"
                  >
                    <ol className="list-decimal list-inside text-left text-sm lg:text-sm">
                      <li>
                        Descarga el formato para la propuesta de tu tema y
                        tutor.
                      </li>
                      <li>
                        Llena cuidadosamente el formulario con tus datos
                        personales.
                      </li>
                      <li>
                        Añade el link del PDF de tu carta guardado en tu drive
                        académico y comparte el link con vista pública.
                      </li>
                      <li>Imprime tu carta y entrégala al director de carrera.</li>
                      <li>
                        El director debe aprobar tu solicitud para que accedas
                        al sistema y recibas la respuesta de tu propuesta de
                        grado.
                      </li>
                    </ol>
                  </AccordionItem>
                  <AccordionItem
                    key="3"
                    aria-label="Fechas Importantes"
                    startContent={<div className={`border-2 p-2 rounded-lg border-primary-500`}>
                    <  CalendarClock size={24} />
                  </div>}
                    title="Fechas Importantes"
                  >
                    <ul className="list-disc list-inside text-left text-sm lg:text-sm">
                      <li>Límite para enviar tu carta: 18 de febrero de 2024.</li>
                      <li>
                        Recibirás la respuesta a partir de la segunda semana de
                        inicio de clases.
                      </li>
                      <li>
                        Tienes 2 semanas antes del siguiente consejo de carrera
                        para enviar una nueva propuesta si la anterior fue
                        rechazada. Puedes enviar tu propuesta hasta 3 veces.
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <div id="noticias"></div>
        </div>
      </div>
    </>
  );
};
