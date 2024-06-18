import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { BASE_URL } from "@/config/globals";

interface DeleteButtonProps {
    idDesertion: number;
    onSuccess: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ idDesertion, onSuccess }) => {
    const [visible, setVisible] = useState(false);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
        onClose: () => setVisible(false),
        onOpen: () => setVisible(true),
    });

    const deleteDesertion = async () => {
        try {
            await axios.post(`${BASE_URL}desertion/accept/${idDesertion}`);
            alert('Solicitud de abandono aceptada con éxito.');
            onSuccess();
        } catch (error) {
            console.error('Error durante la eliminación:', error);
        }
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
