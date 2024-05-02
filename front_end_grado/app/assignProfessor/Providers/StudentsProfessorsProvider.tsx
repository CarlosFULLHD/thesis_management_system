"use client";
import React, { createContext, useState, useContext, useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "@/config/globals";
import { toast } from "react-toastify";

export interface StudentsProfessors {
    idGradePro: number;
    name: string;
    fatherLastName: string;
    motherLastName: string;
    email: string;
    cellPhone: string;
    idTutorApplication: number | null;
    idRolePer: number | null;
    tutorLecturer: number;
}

export interface ApiResponse {
    timeStamp: string;
    status: number;
    message: string;
    result: {
        totalItem: number;
        data: StudentsProfessors[];
        totalPages: number;
    };
}

interface StudentsProfessorsContextType {
    studentsProfessors: StudentsProfessors[];
    totalPages: number;
    currentPage: number;
    pageSize: number;
    filter: string;
    sort: { field: string; order: string };
    setCurrentPage: (page: number) => void;
    setTotalPages: (totalPages: number) => void;
    setPageSize: (size: number) => void;
    setFilter: (filter: string) => void;
    setSort: (sort: { field: string; order: string }) => void;

    fetchStudentsProfessors: () => void;
//    assignTutor: (idGradePro: number, idRolePer: number) => Promise<void>;
    refreshStudentsProfessors: () => void;
}

const StudentsProfessorsContext = createContext<
    StudentsProfessorsContextType | undefined
>(undefined);

export const StudentsProfessorsProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [studentsProfessors, setStudentsProfessors] = useState<StudentsProfessors[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState({ field: "fatherLastName", order: "asc" });
    const fetchStudentsProfessors = async () => {
        try {
            const response = await axios.get<ApiResponse>(
                `${BASE_URL}lecturer/studentsAndProfessorsByProject`,
                {
                    params: {
                        page: currentPage,
                        size: pageSize,
                        filter: filter,
                        sort: sort.field+","+sort.order
                    },
                }
            );
            if (response.data.status == 200) {
                setStudentsProfessors(response.data.result.data);
                setTotalPages(response.data.result.totalPages);
            } else {
                toast.error("Error al obtener estudiantes");
            }
        } catch (error) {
            console.log("Error fetching students:", error);
            toast.error("Error al obtener estudiantes");
        }
    };

    const handleFilterChange = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setFilter(e.target.value);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
    }

    const handleSortChange = (field: string) => {
        const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
        setSort({ field, order });
    };

    useEffect(() => {
        fetchStudentsProfessors();
    }, [currentPage, pageSize, filter, sort]);

    const refreshStudentsProfessors = () => {
        fetchStudentsProfessors();
    };

    return (
        <StudentsProfessorsContext.Provider
            value={{
                studentsProfessors,
                totalPages,
                currentPage,
                pageSize,
                filter,
                sort,
                setCurrentPage,
                setTotalPages,
                setPageSize,
                setFilter,
                setSort,
                fetchStudentsProfessors,
                refreshStudentsProfessors,
            }}
        >
            {children}
        </StudentsProfessorsContext.Provider>
    );
};

export const useStudentsProfessors = (): StudentsProfessorsContextType => {
    const context = useContext(StudentsProfessorsContext);
    if (!context) {
        throw new Error("Error al usar studentsProfessors");
    }
    return context;
}