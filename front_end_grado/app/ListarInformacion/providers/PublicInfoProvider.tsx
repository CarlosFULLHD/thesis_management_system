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
    addPublicInfo: (newPublicInfo: Map<number, PublicInfoItem>) => void;
    removePublicInfo: (idPublicInfo: number) => void;
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

    const addPublicInfo = (newPublicInfo: Map<number, PublicInfoItem>) => {
        setPublicInfo(newPublicInfo);
    };

    const removePublicInfo = (idPublicInfo: number) => {
        setPublicInfo((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.delete(idPublicInfo);
            return newMap;
        });
    }

    return (
        <PublicInfoContext.Provider value={{ publicInfoMap, cleanPublicInfoMap,addPublicInfo, removePublicInfo }}>
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
