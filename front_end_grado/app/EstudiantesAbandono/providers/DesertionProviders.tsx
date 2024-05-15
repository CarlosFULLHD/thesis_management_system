import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/globals';
import { toast } from 'react-toastify';

export interface Person {
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

export interface User {
    idUsers: number;
    personIdPerson: Person;
    status: number;
}

export interface Desertion {
    idDesertion: number;
    usersIdUsers: User;
    reason: string;
    status: number;
    created_at: string;
}

export interface ApiResponse {
    timeStamp: string;
    status: number;
    message: string;
    result: {
        totalItem: number;
        data: Desertion[];
        totalPages: number;
    };
}

interface DesertionContextType {
    desertions: Desertion[];
    totalPages: number;
    currentPage: number;
    pageSize: number;
    filter: string;
    sort: { field: string; order: string };
    setTotalPages: (totalPages: number) => void;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setFilter: (filter: string) => void;
    setSort: (sort: { field: string; order: string }) => void;
    fetchDesertions: () => void;
}

const DesertionContext = createContext<DesertionContextType | undefined>(undefined);

interface DesertionProviderProps {
    children: React.ReactNode;
}

export const DesertionProvider: React.FC<DesertionProviderProps> = ({ children }) => {
    const [desertions, setDesertions] = useState<Desertion[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState<{ field: string; order: string }>({ field: 'd.usersIdUsers.personIdPerson.createdAt', order: 'asc' });

    const fetchDesertions = async () => {
        try {
            // const response = await axios.get(`${BASE_URL}desertion/all`);

            const response = await axios.get<ApiResponse>(`${BASE_URL}desertion/status/0`,
                {
                    params: {
                        page: currentPage,
                        size: pageSize,
                        filter: filter,
                        sort: `${sort.field},${sort.order}`
                    },
                }
            );

            if (response.data.status != 200) {
                console.error('Error fetching desertions:', response.data.message);
                toast.error("Error al obtener desertores")
                return;
            }
            console.log("Desertions fetched from API");
            console.log(response.data.result.data);
            setDesertions(response.data.result.data);
            setTotalPages(response.data.result.totalPages);
        } catch (error) {
            console.error('Error fetching desertions:', error);
            toast.error("Error al obtener desertores")
        }
    };

    useEffect(() => {
        fetchDesertions();
    }, [currentPage, pageSize, filter, sort]);

    return (
        <DesertionContext.Provider value={{ 
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
            fetchDesertions,
        }}>
            {children}
        </DesertionContext.Provider>
    );
}

export const useDesertions = (): DesertionContextType => {
    const context = useContext(DesertionContext);
    if (!context) {
        throw new Error('useDesertions must be used within a DesertionProvider');
    }
    return context;
}
