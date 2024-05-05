"use client";
import React from "react";
import { Input } from "@nextui-org/input";
import { MailIcon } from "@/components/icons/MailIcon";
import { FormEvent } from "react";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useStudents } from "../_providers/studentProvider";
export default function FormRegistration() {
  const { addStudent } = useStudents();
  // const [driveLinks, setDriveLinks] = useState([""]);
  const [studentData, setStudentData] = useState({
    ci: "",
    name: "",
    fatherLastName: "",
    motherLastName: "",
    description: "",
    email: "",
    cellPhone: "",
  });

  // Handle the input change for student data
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to add a new Drive link input
  // const addDriveLink = () => {
  //   setDriveLinks([...driveLinks, ""]);
  // };
  // const removeDriveLink = (index: number) => {
  //   if (driveLinks.length > 1) {
  //     const newDriveLinks = driveLinks.filter((_, i) => i !== index);
  //     setDriveLinks(newDriveLinks);
  //   }
  // };
  // Handle the change of each Drive link input
  // const handleDriveLinkChange = (index: number, value: string) => {
  //   const newDriveLinks = [...driveLinks];
  //   newDriveLinks[index] = value;
  //   setDriveLinks(newDriveLinks);
  // };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Construir el objeto de datos del estudiante con los enlaces de Drive.
    const formattedData = {
      ...studentData,
      // pdfDriveUrls: driveLinks.filter((link) => link),
    };

    try {
      // Llamar al contexto del estudiante para agregar un nuevo estudiante.
      await addStudent(formattedData);
      alert("Formulario enviado con éxito.");
      // Aquí manejarías la respuesta exitosa, como limpiar el formulario.
    } catch (error) {
      // Aquí manejarías errores de la petición.
    }
  };
  // Combine studentData with driveLinks and send the POST request

  // Here you would send the data to the server using POST request

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
          value={studentData.ci}
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
          value={studentData.name}
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
          value={studentData.fatherLastName}
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
          value={studentData.motherLastName}
          onChange={handleInputChange}
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
          name="email"
          value={studentData.email}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          type="tel"
          label="Celular:"
          placeholder="7321321"
          labelPlacement="outside"
          name="cellPhone"
          value={studentData.cellPhone}
          onChange={handleInputChange}
        />

        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
}
