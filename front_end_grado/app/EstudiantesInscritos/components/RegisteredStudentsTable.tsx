import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import axios from 'axios';
import { BASE_URL } from "@/config/globals";
import StudentInfoModal from './InfoButton';  // Asegúrate de que la ruta sea correcta

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

const fetchStudents = async (): Promise<Student[]> => {
    const { data } = await axios.get(`${BASE_URL}student/active-students`);
    return data;
};

const RegisteredStudentsTable = () => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const { data: students, isLoading, isError, error } = useQuery<Student[], Error>({
        queryKey: ['students'],
        queryFn: fetchStudents,
    });

    const handleOpenModal = (student: Student) => {
        setSelectedStudent(student);
        setModalOpen(true);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError || error) return <div>Error loading students: {error?.message || 'Unknown error'}</div>;

    const rows = students?.map(student => (
        <TableRow key={student.idPerson}>
            <TableCell>{student.ci}</TableCell>
            <TableCell>{`${student.name} ${student.fatherLastName} ${student.motherLastName}`}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.cellPhone}</TableCell>
            <TableCell>
                <StudentInfoModal student={student} />
            </TableCell>
        </TableRow>
    )) || [];

    return (
        <div>
            <h1>Estudiantes inscritos</h1>
            <Table fullWidth aria-label="Registered students table">
                <TableHeader>
                    <TableColumn>CI</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Phone</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </div>
    );
};

export default RegisteredStudentsTable;
