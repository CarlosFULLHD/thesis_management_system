"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
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
    idTutor: number | null;
    idLecturersApplication: number[] | null;
    idLecturers: number[] | null;
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

export interface LecturerApplicationRequest {
    idTutorApplication: number | null;
    roleHasPersonIdRolePer: {
        idRolePer: number | null;
    };
    gradeProfileIdGradePro: {
        idGradePro: number;
    };
    isAccepted: number;
    tutorLecturer: number | null;
    status: number;
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
    assignLecturer: (request: LecturerApplicationRequest) => Promise<void>;
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
    const [sort, setSort] = useState({ field: "name", order: "asc" });
    const fetchStudentsProfessors = async () => {
        try {
            const response = await axios.get<ApiResponse>(
                `${BASE_URL}lecturer/studentsAndLecturersByProject`,
                {
                    params: {
                        page: currentPage,
                        size: pageSize,
                        filter: filter,
                        sort: `${sort.field},${sort.order}`,
                    },
                }
            );
            if (response.data.status == 200) {
                setStudentsProfessors(response.data.result.data);
                setTotalPages(response.data.result.totalPages);
            } else {
                console.error("Error fetching students and professors", response.data.message);
                toast.error("Error al obtener estudiantes");
            }
        } catch (error) {
            console.log("Error fetching students and professors:", error);
            toast.error("Error al obtener estudiantes");
        }
    };

    const assignLecturer = async (request: LecturerApplicationRequest) => {
        try {
            console.log("Request to send: ", request)
            const response = await axios.put(`${BASE_URL}lecturer/assignProfessor`, 
            request
        );
        if (response.status == 201) {
            console.log("Upsert lecturer application ");
            toast.success("Profesor asignado correctamente");
        } else {
            console.error("Error upsert lecturer application", response.data.message);
            toast.error("Error al asignar relator");
        }
        } catch (error) {
            console.error("Error upsert lecturer application", error);
            toast.error("Error al asignar relator");
        }
    }

    const handleFilterChange = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setFilter(e.target.value);
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
    }

    const handleSortChange = (field: string) => {
        const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
        setSort({ field, order });
    }

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
                assignLecturer,
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
        throw new Error("Error al usar estudiantes y profesores");
    }
    return context;
}