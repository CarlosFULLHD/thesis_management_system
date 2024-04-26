"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

export interface TutorItem {
    idPerson: number;
    ci: string;
    name: string;
    fatherLastName: string;
    motherLastName: string;
    description: string;
    email: string;
    cellPhone: number;
    status: number;
    createdAt: Date;
}

interface TutorContextType {
    tutorMap: Map<number, TutorItem>;
    fetchTutor: (newTutor: Map<number, TutorItem>) => void;
}

const TutorContext = createContext<TutorContextType | undefined>(undefined);

interface TutorProviderProps {
    children: ReactNode;
}

const TutorProvider: React.FC<TutorProviderProps> = ({ children }) => {
    const [tutorMap, setTutor] = useState<Map<number, TutorItem>>(new Map());

    const fetchTutor = (newTutor: Map<number, TutorItem>) => {
        setTutor(newTutor);
    };

    return (
        <TutorContext.Provider value={{ tutorMap, fetchTutor }}>
            {children}
        </TutorContext.Provider>
    );
}

export const useTutor = (): TutorContextType => {
    const context = useContext(TutorContext);
    if (!context) {
        throw new Error("Error al usar tutor");
    }
    return context;
}

export default TutorProvider;