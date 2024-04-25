import React, { useEffect, useState } from 'react';
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
interface Person {
    ci: string;
    name: string;
    fatherLastName: string;
    motherLastName: string;
    email: string;
}

interface GradeProfileData {
    idGradePro: number;
    title: string;
    statusGraduationMode: number;
    status: number;
    createdAt: string;
    roleHasPerson: {
        idRolePer: number;
        rolesIdRole: {
            idRole: number;
            userRole: string;
            status: number;
            createdAt: string;
        };
        usersIdUsers: {
            idUsers: number;
            personIdPerson: Person;
            status: number;
            createdAt: string;
        };
    };
}
interface GradeProfileProps {
    idUsers: number;
}

const GradeProfileButton: React.FC<GradeProfileProps> = ({ idUsers }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [gradeProfile, setGradeProfile] = useState<any>(null);

    useEffect(() => {
        const fetchGradeProfile = async () => {
            try {
                const response = await axios.get(`${BASE_URL}desertion/grade-profiles/${idUsers}`);
                setGradeProfile(response.data.result[0]); // Asumiendo que la respuesta tiene este formato
            } catch (error) {
                console.error('Error fetching grade profile:', error);
                setGradeProfile(null);
            }
        };

        if (isOpen) {
            fetchGradeProfile();
        }
    }, [idUsers, isOpen]);

    const [visible, setVisible] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [isSecondModalOpen, setSecondModalOpen] = useState(false);

    const handleOpen = () => setVisible(true);
    const handleClose = () => setVisible(false);
    const handleSecondModalOpen = () => setSecondModalOpen(true);

    return (
        <>
            <Button onClick={handleOpen} onPress={onOpen} color='secondary'>Perfil Grado</Button>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
            {gradeProfile && (
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader>
                        <h1>Detalles de la solicitud de Abandono o Baja</h1>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <div>
                                <p><strong>Nombre:</strong> {gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.name}</p>
                                <p><strong>Email:</strong> {gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.email}</p>
                                <p><strong>Título del Perfil:</strong> {gradeProfile.title}</p>
                                <p><strong>Fecha de Creación:</strong> {gradeProfile.createdAt}</p>
                            </div>
                            
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            )}
            </Modal>
        </>
    );
};

export default GradeProfileButton;
