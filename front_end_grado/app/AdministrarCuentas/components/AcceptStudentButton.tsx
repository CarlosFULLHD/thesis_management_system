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
} from "@nextui-org/react";

import { useStudentDashboard } from "../dashboardInformation/providers/StudentDashboardProvider";

interface AcceptStudentButtonProps {
  idPerson: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
}
// Se usa `disabled` para controlar el estado del botón
// Se usa `setLoading` para actualizar el estado de carga en `StudentDashboard`

const AcceptStudentButton = ({
  idPerson,
  setLoading,
  disabled,
}: AcceptStudentButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [conditions, setConditions] = useState("");
  const { acceptStudent, refreshStudents } = useStudentDashboard();
  const handleAccept = async () => {
    setLoading(true);
    onClose(); // Cerrar el modal
    try {
      await acceptStudent(idPerson, conditions);
    } catch (error) {
      console.error("Error al aceptar al estudiante:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button color="success" onClick={onOpen} disabled={disabled}>
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
