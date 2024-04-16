"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

//-----------------Email test------------------------
import { useState } from "react";
import { replaceTemplateVars, sendEmail } from "./Email/sendEmail";
//------------------Modal test--------------------------
import AcceptStudentModal from "./StudentsList/Components/acceptStudentModal";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { acceptEmailTemplate } from "./Email/Templates/AcceptEmail";

export default function Home() {
  //---------------Show PopUp test----------------
  const [showModal, setShowModal] = useState(false);
  const [observations, setObservations] = useState(""); //This is the observations that the teacher write
  const [name, setName] = useState("User test"); //This is the name of the student that show in the email

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  //---------------Email test----------------
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const emailBody = replaceTemplateVars(
      acceptEmailTemplate,
      name,
      observations
    ); //This is the email body that the teacher send to the student
    const emailstudent = "brenda.gutierrez@ucb.edu.bo";
    await sendEmail(emailstudent, "Test Email", emailBody); //Student email, subject, body
  };
  //------------------------------------------------
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Gestiona los&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Proyectos de Grado&nbsp;</h1>
        <br />
        {/* <h1 className={title()}>
            websites regardless of your design experience.
          </h1> */}
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          href={siteConfig.links.docs}
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideSymbol hideCopyButton variant="flat">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>

      {/* <main>
          <form>
            <Button type="submit" formAction={send}>Send</Button>
          </form>
        </main> */}

      <div>
        <button onClick={toggleModal}>Show Modal</button>
        <AcceptStudentModal showModal={showModal} closeModal={toggleModal}>
          <div className="mb-4 flex justify-between">
            <h1 className="text-white text-3x1 font-semibold text-center">
              ¿Está seguro de aceptar al estudiante?
            </h1>
            <IoMdCloseCircleOutline
              onClick={toggleModal}
              className="text-3x1 cursor-pointer"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Observaciones"
              className="w-full px-4 border-gray-300 rounded-md"
            />
            <br />
            <button
              type="submit"
              className="mt-4 flex items-center justify-left gap-2 px-5 py-3 font-medium rounded-md"
            >
              Aceptar estudiante
            </button>
          </form>
        </AcceptStudentModal>
      </div>

      <div>
        <h1>HOla</h1>
      </div>
    </section>
  );
}
