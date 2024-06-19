import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useDesertions } from '../providers/DesertionProviders';

// Asegúrate de que la interfaz Desertion esté correctamente definida e importada
interface Desertion {
    idDesertion: number;
    reason: string;
    created_at: string;
    status: number;
    usersIdUsers: {
        idUsers: number;
        status: number;
        personIdPerson: {
            idPerson: number;
            ci: string;
            name: string;
            email: string;
            cellPhone: string;
            createdAt: string;
            description: string;
            fatherLastName: string;
            motherLastName: string;
        };
    };
}

interface RejectButtonProps {
    desertion: Desertion;
}

const RejectButton: React.FC<RejectButtonProps> = ({ desertion }) => {
    const [rejectReason, setRejectReason] = useState('');
    const { rejectDesertion } = useDesertions();

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
        onClose: () => setRejectReason(''),
        onOpen: () => setRejectReason(''),
    });

    const handleDenyDesertion = () => {
        if (rejectReason.trim() === '') {
            toast.error('Debe proporcionar una razón para el rechazo');
            return;
        }

        toast.promise(
            rejectDesertion(desertion.idDesertion, rejectReason)
                .then(() => {
                    toast.success("Solicitud de abandono rechazada");
                    onClose(); // Cerrar el modal después de la acción
                })
                .catch((error) => {
                    console.error('Error durante el rechazo de la solicitud de abandono:', error);
                    toast.error('Error al rechazar la solicitud de abandono');
                }),
            {
                pending: 'Rechazando solicitud...',
                success: '',
                error: '',
            }
        );
    };

    return (
        <>
            <Button onClick={onOpen} color="danger">Rechazar</Button>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <h1>Escriba la razón de rechazo de la solicitud de abandono</h1>
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Razón de rechazo"
                                    placeholder="Razón de rechazo"
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="danger" onClick={handleDenyDesertion}>
                                    Rechazar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default RejectButton;
