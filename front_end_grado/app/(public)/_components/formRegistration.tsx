"use client";
import React from "react";
import { Input } from "@nextui-org/input";
import { MailIcon } from "@/components/icons/MailIcon";
import { FormEvent } from "react";
import { Button } from "@nextui-org/button";
import { useState } from "react";
async function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const response = await fetch("/api/submit", {
    method: "POST",
    body: formData,
  });

  // Handle response if necessary
  const data = await response.json();
  // ...
}
export default function FormRegistration() {
  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let isValid = true;

    if (isValid) {
      // Aquí iría la lógica para enviar los datos del formulario a tu API
      console.log("Formulario enviado");
    }
  };

  //Para borrar el campo de url de manera correcta, isClearable esta bugueado
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex w-full flex-wrap mb-6 md:mb-0 gap-4 "
        onSubmit={onSubmit}
      >
        <Input
          isRequired
          type="text"
          variant="faded"
          label="Carnet de Identidad:"
          placeholder="55555555LP"
          labelPlacement="outside"
        />
        <Input
          type="text"
          isRequired
          variant="faded"
          label="Nombre:"
          placeholder="..."
          labelPlacement="outside"
        />
        <Input
          type="text"
          isRequired
          variant="faded"
          label="Apellido Paterno:"
          placeholder="..."
          labelPlacement="outside"
        />
        <Input
          isRequired
          type="text"
          variant="faded"
          label="Apellido Materno:"
          placeholder="..."
          labelPlacement="outside"
        />
        <Input
          isRequired
          type="text"
          variant="faded"
          label="Descripción:"
          placeholder="NULLO??"
          labelPlacement="outside"
        />
        <Input
          isRequired
          type="email"
          label="Email Institucional:"
          placeholder="nombre.apellido@ucb.edu.bo"
          labelPlacement="outside"
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Input
          isRequired
          type="tel"
          label="Celular:"
          placeholder="7777777"
          labelPlacement="outside"
        />
        <Input
          isRequired
          type="url"
          label="Carta en PDF Drive:"
          placeholder="https://drive.google.com/..."
          labelPlacement="outside"
          // PARA LIMPIAR:
          value={value}
          isClearable
          onValueChange={setValue}
          onClear={() => setValue("")}
        />

        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
}
