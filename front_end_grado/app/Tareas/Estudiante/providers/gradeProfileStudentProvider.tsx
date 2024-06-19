import { BASE_URL } from '@/config/globals';
import { ReactNode, createContext, useContext, useState } from 'react';
export interface GradeProfileStudentInterface {
    gradeProfile: GradeProfile;
    tutor:        Lecturer;
    lecturer:     Lecturer;
}

// Empty item for GradeProfileStudentInterface
export const emptyGradeProfileStudentItem: GradeProfileStudentInterface = {
    gradeProfile: {} as GradeProfile,
    tutor: {} as Lecturer,
    lecturer: {} as Lecturer,
};

// Provider structure interface (methods and data types)
interface GradeProfileStudentContextType {
    gradeProfileStudentItem: GradeProfileStudentInterface,
    loadGradeProfileStudentItem: (idUsers: number) => Promise<void>;
    isGradeProfileStudentItemEmpty: (newGradeProfileStudent: GradeProfileStudentInterface) => boolean;
}

// Provider context init
const GradeProfileStudentContext = createContext<GradeProfileStudentContextType | undefined>(undefined);
// Provider props with components
interface GradeProfileStudentProps {
    children: ReactNode;
}

const GradeProfileStudentProvider: React.FC<GradeProfileStudentProps> = ({ children }) => {
    // Initializing the gradeprofilestudent item
    const [gradeProfileStudentItem, setGradeProfileStudentItem] = useState<GradeProfileStudentInterface>(emptyGradeProfileStudentItem);

    // Fetch data function
    const fetchData = async (idUsers: number) => fetch(`${BASE_URL}grade-profile/lecturer?idUsers=${idUsers}`).then((res) => res.json())
    // Load gradeProfileStudent from DB
    const loadGradeProfileStudentItem = async (idUsers:number) => {
        const data = await fetchData(idUsers);
        if (data.status == 200){
            var itemx: GradeProfileStudentInterface = data["result"]
            setGradeProfileStudentItem(itemx);
        }
    }

    // Method to check if the gradeProfileStudentItem is empty or not
    const isGradeProfileStudentItemEmpty=(item:GradeProfileStudentInterface) : boolean => {
        return (
            item == emptyGradeProfileStudentItem
        );
    }

    return (
        <GradeProfileStudentContext.Provider value={{
            gradeProfileStudentItem,
            loadGradeProfileStudentItem,
            isGradeProfileStudentItemEmpty
        }}>
            {children}
        </GradeProfileStudentContext.Provider>
    );
}

export const useGradeProfileStudent = (): GradeProfileStudentContextType => {
    const context = useContext(GradeProfileStudentContext);
    if (!context) {
        throw new Error('Error desde context - task');
    }
    return context;
}

export default GradeProfileStudentProvider;

export interface GradeProfile {
    idGradePro:           number;
    roleHasPerson:        RoleHasPerson;
    title:                string;
    statusGraduationMode: number;
    isGradeoneortwo:      number;
    status:               number;
    createdAt:            string;
}

export interface RoleHasPerson {
    idRolePer:    number;
    rolesIdRole:  RolesIDRole;
    usersIdUsers: UsersIDUsers;
    status:       number;
    createdAt:    string;
}

export interface RolesIDRole {
    idRole:    number;
    userRole:  string;
    status:    number;
    createdAt: string;
}

export interface UsersIDUsers {
    idUsers:        number;
    personIdPerson: PersonIDPerson;
    username:       string;
    password:       string;
    salt:           string;
    status:         number;
    createdAt:      string;
}

export interface PersonIDPerson {
    idPerson:       number;
    ci:             string;
    name:           string;
    fatherLastName: string;
    motherLastName: string;
    description:    string;
    email:          string;
    cellPhone:      string;
    status:         number;
    createdAt:      string;
}

export interface Lecturer {
    idTutorApplication:     number;
    roleHasPersonIdRolePer: RoleHasPerson;
    gradeProfileIdGradePro: GradeProfile;
    isAccepted:             number;
    tutorLecturer:          number;
    status:                 number;
    createdAt:              string;
}
