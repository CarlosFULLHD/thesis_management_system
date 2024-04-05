import React from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { FaTimes } from 'react-icons/fa';
import axios from "axios";
import { BASE_URL } from "@/config/globals";

// Definir la interfaz para las propiedades del componente
interface RejectStudentButtonProps {
  idPerson: number;
  onRejection: () => void; // Añadir un callback para realizar acciones después del rechazo.
}

const RejectStudentButton = ({ idPerson, onRejection }: RejectStudentButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const rejectStudent = async (): Promise<void> => {
    try {
      const response = await axios.put(`${BASE_URL}person/${idPerson}`, {
        description: "Rechazado por no cumplir con los requisitos necesarios",
        status: 0
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === '200') {
        alert("Estudiante rechazado con éxito.");
        onRejection(); // Invocar la función pasada como prop para refrescar la lista
        onClose();
      }
    } catch (error: any) {
      console.error('Error al rechazar al estudiante:', error.response?.data || error.message);
      onClose();
    }
  };

  return (
    <>
      <Button color="danger" onClick={onOpen} >
        Rechazar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Confirmar Acción</ModalHeader>
          <ModalBody>¿Estás seguro de que quieres rechazar a este estudiante?</ModalBody>
          <ModalFooter>
            <Button  color="danger" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={rejectStudent} color="danger">
              Rechazar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RejectStudentButton;
