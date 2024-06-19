import { BASE_URL } from '@/config/globals';
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Academic period response interface
export interface AcademicPeriodItem {
    idAcad: number,
    semester: string,
    initDate: string,
    endDate: string,
    accountUntil: string,
    status: number,
    createdAt:string,
}

const initialAcademicPeriod: AcademicPeriodItem = {
    idAcad: 0,
    semester: '',
    initDate: '',
    endDate: '',
    accountUntil: '',
    status: 0,
    createdAt: '',
};

// Provider structure interface (methods and data types)
interface AcademicPeriodContextType {
    mainAcademicPeriod: AcademicPeriodItem;
    fetchMainAcademicPeriod: (newAcad: AcademicPeriodItem) => void;
    isAcademicPeriodEmpty:(newAcad: AcademicPeriodItem) => boolean;
    deleteMainAcademicPeriod: () => void;
    loadAcademicPeriodByItsIdFromDB: (idAcad:number) => Promise<void>;
    getCurrentAcademicPeriod: () => Promise<void>;
    academicPeriodList: AcademicPeriodItem[],
    fetchAcademicPeriodList: (newAcademicPeriod : AcademicPeriodItem[]) => void;
    removeAcademicPeriodList:(idAcad: number) => void;
    getAcademicPeriodById: (idAcad: number) => AcademicPeriodItem | undefined;
    updateAcademicPeriodById: (idAcad: number, newAcademicPeriod: AcademicPeriodItem) => void;
    addAcademicPeriod: (newAcademicPeriod: AcademicPeriodItem) => void;


}
// Provider context init
const AcademicPeriodContext = createContext<AcademicPeriodContextType | undefined>(undefined);
// Provider props with components
interface AcademicPeriodProps {
    children: ReactNode;
}

const AcademicPeriodProvider: React.FC<AcademicPeriodProps> = ({ children }) => {
    // Initializing the mainItem
    const [mainAcademicPeriod, setMainAcademicPeriod] = useState<AcademicPeriodItem>(initialAcademicPeriod);

    // Add new mainAcademic period
    const fetchMainAcademicPeriod = (newAcad : AcademicPeriodItem) => {
        setMainAcademicPeriod(newAcad)
    }
    // Check if academic period is empty or not
    const isAcademicPeriodEmpty =(newAcad: AcademicPeriodItem): boolean => {
        return (
            newAcad.idAcad === 0 &&
            newAcad.semester === '' &&
            newAcad.initDate === '' &&
            newAcad.endDate === '' &&
            newAcad.accountUntil === '' &&
            newAcad.status === 0 &&
            newAcad.createdAt === ''
        );
    }
    // Delete an academic period
    const deleteMainAcademicPeriod = () =>{
        setMainAcademicPeriod({...initialAcademicPeriod})
    }
    // Fetch data function
    const fetchData = async (idAcad : number) => fetch(`${BASE_URL}academic-period?idAcad=${idAcad}`).then((res) => res.json());

    // Get academic period from db by it's id
    const loadAcademicPeriodByItsIdFromDB = async (idAcad: number) => {
        const data = await fetchData(idAcad)
        if (data.status == 200){
            var academicPeriod : AcademicPeriodItem = data["result"]
            setMainAcademicPeriod(academicPeriod)
        }
      
    }

    // Fetch current academic period function
    const fetchCurrentPeriod = async () => fetch(`${BASE_URL}academic-period/current-one/}`).then((res) => res.json());
    // Get current academic period from DB
    const getCurrentAcademicPeriod = async () => {
        const data = await fetchCurrentPeriod();
        if (data.status == 200){
            var academicPeriod : AcademicPeriodItem = data["result"]
            setMainAcademicPeriod(academicPeriod);
        }
    }

    // Initializing the list that will contain the items from DB's
    const [academicPeriodList, setAcademicPeriodList] = useState<AcademicPeriodItem[]>([]);

    const fetchAcademicPeriodList = (newAcademicPeriod: AcademicPeriodItem[]) => {
        setAcademicPeriodList(newAcademicPeriod);
    }

    // Remove an item of the list, based on its PK
    const removeAcademicPeriodList = (idAcad: number) => {
        setAcademicPeriodList(prevList => prevList.filter(academicPeriod => academicPeriod.idAcad !== idAcad))
    }

    // Get an item from the list, based on its PK
    const getAcademicPeriodById = (idAcad: number) : AcademicPeriodItem | undefined => {
        return academicPeriodList.find(academicPeriod => academicPeriod.idAcad === idAcad);
    }

    // Update an item from the list, based on its PK
    const updateAcademicPeriodById = (idAcad: number, newAcademicPeriod: AcademicPeriodItem) => {
        setAcademicPeriodList(prevList => {
            return prevList.map(academicPeriod => academicPeriod.idAcad === idAcad ? { ...academicPeriod, ...newAcademicPeriod } : academicPeriod)
        });
    }

    // Add a new item to the list
    const addAcademicPeriod = (newAcademicPeriod: AcademicPeriodItem) => {
        setAcademicPeriodList(prevList => [...prevList, newAcademicPeriod]);
    }



    return (
        <AcademicPeriodContext.Provider value={{ mainAcademicPeriod, fetchMainAcademicPeriod, isAcademicPeriodEmpty, deleteMainAcademicPeriod, loadAcademicPeriodByItsIdFromDB,getCurrentAcademicPeriod,
                                                 academicPeriodList, fetchAcademicPeriodList, removeAcademicPeriodList, getAcademicPeriodById,updateAcademicPeriodById, addAcademicPeriod}}>
            {children}
        </AcademicPeriodContext.Provider>
    );
}
// Context initializer
export const useAcademicPeriod = (): AcademicPeriodContextType => {
    const context = useContext(AcademicPeriodContext);
    if (!context) {
        throw new Error('Error desde context - task');
    }
    return context;
}

export default AcademicPeriodProvider;