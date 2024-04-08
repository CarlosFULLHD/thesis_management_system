// AcceptStudentButton.tsx
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  Spinner,
} from "@nextui-org/react";

import { useStudentDashboard } from "../dashboardInformation/providers/StudentDashboardProvider";

interface AcceptStudentButtonProps {
  idPerson: number;
}

const AcceptStudentButton = ({ idPerson }: AcceptStudentButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [conditions, setConditions] = useState("");
  const { acceptStudent } = useStudentDashboard();
  const handleAccept = async () => {
    onClose(); //cerrar modal
    try {
      await acceptStudent(idPerson, conditions);
    } catch (error) {
      console.error("Error al aceptar al estudiante:", error);
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
          <ModalBody>
            <Textarea
              fullWidth
              label="Condiciones de inscripción"
              placeholder="Deje este campo vacío si no hubo condiciones de inscripción"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="success" onClick={handleAccept}>
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AcceptStudentButton;
