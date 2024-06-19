import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { BASE_URL } from "@/config/globals";
import { toast } from "react-toastify";
import { useDesertions } from '../providers/DesertionProviders';

interface DeleteButtonProps {
    idDesertion: number;
    onSuccess: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ idDesertion, onSuccess }) => {
    const [visible, setVisible] = useState(false);
    const { acceptDesertion } = useDesertions();

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
        onClose: () => setVisible(false),
        onOpen: () => setVisible(true),
    });

    const deleteDesertion = () => {
        toast.promise(
            acceptDesertion(idDesertion)
                .then(() => {
                    toast.success("Solicitud de abandono aceptada con éxito.");
                    onSuccess();
                })
                .catch((error) => {
                    console.error('Error durante la eliminación:', error);
                    toast.error('Error durante la eliminación');
                }),
            {
                pending: '',
                success: '',
                error: '',
            }
        );
        onClose();  // Cierra el modal después de la eliminación
    };

    return (
        <>
            <Button color="warning" onClick={onOpen}>
                Aceptar
            </Button>
            <Modal closeButton aria-labelledby="modal-title" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <h1>Confirmar Eliminación</h1>
                            </ModalHeader>
                            <ModalBody>
                                <p>¿Estás seguro de que deseas eliminar esta deserción? Esta acción es irreversible.</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button onClick={deleteDesertion}>
                                    Confirmar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteButton;
