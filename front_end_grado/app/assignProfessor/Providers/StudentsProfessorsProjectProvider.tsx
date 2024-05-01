"use client";

import React, {createContext, useState, useContext, ReactNode} from "react";

export interface StudentProfessorProjectItem {
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

interface StudentProfessorProjectContextType {
    studentProfessorProjectMap: Map<number, StudentProfessorProjectItem>;
    fetchStudentProfessorProject: (newStudentProfessorProject: Map<number, StudentProfessorProjectItem>) => void;
}

const StudentProfessorProjectContext = createContext<StudentProfessorProjectContextType | undefined>(undefined);

interface StudentProfessorProjectProviderProps {
    children: ReactNode;
}

const StudentProfessorProvider: React.FC<StudentProfessorProjectProviderProps> = ({ children }) => {
    const [studentProfessorProjectMap, setStudentProfessorProject] = useState<Map<number, StudentProfessorProjectItem>>(new Map());

    const fetchStudentProfessorProject = (newStudentProfessorProject: Map<number, StudentProfessorProjectItem>) => {
        setStudentProfessorProject(newStudentProfessorProject);
    };

    return (
        <StudentProfessorProjectContext.Provider value={{ studentProfessorProjectMap, fetchStudentProfessorProject }}>
            {children}
        </StudentProfessorProjectContext.Provider>
    );
}

export const useStudentProfessorProject = (): StudentProfessorProjectContextType => {
    const context = useContext(StudentProfessorProjectContext);
    if (!context) {
        throw new Error("Error al usar studentProfessorProject");
    }
    return context;
}

export default StudentProfessorProvider;