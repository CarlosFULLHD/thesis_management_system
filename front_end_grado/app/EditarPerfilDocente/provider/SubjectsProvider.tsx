import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/globals';

interface Subject {
    id: number;
    subjectName: string;
    comments: string;
}

interface SubjectsContextType {
    subjects: Subject[];
    loadSubjects: (professorId: number) => void;
    updateSubject: (userId: number, subjectId: number, subjectName: string) => void;
    addSubject: (userId: number, newSubject: Omit<Subject, 'id'>) => void;
}

const SubjectsContext = createContext<SubjectsContextType | undefined>(undefined);

interface SubjectsProviderProps {
    children: ReactNode;
}

export const SubjectsProvider: React.FC<SubjectsProviderProps> = ({ children }) => {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const loadSubjects = async (professorId: number) => {
        try {
            const response = await axios.get(`${BASE_URL}professor/${professorId}/subjects`);
            setSubjects(response.data.result);
        } catch (error) {
            console.error('Error loading subjects:', error);
        }
    };

    const updateSubject = async (userId: number, subjectId: number, subjectName: string) => {
        try {
            const response = await axios.patch(`${BASE_URL}subjects/${userId}/${subjectId}`, {
                subjectName
            });
            if (response.status === 200) {
                loadSubjects(userId); // Reload subjects after update
            }
        } catch (error) {
            console.error('Error updating subject:', error);
        }
    };

    const addSubject = async (userId: number, newSubject: Omit<Subject, 'id'>) => {
        try {
            const response = await axios.post(`${BASE_URL}subjects/${userId}/new`, newSubject);
            if (response.status === 200) {
                loadSubjects(userId); // Reload subjects after adding
            }
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    return (
        <SubjectsContext.Provider value={{ subjects, loadSubjects, updateSubject, addSubject }}>
            {children}
        </SubjectsContext.Provider>
    );
};

export const useSubjects = (): SubjectsContextType => {
    const context = useContext(SubjectsContext);
    if (!context) {
        throw new Error('useSubjects must be used within a SubjectsProvider');
    }
    return context;
};
