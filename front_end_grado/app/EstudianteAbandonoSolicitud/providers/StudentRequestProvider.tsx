import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/globals';
import { Desertion } from '@/app/EstudiantesAbandono/providers/DesertionProviders';

// Asumiendo que tienes una definición para DesertionRequest similar a la estructura de tu API
export interface DesertionRequest {
    usersIdUsers: {
        idUsers: number;
    };
    reason: string;
}

export interface DesertionContextType {
    desertions: Desertion[];
    fetchDesertions: () => void;
    createDesertion: (request: DesertionRequest) => Promise<void>;
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
            setDesertions(response.data.result);
        } catch (error) {
            console.error('Error fetching desertions:', error);
        }
    };

    const createDesertion = async (request: DesertionRequest) => {
        try {
            const response = await axios.post(`${BASE_URL}desertion/application`, request);
            console.log("Desertion request created successfully");
        } catch (error) {
            console.error('Error creating desertion request:', error);
        }
    };

    return (
        <DesertionContext.Provider value={{ desertions, fetchDesertions, createDesertion }}>
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
