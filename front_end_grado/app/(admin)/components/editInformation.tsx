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
export default function EditInformation() {
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
          label="Creador:"
          placeholder="55555555LP"
          labelPlacement="outside"
        />
        <Input
          type="text"
          isRequired
          variant="faded"
          label="Rol:"
          placeholder="..."
          labelPlacement="outside"
        />
        <Input
          type="text"
          isRequired
          variant="faded"
          label="Titulo:"
          placeholder="..."
          labelPlacement="outside"
        />
        <Input
          isRequired
          type="text"
          variant="faded"
          label="Detalle:"
          placeholder="..."
          labelPlacement="outside"
        />
        <Input
          isRequired
          type="text"
          variant="faded"
          label="Fecha creación:"
          placeholder="..."
          labelPlacement="outside"
        />

        <Button type="submit">Guardar</Button>
      </form>
    </div>
  );
}
