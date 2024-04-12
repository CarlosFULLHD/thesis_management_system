import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { BASE_URL } from "@/config/globals";

// Asumiendo que esta es la nueva estructura basada en la respuesta de la API
interface Person {
    idPerson: number;
    ci: string;
    name: string;
    email: string;
    cellPhone: string;
    createdAt: string;
    description: string;
    fatherLastName: string;
    motherLastName: string;
    status: number;
}

interface ActiveStudent {
    personResponse: Person;
    usersId: number;
}

interface StudentModalProps {
    student: ActiveStudent;
}

const DesertionButtonWithModal: React.FC<StudentModalProps> = ({ student }) => {
    const [reason, setReason] = useState('');
    const [visible, setVisible] = useState(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const handleOpen = () => setVisible(true);
    const handleClose = () => setVisible(false);

    const handleSubmit = async () => {
        try {
            const payload = {
                usersIdUsers: {
                    idUsers: student.usersId // Usando usersId de la respuesta de la API
                },
                reason: reason
            };
            await axios.post(`${BASE_URL}desertion/application`, payload);
            alert('Solicitud de abandono enviada correctamente');
            handleClose();
        } catch (error) {
            console.error('Error al enviar la solicitud de abandono', error);
            alert('Error al enviar la solicitud');
        }
    };

    return (
        <>
            <Button onClick={handleOpen} onPress={onOpen} color="warning">
                Abandonar
            </Button>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h1>Solicitud de Abandono</h1>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                fullWidth
                                label="Razón del abandono"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="warning" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button onClick={handleSubmit}>
                                Enviar Solicitud
                            </Button>
                        </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DesertionButtonWithModal;
