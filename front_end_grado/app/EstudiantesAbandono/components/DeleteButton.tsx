import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useDesertions } from '../providers/DesertionProviders';

interface DeleteButtonProps {
    idDesertion: number;
    onSuccess: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ idDesertion, onSuccess }) => {
    const [confirmation, setConfirmation] = useState('');
    const { acceptDesertion, fetchDesertions } = useDesertions();

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
        onClose: () => setConfirmation(''),
        onOpen: () => setConfirmation(''),
    });

    const deleteDesertion = () => {
        if (confirmation.trim() === '') {
            toast.error('Debe escribir "CONFIRMAR" para aceptar la deserción');
            return;
        }

        toast.promise(
            acceptDesertion(idDesertion)
                .then(() => {
                    toast.success("Solicitud de abandono aceptada con éxito.");
                    fetchDesertions(); // Actualiza la tabla
                    onClose();
                    onSuccess(); // Notificar éxito
                })
                .catch((error) => {
                    console.error('Error durante la eliminación:', error);
                    toast.error('Error durante la eliminación');
                }),
            {
                pending: 'Procesando...',
                success: '',
                error: '',
            }
        );
    };

    return (
        <>
            <Button color="warning" onClick={onOpen}>
                Aceptar
            </Button>
            <Modal closeButton aria-labelledby="modal-title" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <>
                        <ModalHeader>
                            <h1>Confirmar Eliminación</h1>
                        </ModalHeader>
                        <ModalBody>
                            <p>¿Estás seguro de que deseas eliminar esta deserción? Esta acción es irreversible.</p>
                            <Input
                                isRequired
                                type="text"
                                className="max-w-xs"
                                fullWidth
                                label="Escriba 'CONFIRMAR' para proceder"
                                value={confirmation}
                                onChange={(e) => setConfirmation(e.target.value)}
                            />
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
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteButton;
