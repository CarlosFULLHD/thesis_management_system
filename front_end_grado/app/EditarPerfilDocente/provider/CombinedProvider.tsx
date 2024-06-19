"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/globals';
import { useUserApi } from './UserContextProvider';
import { useSession } from '@/app/providers/SessionProvider';

export interface Subject {
    id: number; // Añadir ID aquí si no estaba antes
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
    updateSubject: (userId: number, subjectId: number, subjectName: string) => void;
    addSubject: (userId: number, newSubject: Omit<Subject, 'id'>) => void;
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

    const updateSubject = async (userId: number, subjectId: number, subjectName: string) => {
        try {
            const response = await axios.patch(`${BASE_URL}subjects/${userId}/${subjectId}`, {
                subjectName
            });
            if (response.status === 200) {
                loadData(); // Reload data after update
            }
        } catch (error) {
            console.error('Error updating subject:', error);
        }
    };

    const addSubject = async (userId: number, newSubject: Omit<Subject, 'id'>) => {
        try {
            const response = await axios.post(`${BASE_URL}subjects/${userId}/new`, newSubject);
            if (response.status === 200) {
                loadData(); // Reload data after adding
            }
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    useEffect(() => {
        if (user?.personId) {
            loadData();
        }
    }, [user]);

    return (
        <CombinedContext.Provider value={{ professor, person, loadData, clearData, updateSubject, addSubject }}>
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
