import { BASE_URL } from "@/config/globals";
import axios from "axios";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface personInterface {
    idPerson: number;
    ci: number;
    name: string;
    fatherLastName: string;
    motherLastName: string;
    description: string;
    email: string;
    cellPhone: string;
    status: number;
    createdAt: string;
}

interface userInterface {
    idUsers: number;
    personIdPerson: personInterface;
    username: string;
    password: string;
    salt: string;
    status: number;
    createdAt: string;
}

export interface PublicInfoInterface {
    idPublicInfo: number;
    usersIdUsers: userInterface;
    title: string;
    information: string;
    publicationDate: string;
    deadline: string;
    status: number;
    createdAt: string;
}

interface ApiResponse {
    timeStamp: string;
    status: number;
    message: string;
    result: {
        totalItems: number;
        data: PublicInfoInterface[];
        totalPages: number;
    };
}

interface PublicInfoContextType {
    publicInfo: PublicInfoInterface[];
    totalPages: number;
    totalItems: number;
    currentPage: number;
    pageSize: number;
    setTotalPages: (totalPages: number) => void;
    setCurrentPage: (currentPage: number) => void;
    setPageSize: (pageSize: number) => void;
    getPublicInfo: () => void;
}

const PublicInfoContext = createContext<PublicInfoContextType | undefined>(undefined);

interface PublicInfoProviderProps {
    children: ReactNode;
}

export const PublicInfoProvider: React.FC<PublicInfoProviderProps> = ({ children }) => {
    const [publicInfo, setPublicInfo] = useState<PublicInfoInterface[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(4);

    const fetchData = async () => {
        console.log('Fetching public info');
        try {
            const response = await axios.get<ApiResponse>(
                `${BASE_URL}publicInformation/`,
                {
                    params: {
                        page: currentPage,
                        size: pageSize
                    }
                }
            );

            if (response.data.status != 200) {
                console.log("Error al obtener la información", response.data.message);
                throw new Error('Error fetching data');
            }

            console.log('Public info fetched successfully', response.data.result.data);
            setPublicInfo(response.data.result.data);
            setTotalPages(response.data.result.totalPages);
            setTotalItems(response.data.result.totalItems);
        } catch (error) {
            console.error('Error fetching data from public info', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageSize, currentPage]);

    return (
        <PublicInfoContext.Provider value={{
            publicInfo,
            totalPages,
            totalItems,
            currentPage,
            pageSize,
            setTotalPages,
            setCurrentPage,
            setPageSize,
            getPublicInfo: fetchData,
        }}>
            {children}
        </PublicInfoContext.Provider>
    );
};

export const usePublicInfo = (): PublicInfoContextType => {
    const context = useContext(PublicInfoContext);
    if (!context) {
        throw new Error('usePublicInfo must be used within a PublicInfoProvider');
    }
    return context;
};
