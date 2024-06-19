"use client";
import React, { useState, FormEvent } from "react";
import { Input } from "@nextui-org/input";
import { MailIcon } from "@/components/icons/MailIcon";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";
import { useStudents } from "../_providers/studentProvider";

export default function FormRegistration() {
  const { addStudent } = useStudents();
  const [studentData, setStudentData] = useState({
    ci: "",
    name: "",
    fatherLastName: "",
    motherLastName: "",
    description: "",
    email: "",
    cellPhone: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};
    const ciRegex = /^[0-9]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!studentData.ci || !ciRegex.test(studentData.ci)) {
      newErrors.ci = "El Carnet de Identidad debe ser un número.";
    }
    if (!studentData.cellPhone || !phoneRegex.test(studentData.cellPhone)) {
      newErrors.cellPhone = "El celular debe ser un número.";
    }
    if (!studentData.email) {
      newErrors.email = "El correo es obligatorio.";
    }
    if (!studentData.name) {
      newErrors.name = "El nombre es obligatorio.";
    }
    if (!studentData.fatherLastName) {
      newErrors.fatherLastName = "El apellido paterno es obligatorio.";
    }
    if (!studentData.motherLastName) {
      newErrors.motherLastName = "El apellido materno es obligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateInputs()) return;

    let email = studentData.email;
    const domain = "@ucb.edu.bo";
    if (!email.includes("@")) {
      email += domain;
    } else if (!email.endsWith(domain)) {
      email = email.split("@")[0] + domain;
    }

    const formattedData = {
      ...studentData,
      email,
    };

    try {
      toast.promise(addStudent(formattedData), {
        pending: "Enviando formulario...",
        success: "Formulario enviado con éxito.",
        error: {
          render({ data }: { data: any }) {
            return (
              data?.response?.data?.message ||
              "Error al enviar el formulario. Verifique los datos e intente nuevamente."
            );
          },
        },
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error(
        "Error al enviar el formulario. Verifique los datos e intente nuevamente."
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white dark:bg-background-dark rounded-lg shadow-lg">
      <form
        className="flex w-full flex-wrap mb-6 gap-6"
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          type="text"
          variant="faded"
          label="Carnet de Identidad:"
          placeholder="Solo dígitos"
          labelPlacement="outside"
          className="w-full text-lg"
          name="ci"
          value={studentData.ci}
          onChange={handleInputChange}
          validationState={errors.ci ? "invalid" : "valid"}
          errorMessage={errors.ci}
        />
        <Input
          type="text"
          isRequired
          variant="faded"
          label="Nombres:"
          placeholder="..."
          labelPlacement="outside"
          className="w-full text-lg"
          name="name"
          value={studentData.name}
          onChange={handleInputChange}
          validationState={errors.name ? "invalid" : "valid"}
          errorMessage={errors.name}
        />
        <Input
          type="text"
          isRequired
          variant="faded"
          label="Apellido Paterno:"
          placeholder="..."
          labelPlacement="outside"
          className="w-full text-lg"
          name="fatherLastName"
          value={studentData.fatherLastName}
          onChange={handleInputChange}
          validationState={errors.fatherLastName ? "invalid" : "valid"}
          errorMessage={errors.fatherLastName}
        />
        <Input
          isRequired
          type="text"
          variant="faded"
          label="Apellido Materno:"
          placeholder="..."
          labelPlacement="outside"
          className="w-full text-lg"
          name="motherLastName"
          value={studentData.motherLastName}
          onChange={handleInputChange}
          validationState={errors.motherLastName ? "invalid" : "valid"}
          errorMessage={errors.motherLastName}
        />
        <Input
          type="text"
          label="Email Institucional:"
          placeholder="nombre.apellido"
          labelPlacement="outside"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">@ucb.edu.bo</span>
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            </div>
          }
          className="w-full text-lg"
          name="email"
          value={studentData.email}
          onChange={handleInputChange}
          validationState={errors.email ? "invalid" : "valid"}
          errorMessage={errors.email}
        />
        <Input
          isRequired
          type="tel"
          label="Celular:"
          placeholder="7321321"
          labelPlacement="outside"
          className="w-full text-lg"
          name="cellPhone"
          value={studentData.cellPhone}
          onChange={handleInputChange}
          validationState={errors.cellPhone ? "invalid" : "valid"}
          errorMessage={errors.cellPhone}
        />
        {errors.form && (
          <div className="w-full text-red-500 text-lg font-bold">
            {errors.form}
          </div>
        )}
        <Button
          type="submit"
          className="w-full bg-yellow-light dark:bg-yellow-dark text-black font-bold text-lg py-4 hover:bg-yellow-light transition duration-300"
        >
          Enviar
        </Button>
      </form>
    </div>
  );
}
