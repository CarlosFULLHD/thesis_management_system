import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { BASE_URL } from "@/config/globals";

const AbandonoSolicitud = () => {
    const [reason, setReason] = useState('');
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [visible, setVisible] = useState(false);

    const handleOpenModal = () => {
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
    };

    const handleAbandonClick = async () => {
        const desertionRequest = {
            usersIdUsers: {
                idUsers: 5
            },
            reason: reason
        };

        try {
            // Realiza la petición POST a la API
            const response = await axios.post(`${BASE_URL}desertion/application`, desertionRequest);
            console.log('Solicitud de abandono enviada:', response.data);
            alert('Solicitud enviada con éxito.');
        } catch (error) {
            console.error('Error al enviar la solicitud de abandono:', error);
            alert('Error al enviar la solicitud.');
        }

        handleCloseModal(); // Cierra el modal después de enviar la solicitud
    };

    return (
        <>
            <h1>Quieres abandonar</h1>
            <Button onClick={handleOpenModal} color='danger' onPress={onOpen}>Abandonar</Button>
            <Modal isOpen={isOpen} onClose={handleCloseModal} closeButton aria-labelledby="modal-title">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h1 id="modal-title">Solicitud de Abandono</h1>
                        </ModalHeader>
                        <ModalBody>
                            <p>Escribe la razon por la cual solicitaras el abandono a la materia de taller de grado 1</p>
                            <Input
                                label="Razón de Abandono"
                                placeholder="Escribe la razón aquí..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="warning" onClick={handleCloseModal} onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button onClick={handleAbandonClick}>
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

export default AbandonoSolicitud;
