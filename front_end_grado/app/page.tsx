"use client"

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { compileAcceptEmailTemplate, sendMail } from "@/lib/mail";

//-----------------Email test------------------------
import { useState } from "react";
import AcceptStudentModal from "./StudentsList/Components/acceptStudentModal";
import { IoMdCloseCircleOutline } from "react-icons/io";
//---------------------------------------------------

export default function Home() {
  //---------------Show PopUp test----------------
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  /*---------------Send Email test----------------
  const send = async() => {
    "use server"
    await sendMail({
      to: "tallergradoucb@gmail.com",
      name: "Test User",
      subject: "Test Email",
      body: compileAcceptEmailTemplate("Test User", "Test Observations")
    })
  }
  //---------------------------------------------------*/

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
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
              <h1 className="text-white text-3x1 font-semibold text-center">¿Está seguro de aceptar al estudiante?</h1>
              <IoMdCloseCircleOutline onClick={toggleModal} className="text-3x1 cursor-pointer"/>
            </div>
            <form>
                <textarea
                    /*value={observarions}
                    onChange={(e) => setObservations(e.target.value)}*/
                    placeholder="Observaciones"
                    className="w-full px-4 border-gray-300 rounded-md"
                />
                <br />
                <button className="mt-4 flex items-center justify-left gap-2 px-5 py-3 font-medium rounded-md" type="submit">Aceptar estudiante</button>
            </form>
          </AcceptStudentModal>
      </div>

    </section>
  );
}
