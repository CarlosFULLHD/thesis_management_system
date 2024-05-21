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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
}

const RejectStudentButton = ({
  idPerson,
  setLoading,
  disabled,
}: RejectStudentButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { rejectStudent, refreshStudents } = useStudentDashboard();

  const handleReject = async () => {
    onClose(); //cerrar modal
    setLoading(true); // Inicia la carga
    try {
      await rejectStudent(idPerson);
    } catch (error) {
      console.error("Error al aceptar al estudiante:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button color="danger" onClick={onOpen} disabled={disabled}>
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
