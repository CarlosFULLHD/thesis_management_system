import React from "react";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/react";

export const HeroSection = () => {
  return (
    <>
      <div className="relative px-0 container flex flex-col lg:flex-row lg:flex-grow xl:max-w-none text-black m-0 text-center">
        <div className="relative z-10 w-full bg-off-white bg-[linear-gradient(to_right,#eaeaea_1px,transparent_1px),linear-gradient(to_bottom,#eaeaea_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="relative py-6 md:mt-28">
            <h1 className="text-4xl font-bold tracking-tighter lg:text-5xl xl:text-7xl md:px-16">
              Facilita tu Camino hacia la Graduación con el
              <span className="underline decoration-8 decoration-yellow-light">
                {" "}
                Sistema de Talleres de Grado
              </span>
            </h1>
            <h2 className="text-2xl tracking-tighter pt-3 md:px-32 lg:text-3xl xl:text-4xl">
              Nuestro sistema te acompaña en cada paso para alcanzar tus metas
              académicas de manera efectiva y organizada.
            </h2>

            <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-center lg:gap-10 lg:w-full">
              <div className="w-full px-4 lg:w-auto">
                <Button
                  onClick={() => {
                    const section = document.getElementById("modalidades");
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full md:w-80 lg:mt-7 mx-auto text-2xl font-bold bg-gradient-to-tr from-yellow-light to-yellow-dark hover:text-black shadow-lg shadow-blue-light  text-white py-6 px-6 lg:px-10 flex items-center justify-center relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
                >
                  Descubre Más
                </Button>
              </div>
              <div className="w-full px-4 lg:w-auto mt-4 lg:mt-0 lg:px-0">
                <Button
                  href="#inscripcion"
                  className="w-full md:w-80 mx-auto text-xl lg:text-2xl font-bold text-custom-orange py-6 px-6 lg:px-10 flex items-center justify-center"
                >
                  Inscríbete Ahora ⮕
                </Button>
              </div>
            </div>
          </div>

          <div
            id="modalidades"
            className="relative py-6 md:mt-16 px-4 lg:px-16"
          >
            <h2 className="text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl md:px-16 mb-8">
              Modalidades de Graduación
            </h2>
            <p className="text-xl lg:text-2xl mb-4">
              Existen dos modalidades principales para tu graduación:
            </p>
            <ul className="list-disc list-inside text-left text-lg lg:text-xl">
              <li>
                <strong>Tesis o Proyecto de Grado:</strong> Necesitas proponer
                un tema. Revisa proyectos anteriores en la pestaña "Herramienta
                de Proyectos Pasados".
              </li>
              <li>
                <strong>Graduación por Excelencia:</strong> Necesitas tener
                notas por encima de 90, sin ninguna materia reprobada o
                abandonada en toda la malla curricular.
              </li>
              <li>
                <strong>Trabajo Dirigido:</strong> Necesitaras hacer un trabajo
                especifico en una empresa, esto se coordinar junto a un tutor de
                la empresa a la que haras el trabajo al igual que un tutor para
                la UCB que vea tu progreso, tienes que cumplir un objetivo
                dentro de la empresa para aprobar exitosamente.
              </li>
            </ul>
          </div>

          <div className="relative py-6 md:mt-16 px-4 lg:px-16">
            <h2 className="text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl md:px-16 mb-8">
              Requisitos Académicos
            </h2>
            <ul className="list-disc list-inside text-left text-lg lg:text-xl">
              <li>
                Máximo 3 materias cursadas este semestre (pasantía o trabajo
                dirigido cuenta como materia).
              </li>
              <li>
                Completar exitosamente:
                <ul className="list-disc list-inside ml-6">
                  <li>Inglés 4</li>
                  <li>Materias del 2do ciclo o inferiores (1-6 semestre)</li>
                  <li>Las 3 materias religiosas</li>
                </ul>
              </li>
            </ul>
            <p className="text-lg lg:text-xl mt-4">
              Para Taller de Grado 3, solo puedes tomar 1 materia. Completar
              este taller es difícil y reprobar una materia puede hacerte perder
              Taller de Grado 2. Consulta casos especiales con la dirección de
              carrera.
            </p>
            <p className="text-lg lg:text-xl mt-4">
              <strong>Elección de Tutor:</strong> Busca un tutor relacionado con
              tu tema en la pestaña "Encontrar Tutor". Si no encuentras uno, se
              te asignará un tutor adecuado.
            </p>
          </div>

          <div
            id="inscripcion"
            className="relative py-6 md:mt-16 px-4 lg:px-16"
          >
            <h2 className="text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl md:px-16 mb-8">
              Proceso de Inscripción
            </h2>
            <ol className="list-decimal list-inside text-left text-lg lg:text-xl">
              <li>Descarga el formato para la propuesta de tu tema y tutor.</li>
              <li>
                Llena cuidadosamente el formulario con tus datos personales.
              </li>
              <li>
                Añade el link del PDF de tu carta guardado en tu drive académico
                y comparte el link con vista pública.
              </li>
              <li>Imprime tu carta y entrégala al director de carrera.</li>
              <li>
                El director debe aprobar tu solicitud para que accedas al
                sistema y recibas la respuesta de tu propuesta de grado.
              </li>
            </ol>
          </div>

          <div className="relative py-6 md:mt-16 px-4 lg:px-16">
            <h2 className="text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl md:px-16 mb-8">
              Notas de la Propuesta de Grado
            </h2>
            <ul className="list-disc list-inside text-left text-lg lg:text-xl">
              <li>
                <strong>Aprobado:</strong> La propuesta es aceptada.
              </li>
              <li>
                <strong>Aprobado con Observaciones:</strong> Tema interesante,
                pero requiere mejor redacción y claridad.
              </li>
              <li>
                <strong>Observado:</strong> Tema no aceptado ni rechazado,
                requiere un aporte significativo.
              </li>
              <li>
                <strong>Rechazado:</strong> Falta de aporte, tema repetido,
                tecnologías obsoletas.
              </li>
            </ul>
          </div>

          <div className="relative py-6 md:mt-16 px-4 lg:px-16">
            <h2 className="text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl md:px-16 mb-8">
              Fechas Importantes
            </h2>
            <ul className="list-disc list-inside text-left text-lg lg:text-xl">
              <li>Límite para enviar tu carta: 18 de febrero de 2024.</li>
              <li>
                Recibirás la respuesta a partir de la segunda semana de inicio
                de clases.
              </li>
              <li>
                Tienes 2 semanas antes del siguiente consejo de carrera para
                enviar una nueva propuesta si la anterior fue rechazada. Puedes
                enviar tu propuesta hasta 3 veces.
              </li>
            </ul>
          </div>

          <div className="relative py-6 md:mt-16 px-4 lg:px-16">
            <h2 className="text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl md:px-16 mb-8">
              Documentación para la Inscripción
            </h2>
            <p className="text-lg lg:text-xl">
              Lee estos documentos para tener un buen conocimiento sobre:
            </p>
            <ul className="list-disc list-inside text-left text-lg lg:text-xl">
              <li>Taller de Grado</li>
              <li>Tesis de Grado</li>
              <li>Graduación por Excelencia</li>
              <li>Trabajo Dirigido</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
