import React from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { FaCheck } from 'react-icons/fa';
import axios from "axios";
import { BASE_URL } from "@/config/globals";

// Definir la interfaz para las propiedades del componente
interface AcceptStudentButtonProps {
  idPerson: number;
}

const AcceptStudentButton = ({ idPerson }: AcceptStudentButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const acceptStudent = async (): Promise<void> => {
    try {
      const response = await axios.put(`${BASE_URL}person/${idPerson}`, {
        description: "Descripción de aceptación personalizada para el estudiante",
        status: 1
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === '200') {
//         alert("Estudiante aceptado con éxito.");
        onClose();
      }
    } catch (error: any) {
      console.error('Error al aceptar al estudiante:', error.response?.data || error.message);
      onClose();
    }
  };

  return (
    <>
      <Button color="success" onClick={onOpen}>
        Aceptar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Confirmar Acción</ModalHeader>
          <ModalBody>¿Estás seguro de que quieres aceptar a este estudiante?</ModalBody>
          <ModalFooter>
            <Button  color="danger" onClick={onClose}>
              Cancelar
            </Button>
            <Button  onClick={acceptStudent} color="success">
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AcceptStudentButton;
