import { BASE_URL } from '@/config/globals';
import { ReactNode, createContext, useContext, useState } from 'react';
export interface GradeProfileStudentInterface {
    gradeProfile: GradeProfile;
    tutor: Lecturer;
    lecturer: Lecturer;
}

// Provider structure interface (methods and data types)
interface GradeProfileLecturerCollectionContextType {
    gradeProfileLecturerList: GradeProfileStudentInterface[],
    loadGradeProfileLecturerList: () => Promise<void>;
    assignTitle: (idGradePro: number, title: string) => Promise<void>;
    updateTitleByIdGradePro: (idGradePro: number, newTitle: string) => void;
}

// Provider context init
const GradeProfileLecturerCollectionContext = createContext<GradeProfileLecturerCollectionContextType | undefined>(undefined);
// Provider props with components
interface GradeProfileLecturerCollectionProps {
    children: ReactNode;
}

const GradeProfileLecturerCollectionProvider: React.FC<GradeProfileLecturerCollectionProps> = ({ children }) => {
    // Initializing the list that will contain items from DB
    const [gradeProfileLecturerList, setGradeProfileLecturerList] = useState<GradeProfileStudentInterface[]>([])

    // Fetch data function
    const fetchData = async () => fetch(`${BASE_URL}grade-profile/lecturer/all`).then((res) => res.json())
    // Load entries from DB
    const loadGradeProfileLecturerList = async () => {
        const data = await fetchData();
        if (data.status == 200) {
            var itemX: GradeProfileStudentInterface[] = data["result"].map((item: GradeProfileStudentInterface) => ({
                gradeProfile: item.gradeProfile,
                tutor: item.tutor,
                lecturer: item.lecturer,
            }))
            setGradeProfileLecturerList(itemX);
        }
    }
    // Method to assign new title to the DB
    const assignTitle = async (idGradePro: number, title: string) => {
        // URL of the endpoint
        // const url: string = `${BASE_URL}academic-period/title?idGradePro=${idGradePro}&title=${title}`;
        const url = `${BASE_URL}grade-profile/title`;
        const queryParams = new URLSearchParams({
            idGradePro: idGradePro.toString(),
            title: title
        });
        console.log("HOLA")
        try {
            const response = await fetch(`${url}?${queryParams.toString()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status == 200) {
                updateTitleByIdGradePro(idGradePro, title);
            }

        } catch (error) {
            console.error('Error updating grade profile title:', error);
            throw error;
        }
    }
    // Update an item of the list, based on the gradeProfile PK
    // const updateGradeProfileEntryByidGradePro = (idGradePro: number, newTitle: string) => {
    //     setGradeProfileLecturerList(prevList => {
    //         return prevList.map(item => {
    //             if (item.gradeProfile.idGradePro === idGradePro) {
    //                 return { ...item, gradeProfile: { ...item.gradeProfile, title: newTitle } };
    //             } else {
    //                 return item;
    //             }
    //         });
    //     });
    // };

    const updateTitleByIdGradePro = (idGradePro: number, newTitle: string) => {
        setGradeProfileLecturerList(prevList => {
            return prevList.map(item => {
                if (item.gradeProfile.idGradePro === idGradePro) {
                    return { ...item, gradeProfile: { ...item.gradeProfile, title: newTitle } };
                } else {
                    return item;
                }
            });
        });
    };

    return (
        <GradeProfileLecturerCollectionContext.Provider value={{
            gradeProfileLecturerList,
            loadGradeProfileLecturerList,
            assignTitle,
            updateTitleByIdGradePro
        }}>
            {children}
        </GradeProfileLecturerCollectionContext.Provider>
    )
}

export const useGradeProfileLecturerCollection = (): GradeProfileLecturerCollectionContextType => {
    const context = useContext(GradeProfileLecturerCollectionContext);
    if (!context) {
        throw new Error('Error desde context - task');
    }
    return context;
}

export default GradeProfileLecturerCollectionProvider;





export interface GradeProfile {
    idGradePro: number;
    roleHasPerson: RoleHasPerson;
    title: string;
    statusGraduationMode: number;
    isGradeoneortwo: number;
    status: number;
    createdAt: string;
}

export interface RoleHasPerson {
    idRolePer: number;
    rolesIdRole: RolesIDRole;
    usersIdUsers: UsersIDUsers;
    status: number;
    createdAt: string;
}

export interface RolesIDRole {
    idRole: number;
    userRole: string;
    status: number;
    createdAt: string;
}

export interface UsersIDUsers {
    idUsers: number;
    personIdPerson: PersonIDPerson;
    username: string;
    password: string;
    salt: string;
    status: number;
    createdAt: string;
}

export interface PersonIDPerson {
    idPerson: number;
    ci: string;
    name: string;
    fatherLastName: string;
    motherLastName: string;
    description: string;
    email: string;
    cellPhone: string;
    status: number;
    createdAt: string;
}

export interface Lecturer {
    idTutorApplication: number;
    roleHasPersonIdRolePer: RoleHasPerson;
    gradeProfileIdGradePro: GradeProfile;
    isAccepted: number;
    tutorLecturer: number;
    status: number;
    createdAt: string;
}