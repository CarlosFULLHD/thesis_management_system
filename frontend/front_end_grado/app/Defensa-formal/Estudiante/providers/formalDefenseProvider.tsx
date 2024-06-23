import { BASE_URL } from '@/config/globals';
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface FormalDefenseInterface {
    idFormal?:                           number;
    taskStatesIdTaskState?:              TaskStatesIDTaskState;
    academicHasGradeProfileIdAcadGrade?: AcademicHasGradeProfileIDAcadGrade;
    feedback?:                           string;
    url?:                                string;
    formalAct?:                          string;
    plpInvolved?:                        string;
    defenseDate?:                        string;
    place?:                              string;
    grade?:                              number;
    isStudentOrLecturer?:                number;
    isGradeoneortwo?:                    number;
    status?:                             number;
    createdAt?:                          string;
}

export const emptyFormalDefense : FormalDefenseInterface  = {
    idFormal:                           -1,
    taskStatesIdTaskState:              {} as TaskStatesIDTaskState,
    academicHasGradeProfileIdAcadGrade: {} as AcademicHasGradeProfileIDAcadGrade,
    feedback:                           "",
    url:                                "",
    plpInvolved:                        "",
    defenseDate:                        "",
    place:                              "",
    grade:                              -1,
    isStudentOrLecturer:                -1,
    isGradeoneortwo:                    -1,
    status:                             -1,
    createdAt:                          "",
}



// Provider structure interface (methods and data types)
interface FormalDefenseContextType {
    formalDefenseItem : FormalDefenseInterface;
    fetchFormalDefenseItem: (idGradePro : number) => Promise<boolean>;
    putFormalDefenseItem: (newFormalDefense: FormalDefenseInterface) => Promise<boolean>;
}
// Provider context init
const FormalDefenseContext  = createContext<FormalDefenseContextType | undefined>(undefined); 
// Provider props with components
interface FormalDefenseProps {
    children: ReactNode;
}
const FormalDefenseProvider: React.FC<FormalDefenseProps> = ({ children }) => {
    // Initializing empty item
    const [formalDefenseItem, setFormalDefenseItem ] = useState<FormalDefenseInterface>(emptyFormalDefense)

    // Fetch data function
    const fetchData = async (idGradePro: number) => fetch(`${BASE_URL}formal-defense?idGradePro=${idGradePro}`).then((res) => res.json())
    // Load gradeProfileStudent from DB
    const fetchFormalDefenseItem = async (idGradePro:number): Promise<boolean> => {
        let flag : boolean = false;
        const data = await fetchData(idGradePro);
        if (data.status == 200){
            var itemx: FormalDefenseInterface = data["result"]
            setFormalDefenseItem(itemx);
            flag = true;
        }
        return flag;
    }

    // PUT => new formal defense
    const putFormalDefenseItem = async (newFormalDefense : FormalDefenseInterface) => {
        var flag = false;
        const endPointUrl: string = `${BASE_URL}formal-defense`;
        try{
            const response = await fetch(endPointUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFormalDefense)
            });
            if (response.status == 201){
                flag = true;
            }

        } catch (error: any) {

        }
        return flag;
    }


    return (
        <FormalDefenseContext.Provider value={{
            formalDefenseItem,
            fetchFormalDefenseItem,
            putFormalDefenseItem
        }}>
            {children}
        </FormalDefenseContext.Provider>
    );
}

export const useFormalDefense = (): FormalDefenseContextType => {
    const context = useContext(FormalDefenseContext);
    if (!context) {
        throw new Error('Error desde context - task');
    }
    return context;
}

export default FormalDefenseProvider;




export interface AcademicHasGradeProfileIDAcadGrade {
    idAcadGrade?:            number;
    gradeProfileIdGradePro?: GradeProfileIDGradePro;
    academicPeriodIdAcad?:   AcademicPeriodIDAcad;
    status?:                 number;
    createdAt?:              string;
}

export interface AcademicPeriodIDAcad {
    idAcad?:       number;
    semester?:     string;
    initDate?:     string;
    endDate?:      string;
    accountUntil?: string;
    status?:       number;
    createdAt?:    string;
}

export interface GradeProfileIDGradePro {
    idGradePro?:           number;
    roleHasPerson?:        RoleHasPerson;
    title?:                string;
    statusGraduationMode?: number;
    isGradeoneortwo?:      number;
    status?:               number;
    createdAt?:            string;
}

export interface RoleHasPerson {
    idRolePer?:    number;
    rolesIdRole?:  RolesIDRole;
    usersIdUsers?: UsersIDUsers;
    status?:       number;
    createdAt?:    string;
}

export interface RolesIDRole {
    idRole?:    number;
    userRole?:  string;
    status?:    number;
    createdAt?: string;
}

export interface UsersIDUsers {
    idUsers?:        number;
    personIdPerson?: PersonIDPerson;
    username?:       string;
    password?:       string;
    salt?:           string;
    status?:         number;
    createdAt?:      string;
}

export interface PersonIDPerson {
    idPerson?:       number;
    ci?:             string;
    name?:           string;
    fatherLastName?: string;
    motherLastName?: string;
    description?:    string;
    email?:          string;
    cellPhone?:      string;
    status?:         number;
    createdAt?:      string;
}

export interface TaskStatesIDTaskState {
    idTaskState?: number;
    description?: string;
    status?:      number;
    createdAt?:   string;
}
