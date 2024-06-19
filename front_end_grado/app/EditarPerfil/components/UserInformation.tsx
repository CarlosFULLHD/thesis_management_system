"use client";
import React, { useState, useEffect } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useUserInformation } from "../providers/UserInformationProvider";
import SubjectsModal from "../components/subjectModal";

export default function UserInformation() {
  interface UserInformation {
    ci: string;
    name: string;
    fatherLastName: string;
    motherLastName: string;
    description: string;
    email: string;
    cellPhone: string;
    imageUrl: string;
    subjects: Subject[];
    socialNetworks: SocialNetwork[];
  }
  interface Subject {
    id: number;
    subjectName: string;
    comments: string;
  }

  interface SocialNetwork {
    id: number;
    urlLinkedin: string;
  }

  const { userInformation, loading, error, updateUserInformation } =
    useUserInformation();
  const [formData, setFormData] = useState<UserInformation>({
    ci: "",
    name: "",
    fatherLastName: "",
    motherLastName: "",
    description: "",
    email: "",
    cellPhone: "",
    imageUrl: "",
    subjects: [],
    socialNetworks: [],
  });
  const [isChanged, setIsChanged] = useState(false);
  const [isSubjectsModalOpen, setIsSubjectsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userInformation) {
      setFormData(userInformation);
    }
  }, [userInformation]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsChanged(true);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserInformation(formData);
    setIsChanged(false);
  };

  const openSubjectsModal = () => setIsSubjectsModalOpen(true);
  const closeSubjectsModal = () => setIsSubjectsModalOpen(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userInformation) {
    return <div>No user information found.</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white dark:bg-background-dark rounded-lg shadow-lg">
      <form
        className="flex flex-col w-full lg:w-3/6 mx-auto flex-wrap mb-6 gap-6"
        onSubmit={handleSave}
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
          value={formData.ci}
          onChange={handleInputChange}
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
          value={formData.name}
          onChange={handleInputChange}
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
          value={formData.fatherLastName}
          onChange={handleInputChange}
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
          value={formData.motherLastName}
          onChange={handleInputChange}
        />
        <Textarea
          variant="faded"
          label="Descripción:"
          placeholder="..."
          labelPlacement="outside"
          className="w-full text-lg"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          variant="faded"
          label="Email Institucional:"
          placeholder="nombre.apellido"
          labelPlacement="outside"
          className="w-full text-lg"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          type="tel"
          variant="faded"
          label="Celular:"
          placeholder="7321321"
          labelPlacement="outside"
          className="w-full text-lg"
          name="cellPhone"
          value={formData.cellPhone}
          onChange={handleInputChange}
        />
        <div className="flex flex-col lg:flex-row w-full gap-2">
          <Textarea
            type="text"
            variant="faded"
            label="URL de Imagen:"
            placeholder="https://example.com"
            labelPlacement="outside"
            className="w-full lg:w-4/5 text-lg"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
          <img
            className="rounded-sm w-full lg:w-1/5"
            src={formData.imageUrl}
            alt="User Avatar"
          />
        </div>

        <div className="flex w-full justify-between mt-4">
          <Button
            type="button"
            className="w-full lg:w-1/2 mr-2 bg-gray-300 text-black font-bold text-lg py-4 hover:bg-gray-400 transition duration-300"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="w-full lg:w-1/2 bg-yellow-light dark:bg-yellow-dark text-black font-bold text-lg py-4 hover:bg-yellow-light transition duration-300"
            disabled={!isChanged}
          >
            Guardar
          </Button>
        </div>
        <div className="flex w-full justify-between mt-4">
          <Button
            type="button"
            className="w-full lg:w-1/2 mr-2 bg-blue-500 text-white font-bold text-lg py-4 hover:bg-blue-600 transition duration-300"
            onClick={openSubjectsModal}
          >
            <Star className="mr-2" /> Editar Especialidades
          </Button>
        </div>
      </form>

      <SubjectsModal
        isOpen={isSubjectsModalOpen}
        onClose={closeSubjectsModal}
      />
    </div>
  );
}
