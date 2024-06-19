import { useQuery } from '@tanstack/react-query';
import { 
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    Button, 
    Input,
    Pagination,
} from "@nextui-org/react";
import { FaSort } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { BASE_URL } from "@/config/globals";
import InfoButton from './InfoButton';
import DeleteButton from './DeleteButton';
import RejectButton from './RejectDesertionButton';
import { useDesertions } from '../providers/DesertionProviders';
import { useCallback, useMemo } from 'react';

// interface Person {
//     idPerson: number;
//     ci: string;
//     name: string;
//     email: string;
//     cellPhone: string;
//     createdAt: string;
//     description: string;
//     fatherLastName: string;
//     motherLastName: string;
// }

// interface Desertion {
//     idDesertion: number;
//     reason: string;
//     created_at: string;
//     status: number;
//     usersIdUsers: {
//         idUsers: number;
//         status: number;
//         personIdPerson: Person;
//     };
// }

// const fetchDesertions = async (): Promise<Desertion[]> => {
//     const { data } = await axios.get(`${BASE_URL}desertion/status/0`);
//     console.log(data.result);
//     return data.result;
// };

const DesertionTable = () => {
    const {
        desertions,
        totalPages,
        currentPage,
        pageSize,
        filter,
        sort,
        setTotalPages,
        setCurrentPage,
        setPageSize,
        setFilter,
        setSort,
        fetchDesertions
    } = useDesertions();
    // const { data: desertions, isLoading, isError, error } = useQuery<Desertion[], Error>({
    //     queryKey: ['desertions'],
    //     queryFn: fetchDesertions
    // });

    // if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>Error loading desertions: {error?.message || 'Unknown error'}</div>;

    const handlePagesChange = (value: any) => {
        setCurrentPage(value);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        fetchDesertions();
    };

    const handleFilterChange = (e: { target: { value: any } }) => {
        setFilter(e.target.value);
        handlePagesChange(0);
    };

    const handleSortChange = (field: string) => {
        const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
        setSort({ field, order });
        fetchDesertions();
    };

    const onClear = useCallback(() => {
        setFilter("");
        setCurrentPage(0);
    }, [])

    const TopContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
            <Input
                isClearable
                type="text"
                className="w-full sm:max-w-[44%]"
                placeholder="Search by name..."
                startContent={<FaSearch />}
                value={filter}
                onClear={() => {onClear()}}
                onChange={handleFilterChange}
            />
            Cantidad de datos por página:
            <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={(event) => handlePageSizeChange(Number(event.target.value))}
            >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </select>
            </div>
        );
    }, [filter, pageSize]);

    const bottomContent = useMemo(() => {
        return (
            <div className='py-2 px-2 flex justify-between items-center'>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={currentPage + 1}
                    total={totalPages}
                    onChange={(newPage) => setCurrentPage(newPage - 1)}
                />
            </div>
        );
    }, [totalPages, currentPage]);

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
                    <DeleteButton idDesertion={desertion.idDesertion} onSuccess={() => {/* lógica para actualizar la tabla después de la eliminación */}} />
                    <RejectButton desertion={desertion}/>
                </TableCell>
            </TableRow>
        );
    }) || [];

    return (
        <div>
            <h1>Desertion Records</h1>
            {TopContent}
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
            {bottomContent}
        </div>
    );
};

export default DesertionTable;
