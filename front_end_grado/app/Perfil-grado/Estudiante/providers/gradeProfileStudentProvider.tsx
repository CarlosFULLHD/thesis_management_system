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
    const isGradeProfileStudentItemEmpty = (item: GradeProfileStudentInterface): boolean => {
        return (
            isGradeProfileEmpty(item.gradeProfile) &&
            isLecturerEmpty(item.tutor) &&
            isLecturerEmpty(item.lecturer)
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

// Function to check if GradeProfile object is empty
const isGradeProfileEmpty = (profile: GradeProfile): boolean => {
    return (
        profile.idGradePro === 0 &&
        isRoleHasPersonEmpty(profile.roleHasPerson) &&
        profile.title === '' &&
        profile.statusGraduationMode === 0 &&
        profile.isGradeoneortwo === 0 &&
        profile.status === 0 &&
        profile.createdAt === ''
    );
}

// Function to check if Lecturer object is empty
const isLecturerEmpty = (lecturer: Lecturer): boolean => {
    return (
        lecturer.idTutorApplication === 0 &&
        isRoleHasPersonEmpty(lecturer.roleHasPersonIdRolePer) &&
        isGradeProfileEmpty(lecturer.gradeProfileIdGradePro) &&
        lecturer.isAccepted === 0 &&
        lecturer.tutorLecturer === 0 &&
        lecturer.status === 0 &&
        lecturer.createdAt === ''
    );
}

// Function to check if RoleHasPerson object is empty
const isRoleHasPersonEmpty = (role: RoleHasPerson): boolean => {
    return (
        role.idRolePer === 0 &&
        isRolesIDRoleEmpty(role.rolesIdRole) &&
        isUsersIDUsersEmpty(role.usersIdUsers) &&
        role.status === 0 &&
        role.createdAt === ''
    );
}

// Function to check if RolesIDRole object is empty
const isRolesIDRoleEmpty = (role: RolesIDRole): boolean => {
    return (
        role.idRole === 0 &&
        role.userRole === '' &&
        role.status === 0 &&
        role.createdAt === ''
    );
}

// Function to check if UsersIDUsers object is empty
const isUsersIDUsersEmpty = (user: UsersIDUsers): boolean => {
    return (
        user.idUsers === 0 &&
        isPersonIDPersonEmpty(user.personIdPerson) &&
        user.username === '' &&
        user.password === '' &&
        user.salt === '' &&
        user.status === 0 &&
        user.createdAt === ''
    );
}

// Function to check if PersonIDPerson object is empty
const isPersonIDPersonEmpty = (person: PersonIDPerson): boolean => {
    return (
        person.idPerson === 0 &&
        person.ci === '' &&
        person.name === '' &&
        person.fatherLastName === '' &&
        person.motherLastName === '' &&
        person.description === '' &&
        person.email === '' &&
        person.cellPhone === '' &&
        person.status === 0 &&
        person.createdAt === ''
    );
}



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
