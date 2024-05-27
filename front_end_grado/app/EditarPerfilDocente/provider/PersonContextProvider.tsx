"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/globals';
import { useUser } from './UserContextProvider';

export interface Subject {
    subjectName: string;
    comments: string;
}

export interface SocialNetwork {
    urlLinkedin: string;
    icon: string;
}

export interface PersonDetails {
    fullName: string;
    description: string;
    email: string;
    imageUrl: string;
    subjects: Subject[];
    socialNetworks: SocialNetwork[];
}

interface PersonContextType {
    person: PersonDetails | null;
    fetchPersonFromDB: (personId: number) => void;
    clearPerson: () => void;
}

const PersonContext = createContext<PersonContextType | undefined>(undefined);

interface PersonProviderProps {
    children: ReactNode;
}

const PersonProvider: React.FC<PersonProviderProps> = ({ children }) => {
    const [person, setPerson] = useState<PersonDetails | null>(null);
    const { user } = useUser();

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

    const clearPerson = () => {
        setPerson(null);
    };

    useEffect(() => {
        if (user?.personId) {
            fetchPersonFromDB(user.personId);
        }
    }, [user]);

    return (
        <PersonContext.Provider value={{ person, fetchPersonFromDB, clearPerson }}>
            {children}
        </PersonContext.Provider>
    );
}

export const usePerson = (): PersonContextType => {
    const context = useContext(PersonContext);
    if (!context) {
        throw new Error('usePerson must be used within a PersonProvider');
    }
    return context;
}

export default PersonProvider;
