"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/globals';
import { useSession } from '@/app/providers/SessionProvider';

export interface UsersDetailsApi {
    userId: number;
    personId: number;
    ci: string;
    name: string;
    fatherLastName: string;
    motherLastName: string;
    description: string;
    email: string;
    cellPhone: string;
    status: number;
    createdAt: string;
    userRole: string;
}

interface UserContextType {
    user: UsersDetailsApi | null;
    fetchUserFromDB: () => void;
    clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UsersDetailsApi | null>(null);
    const { userDetails } = useSession();

    const fetchUserFromDB = async () => {
        try {
            const userId = userDetails?.userId;
            if (!userId) return;

            const response = await axios.get(`${BASE_URL}users/${userId}`);
            if (response.status === 200) {
                setUser(response.data.result);
            } else {
                console.error(`Failed to fetch user: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const clearUser = () => {
        setUser(null);
    };

    useEffect(() => {
        if (userDetails?.userId) {
            fetchUserFromDB();
        }
    }, [userDetails]);

    return (
        <UserContext.Provider value={{ user, fetchUserFromDB, clearUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserApi = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export default UserProvider;
