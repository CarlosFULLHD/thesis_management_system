import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/globals";

interface AcceptChangeProps {
  userId: number;
  formData: {
    name: string;
    fatherLastName: string;
    motherLastName: string;
    ci: string;
    description: string;
    email: string;
    cellPhone: string;
    role: string;
  };
  onCloseParentModal: () => void;
  refreshUsers: () => void;
}

const AcceptChange: React.FC<AcceptChangeProps> = ({
  userId,
  formData,
  onCloseParentModal,
  refreshUsers,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAccept = async () => {
    try {
      const response = await axios.put(`${BASE_URL}users/${userId}`, {
        userId,
        ci: formData.ci,
        name: formData.name,
        fatherLastName: formData.fatherLastName,
        motherLastName: formData.motherLastName,
        description: formData.description,
        email: formData.email,
        cellPhone: formData.cellPhone,
        status: 1, // or whatever the appropriate status should be
        idRole: parseInt(formData.role),
      });
      if (response.status === 200) {
        toast.success("Usuario actualizado correctamente.");
        refreshUsers();
        onClose();
        onCloseParentModal(); // Cerrar el modal principal también
      } else {
        toast.error("Error al actualizar el usuario.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar el usuario.");
    }
  };

  return (
    <>
      <Button color="primary" onClick={onOpen}>
        Guardar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Confirmar Cambios</ModalHeader>
          <ModalBody>
            ¿Estás seguro de que deseas guardar los cambios realizados?
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="primary" onClick={handleAccept}>
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AcceptChange;
