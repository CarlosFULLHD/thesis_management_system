import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import axios from 'axios';
import { BASE_URL } from "@/config/globals";
import {Accordion, AccordionItem} from "@nextui-org/react";

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
    const [visible, setVisible] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    const handleOpen = () => setVisible(true);
    const handleClose = () => setVisible(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const handleDenyDesertion = async () => {
        try {
            const response = await axios.post(`${BASE_URL}desertion/reject/${desertion.idDesertion}`, { reason: rejectReason });
            console.log('Desertion Rejected:', response.data);
            alert('Solicitud de abandono rechazada');
            handleClose(); // Cerrar el modal después de la acción
        } catch (error) {
            console.error('Error during desertion rejection:', error);
            alert('Hubo problemas al rechazar la solicitud de abandono');
        }
    };

    return (
        <>
            <Button onClick={handleOpen} onPress={onOpen} color="danger" >Rechazar</Button>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader>
                        <h1>Escriba la razon de rechazo de la solicitud de abandono</h1>
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            label="Razon de rechazo"
                            placeholder="Razon de rechazo"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}></Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={handleDenyDesertion}>Rechazar</Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default RejectButton;
