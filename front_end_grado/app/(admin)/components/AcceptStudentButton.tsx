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
import axios from "axios";
import { BASE_URL } from "@/config/globals";

interface AcceptStudentButtonProps {
  idPerson: number;
}

const AcceptStudentButton = ({ idPerson }: AcceptStudentButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [conditions, setConditions] = useState("");

  const handleAccept = async () => {
    try {
      // Primero actualizamos la descripción
      const patchResponse = await axios.patch(
        `${BASE_URL}student/update-description/${idPerson}`,
        {
          description: conditions,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (patchResponse.status === 200) {
        // Después creamos la nueva cuenta del estudiante
        const postResponse = await axios.post(
          `${BASE_URL}users/student`,
          {
            personIdPerson: {
              idPerson,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (postResponse.status === 201) {
          alert("Estudiante aceptado y cuenta creada con éxito.");
          onClose();
          // Aquí puedes agregar lógica adicional si es necesario, como refrescar los datos.
        }
      }
    } catch (error: any) {
      console.error(
        "Error al procesar la acción:",
        error.response?.data || error.message
      );
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
