import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface PublicInfoItem {
    idPublicInfo: number;
    roleHasPersonIdRolePer: {
        idRolePer: number;
        rolesIdRole: {
            idRole: number;
            userRole: string;
            status: number;
            createdAt: Date;
        };
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
            createdAt: Date;
        };
        status: number;
        createdAt: Date;
    };
    title: string;
    information: string;
    status: number;
    createdAt: Date;
};

interface PublicInfoContextType {
    publicInfoMap: Map<number, PublicInfoItem>;
    cleanPublicInfoMap:() => void;
    fetchPublicInfo: (newPublicInfo: Map<number, PublicInfoItem>) => void;
    addPublicInfo:(newPublicInfoEntry: PublicInfoItem) => void;
    removePublicInfo: (idPublicInfo: number) => void;
    updatePublicInfo : (idPublicInfo: number, newPublicInfoEntry: PublicInfoItem) => void;
}


const PublicInfoContext = createContext<PublicInfoContextType | undefined>(undefined);

interface PublicInfoProviderProps {
    children: ReactNode;
}

const PublicInfoProvider: React.FC<PublicInfoProviderProps> = ({ children }) => {
    const [publicInfoMap, setPublicInfo] = useState<Map<number, PublicInfoItem>>(new Map());

   const cleanPublicInfoMap = () => {
    setPublicInfo(new Map())
   }

    const fetchPublicInfo = (newPublicInfo: Map<number, PublicInfoItem>) => {
        setPublicInfo(newPublicInfo);
    };

    const addPublicInfo = (newPublicInfoEntry: PublicInfoItem) => {
        setPublicInfo((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(newPublicInfoEntry.idPublicInfo, newPublicInfoEntry);
            return newMap;
        });
    };

    const removePublicInfo = (idPublicInfo: number) => {
        setPublicInfo((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.delete(idPublicInfo);
            return newMap;
        });
    }

    const updatePublicInfo = (idPublicInfo: number, newPublicInfoEntry: PublicInfoItem) => {
        setPublicInfo((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(idPublicInfo, newPublicInfoEntry);
            return newMap;
        });
    }

    return (
        <PublicInfoContext.Provider value={{ publicInfoMap, cleanPublicInfoMap,fetchPublicInfo, removePublicInfo, updatePublicInfo, addPublicInfo }}>
            {children}
        </PublicInfoContext.Provider>
    );
}

export const usePublicInfo = (): PublicInfoContextType => {
    const context = useContext(PublicInfoContext);
    if (!context) {
        throw new Error('Error');
    }
    return context;
}

export default PublicInfoProvider;
