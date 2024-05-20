"use client";
import React from "react";
import { Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { MailIcon } from "@/components/icons/MailIcon";
import { FormEvent } from "react";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useProfessors } from "../form_docentes/providers/ProfessorProvider";
export default function FormRegistration() {
  const { addProfessor } = useProfessors();
  const [professorData, setProfessorData] = useState({
    ci: "",
    name: "",
    fatherLastName: "",
    motherLastName: "",
    description: "",
    email: "",
    cellPhone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfessorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProfessor(professorData);
    } catch (error) {
      console.error("Error al registrar el profesor:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex w-full flex-wrap mb-6 md:mb-0 gap-4 "
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          type="text"
          variant="faded"
          label="Carnet de Identidad:"
          placeholder="123123123 - Solo números"
          labelPlacement="outside"
          name="ci"
          value={professorData.ci}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          isRequired
          variant="faded"
          label="Nombres:"
          placeholder="..."
          labelPlacement="outside"
          name="name"
          value={professorData.name}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          isRequired
          variant="faded"
          label="Apellido Paterno:"
          placeholder="..."
          labelPlacement="outside"
          name="fatherLastName"
          value={professorData.fatherLastName}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          type="text"
          variant="faded"
          label="Apellido Materno:"
          placeholder="..."
          labelPlacement="outside"
          name="motherLastName"
          value={professorData.motherLastName}
          onChange={handleInputChange}
        />

        <Textarea
          variant="flat"
          label="Información Personal:"
          labelPlacement="outside"
          placeholder="Puede llenar su información después"
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          value={professorData.description}
          onChange={handleInputChange}
        />

        {/* <Input
          isRequired
          type="text"
          variant="faded"
          label="Descripción:"
          placeholder="NULLO??"
          labelPlacement="outside"
          name="description"
          value={professorData.description}
          onChange={handleInputChange}
        /> */}

        <Input
          isRequired
          type="email"
          label="Email Institucional:"
          placeholder="nombreapellido@ucb.edu.bo"
          labelPlacement="outside"
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          name="email"
          value={professorData.email}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          type="tel"
          label="Celular:"
          placeholder="7321321"
          labelPlacement="outside"
          name="cellPhone"
          value={professorData.cellPhone}
          onChange={handleInputChange}
        />

        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
}
