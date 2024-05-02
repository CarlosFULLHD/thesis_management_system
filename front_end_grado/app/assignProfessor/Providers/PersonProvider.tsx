"use client";

import React, {createContext, useState, useContext, ReactNode} from "react";

export interface PersonItem {
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

interface PersonContextType {
    personMap: Map<number, PersonItem>;
    fetchPerson: (newPerson: Map<number, PersonItem>) => void;
}

const PersonContext = createContext<PersonContextType | undefined>(undefined);

interface PersonProviderProps {
    children: ReactNode;
}

const PersonProvider: React.FC<PersonProviderProps> = ({ children }) => {
    const [personMap, setPerson] = useState<Map<number, PersonItem>>(new Map());

    const fetchPerson = (newPerson: Map<number, PersonItem>) => {
        setPerson(newPerson);
    };

    return (
        <PersonContext.Provider value={{ personMap, fetchPerson }}>
            {children}
        </PersonContext.Provider>
    );
}

export const usePerson = (): PersonContextType => {
    const context = useContext(PersonContext);
    if (!context) {
        throw new Error("Error al usar person");
    }
    return context;
}

export default PersonProvider;