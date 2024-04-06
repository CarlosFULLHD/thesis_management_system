import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

import { useStudentDashboard } from "../dashboardInformation/providers/StudentDashboardProvider";
// Definir la interfaz para las propiedades del componente
interface RejectStudentButtonProps {
  idPerson: number;
  onRejection: () => void; // Añadir un callback para realizar acciones después del rechazo.
}

const RejectStudentButton = ({
  idPerson,
  onRejection,
}: RejectStudentButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { rejectStudent } = useStudentDashboard();

  const handleReject = async () => {
    await rejectStudent(idPerson);
    onClose(); // Cerrar el modal después de la operación
  };

  return (
    <>
      <Button color="danger" onClick={onOpen}>
        Rechazar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Confirmar Acción</ModalHeader>
          <ModalBody>
            ¿Estás seguro de que quieres rechazar a este estudiante?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleReject} color="danger">
              Rechazar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RejectStudentButton;
