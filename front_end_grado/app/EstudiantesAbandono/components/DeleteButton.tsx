import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { BASE_URL } from "@/config/globals";
import DesertionTable from './DesertionStudentsTable';

interface DeleteButtonProps {
    idDesertion: number;
    onSuccess: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ idDesertion, onSuccess }) => {
    const [visible, setVisible] = useState(false);

    const handler = () => setVisible(true);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const closeHandler = () => {
        setVisible(false);
    };

    const deleteDesertion = async () => {
        try {
            await axios.post(`${BASE_URL}desertion/accept/${idDesertion}`);
            alert('Solicitud de abandono aceptada con éxito.');
            onSuccess(); 
        } catch (error) {
            console.error('Error durante la eliminación:', error);
        }
        closeHandler();
    };

    return (
        <>
            <Button color="warning" onClick={handler} onPress={onOpen}>
                Aceptar
            </Button>
            <Modal closeButton aria-labelledby="modal-title" isOpen={isOpen} onClose={closeHandler}>
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader>
                        <h1>
                            Confirmar Eliminación
                        </h1>
                    </ModalHeader>
                    <ModalBody>
                        <p>¿Estás seguro de que deseas eliminar esta deserción? Esta acción es irreversible.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={closeHandler} onPress={onClose}>
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
