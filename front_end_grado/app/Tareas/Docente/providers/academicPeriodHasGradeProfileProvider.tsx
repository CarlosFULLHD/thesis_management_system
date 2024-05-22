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
    loadAcademicPeriodHasGradeprofileItem: (idGradePro: number) => Promise<void>;
    isAcademicPeriodHasGradeprofileEmpty : (newAcademicGrade : AcademicPeriodHasGradeProfileInterface) => boolean
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
        const data = await fetchData(idGradePro);
        if (data.status == 200){
            var itemX : AcademicPeriodHasGradeProfileInterface = data["result"]
            console.log(itemX)
            setAcademicPeriodHasGradeProfileItem(itemX)
        }
    }

    // Method to check if the academicPeriodHasGradeProfile is empty or not
    const isAcademicPeriodHasGradeprofileEmpty = (newAcademicGrade : AcademicPeriodHasGradeProfileInterface):boolean=> {
        return (
            newAcademicGrade.idAcadGrade === 0 &&
            isGradeProfileEmpty(newAcademicGrade.gradeProfileIdGradePro) &&
            isAcademicPeriodEmpty(newAcademicGrade.academicPeriodIdAcad) &&
            newAcademicGrade.status === 0 &&
            newAcademicGrade.createdAt === ""
        );
    }

    return (
        <AcademicPeriodHasGradeProfileContext.Provider value={{
            academicPeriodHasGradeProfileItem,
            loadAcademicPeriodHasGradeprofileItem,
            isAcademicPeriodHasGradeprofileEmpty,
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


// Define helper functions to check emptiness of GradeProfileIDGradePro and AcademicPeriodIDAcad
function isGradeProfileEmpty(profile: GradeProfileIDGradePro): boolean {
    return (
        profile.idGradePro === 0 &&
        isRoleHasPersonEmpty(profile.roleHasPerson) &&
        profile.title === "" &&
        profile.statusGraduationMode === 0 &&
        profile.isGradeoneortwo === 0 &&
        profile.status === 0 &&
        profile.createdAt === ""
    );
}

function isAcademicPeriodEmpty(period: AcademicPeriodIDAcad): boolean {
    return (
        period.idAcad === 0 &&
        period.semester === "" &&
        period.initDate === "" &&
        period.endDate === "" &&
        period.accountUntil === "" &&
        period.status === 0 &&
        period.createdAt === ""
    );
}

function isRoleHasPersonEmpty(role: RoleHasPerson): boolean {
    return (
        role.idRolePer === 0 &&
        isRolesIDRoleEmpty(role.rolesIdRole) &&
        isUsersIDUsersEmpty(role.usersIdUsers) &&
        role.status === 0 &&
        role.createdAt === ""
    );
}

function isRolesIDRoleEmpty(role: RolesIDRole): boolean {
    return (
        role.idRole === 0 &&
        role.userRole === "" &&
        role.status === 0 &&
        role.createdAt === ""
    );
}

function isUsersIDUsersEmpty(user: UsersIDUsers): boolean {
    return (
        user.idUsers === 0 &&
        isPersonIDPersonEmpty(user.personIdPerson) &&
        user.username === "" &&
        user.password === "" &&
        user.salt === "" &&
        user.status === 0 &&
        user.createdAt === ""
    );
}

function isPersonIDPersonEmpty(person: PersonIDPerson): boolean {
    return (
        person.idPerson === 0 &&
        person.ci === "" &&
        person.name === "" &&
        person.fatherLastName === "" &&
        person.motherLastName === "" &&
        person.description === "" &&
        person.email === "" &&
        person.cellPhone === "" &&
        person.status === 0 &&
        person.createdAt === ""
    );
}