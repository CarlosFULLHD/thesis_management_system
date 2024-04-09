// StudentInfoModal.tsx
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

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
    isOpen: boolean;
    onClose: () => void;
}

const StudentInfoModal: React.FC<StudentInfoModalProps> = ({ student, isOpen, onClose }) => {
    return (
        <Modal closeButton isOpen={isOpen} onClose={onClose}>
            <ModalHeader>{student.name} {student.fatherLastName}</ModalHeader>
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
        </Modal>
    );
};

export default StudentInfoModal;
