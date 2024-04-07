import { useQuery } from '@tanstack/react-query';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import axios from 'axios';
import { BASE_URL } from "@/config/globals";

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
    const { data } = await axios.get<Student[]>(`${BASE_URL}student/active-students`);
    console.log(data);
    return data;
};

const RegisteredStudentsTable = () => {
    const { data: students, isLoading, isError, error } = useQuery<Student[], Error>({
        queryKey: ['students'],
        queryFn: fetchStudents,
    });
    console.log("Students: ",students);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading students: {error instanceof Error ? error.message : 'Unknown error'}</div>;
    if (error) {
        // Manejar la situación, por ejemplo, mostrando un mensaje de error
        console.error('Los datos recibidos no coinciden con la estructura esperada.');
    }
    // Convertir students a una lista de RowElement
    const rows = students?.map(student => (
        <TableRow key={student.idPerson}>
            <TableCell>{student.ci}</TableCell>
            <TableCell>{`${student.name} ${student.fatherLastName} ${student.motherLastName}`}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.cellPhone}</TableCell>
            <TableCell>
                <Button color="primary">View Details</Button>
            </TableCell>
        </TableRow>
    )) || [];

    return (
        <div>
            <h1>Estudiantes inscritos</h1>
            <Table fullWidth aria-label="Tabla de estudiantes en espera de aprobación">
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
