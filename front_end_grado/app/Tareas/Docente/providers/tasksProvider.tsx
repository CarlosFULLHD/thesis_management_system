import { BASE_URL } from '@/config/globals';
import { ReactNode, createContext, useContext, useState } from 'react';

export interface TaskInterface {
    task?: Task;
    urls?: Urls;
    meeting?: Meeting;
}

// Empty item TaskInterface
export const emptyTask: TaskInterface = {
    task: {} as Task,
    urls: {} as Urls,
    meeting: {} as Meeting,
}

// Provider structure interface (methods and data types)
interface TaskContextType {
    taskList: TaskInterface[],
    taskItem: TaskInterface,
    loadTaskItem: (idTask: number) => Promise<boolean>;
    loadTaskList: (idGradePro: number) => Promise<void>;
    postTaskItem: (newTask: TaskInterface) => Promise<boolean>;
    reviewTaskItem: (idTask: number, idTaskState: number, feedBack: string, idGradePro:number) => Promise<boolean>;

}

// Provider context init
const TaskContext = createContext<TaskContextType | undefined>(undefined);
// Provider props with components
interface TaskProps {
    children: ReactNode;
}

const TaskProvider: React.FC<TaskProps> = ({ children }) => {
    // Initializing taskList
    const [taskList, setTaskList] = useState<TaskInterface[]>([]);
    // Initilizing task item
    const [taskItem, setTaskItem] = useState<TaskInterface>(emptyTask);

    // Fetch taskItem function
    const fetchTaskItem = async (idTask: number) => fetch(`${BASE_URL}task/current?idTask=${idTask}`).then((res) => res.json())
    // Load taskItem function
    const loadTaskItem = async (idTask: number): Promise<boolean> => {
        let flag = false
        const data = await fetchTaskItem(idTask);
        if (data.status == 200) {
            let itemX: TaskInterface = data["result"]
            setTaskItem(itemX)
            flag = true
        }
        return flag;
    }

    // Fetch data function
    const fetchData = async (idGradePro: number) => fetch(`${BASE_URL}task?idGradePro=${idGradePro}`).then((res) => res.json())
    // Load academicPeriodHasGradeProfile from DB
    const loadTaskList = async (idGradePro: number) => {
        const data = await fetchData(idGradePro);
        if (data.status == 200) {
            let itemX: TaskInterface[] = data["result"]
            setTaskList(itemX)
        }
    }


    // POST => new task
    const postTaskItem = async (newTask: TaskInterface) => {
        var flag = false;
        const endPointUrl: string = `${BASE_URL}task/`;
        const data: TaskInterface = {
            task: newTask.task,
            urls: newTask.urls,
            meeting: newTask.meeting
        };
        try {
            const response = await fetch(endPointUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.status == 201) {
                const responseData = await response.json();
                var itemx: TaskInterface = responseData["result"];
                setTaskItem(itemx);
                flag = true;
            }
        } catch (error: any) {
            console.error(error)
        }
        return flag
    }



    // PATCH => Review task (coordinator)
    const reviewTaskItem = async (idTask: number, idTaskState: number, feedBack: string, idGradePro:number): Promise<boolean> => {
        let flag: boolean = false;
        const endPointUrl: string = `${BASE_URL}task/review`
        const data = {
            idTask: idTask,
            taskStatesIdTaskState: {
                idTaskState: idTaskState
            },
            feedBack: feedBack
        }
        try {
            const response = await fetch(endPointUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.status == 200) {
                await loadTaskList(idGradePro);
                flag = true;
            }
        } catch (error: any) {
            console.error(error)
        }
        return flag;
    }








    return (
        <TaskContext.Provider value={{
            taskList,
            taskItem,
            loadTaskItem,
            loadTaskList,
            postTaskItem,
            reviewTaskItem

        }}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTasks = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('Error desde context - task');
    }
    return context;
}

export default TaskProvider;



export interface Meeting {
    idMeeting?: number;
    gradeProfileHasTaskIdTask?: Task;
    addressLink?: string;
    isVirtual?: number;
    meetingDate?: string;
    status?: number;
    createdAt?: string;
}

export interface Task {
    idTask?: number;
    taskStatesIdTaskState?: TaskStatesIDTaskState;
    academicHasGradeProfileIdAcadGrade?: AcademicHasGradeProfileIDAcadGrade;
    titleTask?: string;
    task?: string;
    feedback?: string;
    orderIs?: number;
    isUrl?: number;
    isMeeting?: number;
    isStudentOrTutor?: number;
    publicationDate?: string;
    deadline?: string;
    status?: number;
}

export interface AcademicHasGradeProfileIDAcadGrade {
    idAcadGrade?: number;
    gradeProfileIdGradePro?: GradeProfileIDGradePro;
    academicPeriodIdAcad?: AcademicPeriodIDAcad;
    status?: number;
    createdAt?: string;
}

export interface AcademicPeriodIDAcad {
    idAcad?: number;
    semester?: string;
    initDate?: string;
    endDate?: string;
    accountUntil?: string;
    status?: number;
    createdAt?: string;
}

export interface GradeProfileIDGradePro {
    idGradePro?: number;
    roleHasPerson?: RoleHasPerson;
    title?: string;
    statusGraduationMode?: number;
    isGradeoneortwo?: number;
    status?: number;
    createdAt?: string;
}

export interface RoleHasPerson {
    idRolePer?: number;
    rolesIdRole?: RolesIDRole;
    usersIdUsers?: UsersIDUsers;
    status?: number;
    createdAt?: string;
}

export interface RolesIDRole {
    idRole?: number;
    userRole?: string;
    status?: number;
    createdAt?: string;
}

export interface UsersIDUsers {
    idUsers?: number;
    personIdPerson?: PersonIDPerson;
    username?: string;
    password?: string;
    salt?: string;
    status?: number;
    createdAt?: string;
}

export interface PersonIDPerson {
    idPerson?: number;
    ci?: string;
    name?: string;
    fatherLastName?: string;
    motherLastName?: string;
    description?: string;
    email?: string;
    cellPhone?: string;
    status?: number;
    createdAt?: string;
}

export interface TaskStatesIDTaskState {
    idTaskState?: number;
    description?: string;
    status?: number;
    createdAt?: string;
}

export interface Urls {
    idUrls?: number;
    gradeProfileHasTaskIdTask?: Task;
    url?: string;
    description?: string;
    status?: number;
    createdAt?: string;
}



