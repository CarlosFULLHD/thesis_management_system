import React from "react";
import { Accordion, AccordionItem, Avatar, Button } from "@nextui-org/react";

export const HeroSection = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

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
            <h2 className="text-mg tracking-tighter pt-3 md:px-32 lg:text-2xl xl:text-2xl">
              Nuestro sistema te acompaña en cada paso para alcanzar tus metas
              académicas de manera efectiva y organizada.
            </h2>

            <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-center lg:gap-10 lg:w-full">
              <div className="w-full px-5 lg:w-auto">
                <Button
                  onClick={() => {
                    const section = document.getElementById("modalidades");
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full md:w-80 lg:mt-7 mx-auto text-xl font-bold bg-yellow-light dark:bg-yellow-dark hover:text-black shadow-lg shadow-blue-light  text-white py-6 px-6 lg:px-10 flex items-center justify-center relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
                >
                  Descubre Más
                </Button>
              </div>
              <div className="w-full px-4 lg:w-auto mt-4 lg:mt-0 lg:px-0">
                <Button
                  href="#inscripcion"
                  className="w-full md:w-80 mx-auto text-xl lg:text-xl font-bold text-yellow-dark md:mt-6  py-6 px-6 lg:px-10 flex items-center justify-center"
                >
                  Inscríbete Ahora ⮕
                </Button>
              </div>
            </div>
          </div>

          <div
            id="modalidades"
            className="relative py-6 md:mt-16 px-4 lg:px-16 mx-4 w-full"
          >
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/3 px-4">
                <Accordion selectionMode="multiple">
                  <AccordionItem
                    key="1"
                    aria-label="Tesis o Proyecto de Grado"
                    startContent={
                      <Avatar
                        isBordered
                        color="primary"
                        radius="lg"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      />
                    }
                    title="Tesis/Proyecto Grado"
                  >
                    <p className="text-sm">
                      Necesitas proponer un tema. Revisa proyectos anteriores en
                      la pestaña "Herramienta de Proyectos Pasados".
                    </p>
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="Graduación por Excelencia"
                    startContent={
                      <Avatar
                        isBordered
                        color="success"
                        radius="lg"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      />
                    }
                    title="Graduación Excelencia"
                  >
                    <p className="text-sm">
                      Necesitas tener notas por encima de 90, sin ninguna
                      materia reprobada o abandonada en toda la malla
                      curricular.
                    </p>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="w-full lg:w-1/3 px-4">
                <Accordion selectionMode="multiple">
                  <AccordionItem
                    key="3"
                    aria-label="Trabajo Dirigido"
                    startContent={
                      <Avatar
                        isBordered
                        color="warning"
                        radius="lg"
                        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                      />
                    }
                    title="Trabajo Dirigido"
                  >
                    <p className="text-sm">
                      Necesitarás hacer un trabajo específico en una empresa,
                      esto se coordina junto a un tutor de la empresa a la que
                      harás el trabajo, al igual que un tutor para la UCB que
                      vea tu progreso. Tienes que cumplir un objetivo dentro de
                      la empresa para aprobar exitosamente.
                    </p>
                  </AccordionItem>
                  <AccordionItem
                    key="4"
                    aria-label="Requisitos Académicos"
                    startContent={
                      <Avatar
                        isBordered
                        color="primary"
                        radius="lg"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      />
                    }
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
                </Accordion>
              </div>
              <div className="w-full lg:w-1/3 px-4">
                <Accordion selectionMode="multiple">
                  <AccordionItem
                    key="5"
                    aria-label="Proceso de Inscripción"
                    startContent={
                      <Avatar
                        isBordered
                        color="success"
                        radius="lg"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      />
                    }
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
                    key="6"
                    aria-label="Fechas Importantes"
                    startContent={
                      <Avatar
                        isBordered
                        color="warning"
                        radius="lg"
                        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                      />
                    }
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
        </div>
      </div>
    </>
  );
};
