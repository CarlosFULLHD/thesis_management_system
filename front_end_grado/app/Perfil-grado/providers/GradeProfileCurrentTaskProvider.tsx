// import { BASE_URL } from "@/config/globals";
// import { ReactNode, createContext, useState } from "react";

// export interface CurrentTaskInterface {
//     idGradeTask:              number;
//     taskStatesIdTaskState:    TaskStatesIDTaskState;
//     taskHasDateIdTaskHasDate: TaskHasDateIDTaskHasDate;
//     gradeProfileIdGradePro:   GradeProfileGradePro;
//     comments:                 string;
//     publicationDate:          null;
//     deadline:                 null;
//     status:                   number;
//     createdAt:                Date;
// }

// export interface GradeProfileGradePro {
//     idGradePro:           number;
//     title:                string;
//     statusGraduationMode: number;
//     isGradeoneortwo:      number;
//     status:               number;
//     createdAt:            Date;
//     currentTask?:         CurrentTaskInterface;
//     roleHasPerson?:       RoleHasPerson;
// }

// export interface TaskHasDateIDTaskHasDate {
//     idTaskDate:           number;
//     taskIdTask:           TaskIDTask;
//     academicPeriodIdAcad: AcademicPeriodIDAcad;
//     publicationDate:      Date;
//     deadline:             Date;
//     orderIs:              number;
//     isUrl:                number;
//     isMeeting:            number;
//     status:               number;
//     createdAt:            Date;
// }

// export interface AcademicPeriodIDAcad {
//     idAcad:       number;
//     semester:     string;
//     initDate:     Date;
//     endDate:      Date;
//     accountUntil: Date;
//     status:       number;
//     createdAt:    Date;
// }

// export interface TaskIDTask {
//     idTask:          number;
//     titleTask:       string;
//     task:            string;
//     isGradeoneortwo: number;
//     status:          number;
//     createdAt:       Date;
// }

// export interface TaskStatesIDTaskState {
//     idTaskState: number;
//     description: string;
//     status:      number;
//     createdAt:   Date;
// }

// export interface RoleHasPerson {
//     idRolePer:    number;
//     rolesIdRole:  RolesIDRole;
//     usersIdUsers: UsersIDUsers;
//     status:       number;
//     createdAt:    Date;
// }

// export interface RolesIDRole {
//     idRole:    number;
//     userRole:  string;
//     status:    number;
//     createdAt: Date;
// }

// export interface UsersIDUsers {
//     idUsers:        number;
//     personIdPerson: PersonIDPerson;
//     username:       string;
//     password:       string;
//     salt:           string;
//     status:         number;
//     createdAt:      Date;
// }

// export interface PersonIDPerson {
//     idPerson:       number;
//     ci:             string;
//     name:           string;
//     fatherLastName: string;
//     motherLastName: string;
//     description:    string;
//     email:          string;
//     cellPhone:      string;
//     status:         number;
//     createdAt:      Date;
// }

// // Provider structure interface (methods and data types)
// interface GradeProfileCurrentTaskContextType {
//     gradeProfileCurrentTaskList : CurrentTaskInterface[];
// }
// // Provider context init
// const GradeProfileCurrentTaskContext = createContext<GradeProfileCurrentTaskContextType| undefined>(undefined);
// // Provider props with components
// interface GradeProfileCurrentTaskProps {
//     children: ReactNode;
// }

// const GradeProfileCurrentTaskProvider : React.FC<GradeProfileCurrentTaskProps> = ( { children }) => {
//     // Initializing the list that will contain the items from DB's
//     const [gradeProfileCurrentTaskList, setGradeProfileCurrentTaskList] = useState<CurrentTaskInterface[]>([]);
//     // Fetch data function
//     const fetchData = async (idAcad:number, isGradeoneortwo:number) => fetch(`${BASE_URL}task-date?idAcad=${idAcad}&isGradeoneortwo=${isGradeoneortwo}`).then((res) => res.json());
// }