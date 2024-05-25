import { BASE_URL } from '@/config/globals';
import { ReactNode, createContext, useContext, useState } from 'react';

export interface AcademicPeriodHasGradeProfileInterface {
    idAcadGrade:            number;
    gradeProfileIdGradePro: GradeProfileIDGradePro;
    academicPeriodIdAcad:   AcademicPeriodIDAcad;
    status:                 number;
    createdAt:              string;
}

// Empty item for AcademicPeriodHasGradeProfileInterface
export const emptyAcademicPeriodHasGradeProfile : AcademicPeriodHasGradeProfileInterface = {
    idAcadGrade: 0,
    gradeProfileIdGradePro: {} as GradeProfileIDGradePro,
    academicPeriodIdAcad: {} as AcademicPeriodIDAcad,
    status: -1,
    createdAt: ""
}


// Provider structure interface (methods and data types)
interface AcademicPeriodHasGradeProfileContextType {
    academicPeriodHasGradeProfileItem : AcademicPeriodHasGradeProfileInterface,
    loadAcademicPeriodHasGradeprofileItem: (idGradePro: number) => Promise<boolean>;
    
}

// Provider context init
const AcademicPeriodHasGradeProfileContext = createContext<AcademicPeriodHasGradeProfileContextType | undefined>(undefined);
// Provider props with components
interface AcademicPeriodHasGradeProfileProps {
    children: ReactNode;
}

const AcademicPeriodHasGradeProfileProvider: React.FC<AcademicPeriodHasGradeProfileProps> = ({ children }) => {

    // Initializing the academicPeriodHasGradeProfile item
    const [academicPeriodHasGradeProfileItem, setAcademicPeriodHasGradeProfileItem] = useState<AcademicPeriodHasGradeProfileInterface>(emptyAcademicPeriodHasGradeProfile)

    // Fetch data function
    const fetchData = async (idGradePro : number) => fetch(`${BASE_URL}academic-grade-profile/?idGradePro=${idGradePro}`).then((res) => res.json())
    // Load academicPeriodHasGradeProfile from DB
    const loadAcademicPeriodHasGradeprofileItem = async (idGradePro : number) => {
        let flag:boolean = false
        const data = await fetchData(idGradePro);
        if (data.status == 200){
            flag = true;
            var itemX : AcademicPeriodHasGradeProfileInterface = data["result"]
            setAcademicPeriodHasGradeProfileItem(itemX)
        }

        return flag;
    }

    
    return (
        <AcademicPeriodHasGradeProfileContext.Provider value={{
            academicPeriodHasGradeProfileItem,
            loadAcademicPeriodHasGradeprofileItem,
            
        }}>
            {children}
        </AcademicPeriodHasGradeProfileContext.Provider>
    );
}

export const useAcademicPeriodHasGradeProfile = (): AcademicPeriodHasGradeProfileContextType => {
    const context = useContext(AcademicPeriodHasGradeProfileContext);
    if (!context) {
        throw new Error('Error desde context - task');
    }
    return context;
}

export default AcademicPeriodHasGradeProfileProvider;



export interface AcademicPeriodIDAcad {
    idAcad:       number;
    semester:     string;
    initDate:     string;
    endDate:      string;
    accountUntil: string;
    status:       number;
    createdAt:    string;
}

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
