import { BASE_URL } from '@/config/globals';
import { ReactNode, createContext, useContext, useState } from 'react';
export interface LecturerInterface {
    idRolePer: number,
    name: string,
    fatherLastName: string,
    motherLastName: string,
    assignedStudents: number
}

// Provider structure interface (methods and data types)
interface LecturerCollectionContextType {
    lecturerList: LecturerInterface[],
    loadLecturerList: (isLecturer: string) => Promise<void>;
}

// Provider context init
const LecturerCollectionContext = createContext<LecturerCollectionContextType | undefined>(undefined);
// Provider props with components
interface LecturerCollectionProps {
    children: ReactNode;
}

const LecturerCollectionProvider: React.FC<LecturerCollectionProps> = ({ children }) => {
    // Initializing the list that will contain items from DB
    const [lecturerList, setLecturerList] = useState<LecturerInterface[]>([])
    // Fetch data function
    const fetchData = async (isLecturer: string) => fetch(`${BASE_URL}professor/${isLecturer}`).then((res) => res.json())
    // Load entries from DB
    const loadLecturerList = async (isLecturer: string) => {
        const data = await fetchData(isLecturer);
        if (data.status == 200) {
            var itemX: LecturerInterface[] = data["result"].map((item: LecturerInterface) => ({
                idRolePer: item.idRolePer,
                name: item.name,
                fatherLastName: item.fatherLastName,
                motherLastName: item.motherLastName,
                assignedStudents: item.assignedStudents
            }))
            setLecturerList(itemX)
        }
    }
  

        return (
            <LecturerCollectionContext.Provider value={{
                lecturerList,
                loadLecturerList
            }}>
                {children}
            </LecturerCollectionContext.Provider>
        )
    }

    export const useLecturerCollection = (): LecturerCollectionContextType => {
        const context = useContext(LecturerCollectionContext);
        if (!context) {
            throw new Error('Error desde context - task');
        }
        return context;
    }

    export default LecturerCollectionProvider;