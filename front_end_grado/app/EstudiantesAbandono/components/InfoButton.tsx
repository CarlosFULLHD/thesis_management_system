import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";


// Asegúrate de que la interfaz Desertion esté correctamente definida e importada
interface Desertion {
    idDesertion: number;
    reason: string;
    date: string;
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

interface InfoButtonProps {
    desertion: Desertion;
}

const InfoButton: React.FC<InfoButtonProps> = ({ desertion }) => {
    const [visible, setVisible] = useState(false);

    const handleOpen = () => setVisible(true);
    const handleClose = () => setVisible(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={handleOpen} onPress={onOpen}>Info</Button>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader>
                        <h1>Desertion Details</h1>
                    </ModalHeader>
                    <ModalBody>
                        <p><strong>CI:</strong> {desertion.usersIdUsers.personIdPerson.ci}</p>
                        <p><strong>Name:</strong> {desertion.usersIdUsers.personIdPerson.name}</p>
                        <p><strong>Email:</strong> {desertion.usersIdUsers.personIdPerson.email}</p>
                        <p><strong>Reason:</strong> {desertion.reason}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleClose} onPress={onClose}>Close</Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default InfoButton;
