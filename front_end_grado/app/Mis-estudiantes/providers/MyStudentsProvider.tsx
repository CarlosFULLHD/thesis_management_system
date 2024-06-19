import { BASE_URL } from '@/config/globals';
import { ReactNode, createContext, useContext, useState } from 'react';
import { boolean } from 'zod';
export interface MyStudentsInterface {
    idTutorApplication:     number;
    roleHasPersonIdRolePer: RoleHasPerson;
    gradeProfileIdGradePro: GradeProfileIDGradePro;
    isAccepted:             number;
    tutorLecturer:          number;
    status:                 number;
    createdAt:              string;
}

// Provider structure interface (methods and data types)
interface MyStudentsContextType {
    myStudentsList: MyStudentsInterface[],
    loadMyStudents: (idUsers: number, isLecturer:boolean) => Promise<void>;
}
// Provider context init
const MyStudentsContext = createContext<MyStudentsContextType | undefined>(undefined);
// Provider props with components
interface MyStudentsProps {
    children: ReactNode;
}
const MyStudentsProvider: React.FC<MyStudentsProps> = ({ children }) => {
    // Initializing the list that will contain items from DB
    const [myStudentsList, setMyStudentsList] = useState<MyStudentsInterface[]>([])


 // Fetch data function
 const fetchData = async (idUsers: number, isLecturer : boolean) => fetch(`${BASE_URL}lecturer/student-${isLecturer ? "lecturer" : "tutor"}?idUsers=${idUsers}`).then((res) => res.json())
 // Load entries from DB
 const loadMyStudents = async (idUsers: number, isLecturer: boolean) => {
     const data = await fetchData(idUsers, isLecturer);
     if (data.status == 200) {
         var itemX: MyStudentsInterface[] = data["result"].map((item: MyStudentsInterface) => ({
             idTutorApplication:     item.idTutorApplication,
             roleHasPersonIdRolePer: item.roleHasPersonIdRolePer,
             gradeProfileIdGradePro: item.gradeProfileIdGradePro,
             isAccepted:             item.isAccepted,
             tutorLecturer:          item.tutorLecturer,
             status:                 item.status,
             createdAt:              item.createdAt,
         }))
         setMyStudentsList(itemX)
     }
 }

    return (
        <MyStudentsContext.Provider value={{
            myStudentsList,
            loadMyStudents
        }}>
            {children}
        </MyStudentsContext.Provider>
    )
}

export const useMyStudents = (): MyStudentsContextType => {
    const context = useContext(MyStudentsContext);
    if (!context) {
        throw new Error('Error desde context - task');
    }
    return context;
}

export default MyStudentsProvider;

export interface GradeProfileIDGradePro {
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
    usersIdUsers: UsersIDUsers | null;
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
    username:       null;
    password:       null;
    salt:           null;
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
