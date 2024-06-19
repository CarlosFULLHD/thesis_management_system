import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { BASE_URL } from "@/config/globals";
import { toast } from "react-toastify";
import { useStudents } from "../providers/StudentProvider";

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
    const { fetchStudents } = useStudents();

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
        onClose: () => setReason(''),
        onOpen: () => setReason(''),
    });

    const handleSubmit = async () => {
        if (reason.trim() === '') {
            toast.error('Debe proporcionar una razón para la baja');
            return;
        }

        toast.promise(
            new Promise<void>(async (resolve, reject) => {
                try {
                    const payload = {
                        usersIdUsers: {
                            idUsers: student.usersId // Usando usersId de la respuesta de la API
                        },
                        reason: reason
                    };
                    const response = await axios.post(`${BASE_URL}desertion/application`, payload);
                    if (response.status === 200) {
                        fetchStudents();
                        onClose();
                        resolve();
                    } else {
                        reject(new Error('Error al enviar la solicitud'));
                    }
                } catch (error) {
                    console.error('Error al enviar la solicitud de abandono', error);
                    reject(error);
                }
            }),
            {
                pending: 'Enviando solicitud de baja...',
                success: 'Solicitud de baja enviada correctamente',
                error: 'Error al enviar la solicitud de baja',
            }
        );
    };

    return (
        <>
            <Button onClick={onOpen} color="warning">
                Dar de Baja
            </Button>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h1>Solicitud de Baja del estudiante {student.personResponse.name} {student.personResponse.fatherLastName} {student.personResponse.motherLastName}</h1>
                        </ModalHeader>
                        <ModalBody>
                            <p>Escriba la razón por la cual está dando de baja al estudiante (el estudiante será informado de la acción) </p>
                            <Input
                                isRequired
                                type="text"
                                fullWidth
                                label="Razón"
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
