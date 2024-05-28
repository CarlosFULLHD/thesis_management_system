"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/globals';
import { useUserApi } from './UserContextProvider';
import { useSession } from '@/app/providers/SessionProvider';

export interface Subject {
    subjectName: string;
    comments: string;
}

export interface SocialNetwork {
    urlLinkedin: string;
    icon: string;
}

export interface ProfessorDetails {
    fullName: string;
    description: string;
    email: string;
    imageUrl: string;
    subjects: Subject[];
    socialNetworks: SocialNetwork[];
}

export interface PersonDetails extends ProfessorDetails {}

interface CombinedContextType {
    professor: ProfessorDetails | null;
    person: PersonDetails | null;
    loadData: () => void;
    clearData: () => void;
}

const CombinedContext = createContext<CombinedContextType | undefined>(undefined);

interface CombinedProviderProps {
    children: ReactNode;
}

const CombinedProvider: React.FC<CombinedProviderProps> = ({ children }) => {
    const [professor, setProfessor] = useState<ProfessorDetails | null>(null);
    const [person, setPerson] = useState<PersonDetails | null>(null);
    const { user } = useUserApi();
    const { userDetails } = useSession();

    const fetchProfessorFromDB = async (personId: number) => {
        try {
            if (userDetails?.role === 'DOCENTE') {
                const response = await axios.get(`${BASE_URL}professor/${personId}`);
                if (response.status === 200) {
                    setProfessor(response.data.result);
                } else {
                    console.error(`Failed to fetch professor: ${response.status}`);
                }
            }
        } catch (error) {
            console.error('Error fetching professor:', error);
        }
    };

    const fetchPersonFromDB = async (personId: number) => {
        try {
            const response = await axios.get(`${BASE_URL}person/${personId}`);
            if (response.status === 200) {
                setPerson(response.data.result);
            } else {
                console.error(`Failed to fetch person: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching person:', error);
        }
    };

    const loadData = () => {
        if (user?.personId) {
            fetchProfessorFromDB(user.personId);
            fetchPersonFromDB(user.personId);
        }
    };

    const clearData = () => {
        setProfessor(null);
        setPerson(null);
    };

    useEffect(() => {
        if (user?.personId) {
            loadData();
        }
    }, [user]);

    return (
        <CombinedContext.Provider value={{ professor, person, loadData, clearData }}>
            {children}
        </CombinedContext.Provider>
    );
}

export const useCombined = (): CombinedContextType => {
    const context = useContext(CombinedContext);
    if (!context) {
        throw new Error('useCombined must be used within a CombinedProvider');
    }
    return context;
}

export default CombinedProvider;
