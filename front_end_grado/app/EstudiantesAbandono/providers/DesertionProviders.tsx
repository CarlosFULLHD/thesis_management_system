import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/globals';

export interface Desertion {
    idDesertion: number;
    usersIdUsers: {
        idUsers: number;
        personIdPerson: {
            idPerson: number;
            ci: string;
            name: string;
            fatherLastName: string;
            motherLastName: string;
            description: string;
            email: string;
            cellPhone: string;
            status: number;
            createdAt: string;
        };
        status: number;
    };
    reason: string;
    status: number;
    date: string;
}

interface DesertionContextType {
    desertions: Desertion[];
    fetchDesertions: () => void;
}

const DesertionContext = createContext<DesertionContextType | undefined>(undefined);

interface DesertionProviderProps {
    children: React.ReactNode;
}

export const DesertionProvider: React.FC<DesertionProviderProps> = ({ children }) => {
    const [desertions, setDesertions] = useState<Desertion[]>([]);

    const fetchDesertions = async () => {
        try {
            const response = await axios.get(`${BASE_URL}desertion/all`);
            console.log("Desertions fetched from API");
            console.log(response.data.result);
            setDesertions(response.data.result);
        } catch (error) {
            console.error('Error fetching desertions:', error);
        }
    };

    return (
        <DesertionContext.Provider value={{ desertions, fetchDesertions }}>
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
