import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";


interface Student {
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

interface StudentInfoModalProps {
    student: Student;
}

const InfoButton: React.FC<StudentInfoModalProps> = ({ student }) => {
    const [visible, setVisible] = useState(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const handleOpen = () => setVisible(true);
    const handleClose = () => setVisible(false);
    return (
        <>
        <Button onClick={handleOpen} onPress={onOpen}>Info</Button>
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader>
                        {student.name} {student.fatherLastName}
                    </ModalHeader>
                    <ModalBody>
                        <p><strong>CI:</strong> {student.ci}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Cell Phone:</strong> {student.cellPhone}</p>
                        <p><strong>Description:</strong> {student.description}</p>
                        <p><strong>Registration Date:</strong> {student.createdAt}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
        </Modal>
        </>
    );
};

export default InfoButton;
