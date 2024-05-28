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
import { toast } from "react-toastify";
import { useUserDashboard } from "../providers/UserDashboardProvider";
import { FaCheck, FaTrash } from "react-icons/fa";
import { Delete, Edit } from "lucide-react";

interface DeleteUserConfirmModalProps {
  userId: number;
  username: string;
  onCloseParentModal: () => void;
  fetchUsers: () => void;
}

const DeleteUserConfirmModal: React.FC<DeleteUserConfirmModalProps> = ({
  userId,
  username,
  onCloseParentModal,
  fetchUsers,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { deleteUser } = useUserDashboard();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(userId);
      toast.success("Usuario eliminado correctamente.");
      fetchUsers();
      onClose();
      onCloseParentModal();
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      toast.error("Error al eliminar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        color="danger"
        variant="ghost"
        onClick={onOpen}
        startContent={<FaTrash />}
      >
        Eliminar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Confirmar Eliminación</ModalHeader>
          <ModalBody>
            ¿Estás seguro de que deseas eliminar el usuario {username}?
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="danger" onClick={handleDelete} isLoading={loading}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteUserConfirmModal;
