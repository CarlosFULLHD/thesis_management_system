import { useQuery } from '@tanstack/react-query';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import axios from 'axios';
import { BASE_URL } from "@/config/globals";
import InfoButton from './InfoButton';
import GradeProfile from './GradeProfileButton';

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
}

interface Desertion {
    idDesertion: number;
    reason: string;
    created_at: string;
    status: number;
    usersIdUsers: {
        idUsers: number;
        status: number;
        personIdPerson: Person;
    };
}

const fetchDesertions = async (): Promise<Desertion[]> => {
    const { data } = await axios.get(`${BASE_URL}desertion/status/1`);
    console.log(data.result);
    return data.result;
};

const DesertionTable = () => {
    const { data: desertions, isLoading, isError, error } = useQuery<Desertion[], Error>({
        queryKey: ['desertions'],
        queryFn: fetchDesertions
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading desertions: {error?.message || 'Unknown error'}</div>;

    const rows = desertions?.map(desertion => {
        const person = desertion.usersIdUsers.personIdPerson; // Ajustar según la estructura real de los datos
        return (
            <TableRow key={desertion.idDesertion}>
                <TableCell>{person.ci}</TableCell>
                <TableCell>{`${person.name} ${person.fatherLastName} ${person.motherLastName}`}</TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>{desertion.reason}</TableCell>
                <TableCell>{desertion.created_at}</TableCell>
                <TableCell>
                    <InfoButton desertion={desertion} />
                    <GradeProfile idUsers={desertion.usersIdUsers.idUsers} />
                </TableCell>
            </TableRow>
        );
    }) || [];

    return (
        <div>
            <h1>Desertion Records</h1>
            <Table fullWidth aria-label="Desertion table">
                <TableHeader>
                    <TableColumn>CI</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Razon</TableColumn>
                    <TableColumn>Fecha</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </div>
    );
};

export default DesertionTable;
