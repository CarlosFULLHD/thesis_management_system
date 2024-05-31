import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/globals';
import { useSession } from '@/app/providers/SessionProvider'; // Asumiendo que existe un contexto similar al primero para la sesión.


export interface TaskDetails {
    idTask: number;
    titleTask: string;
    task: string;
    isGradeoneortwo: number;
    status: number;
    createdAt: string;
}

export interface TaskState {
    idTaskState: number;
    description: string;
    status: number;
    createdAt: string;
}

export interface RoleHasPerson {
    idRolePer: number;
    rolesIdRole: {
        idRole: number;
        userRole: string;
        status: number;
        createdAt: string;
    };
    usersIdUsers: {
        idUsers: number;
        personIdPerson: {
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
        };
        username: string;
        password: string;
        salt: string;
        status: number;
        createdAt: string;
    };
    status: number;
    createdAt: string;
}

export interface TaskHasDate {
    idTaskDate: number;
    taskIdTask: TaskDetails;
    academicPeriodIdAcad: {
        idAcad: number;
        semester: string;
        initDate: string;
        endDate: string;
        accountUntil: string;
        status: number;
        createdAt: string;
    };
    publicationDate: string;
    deadline: string;
    orderIs: number;
    isUrl: number;
    isMeeting: number;
    status: number;
    createdAt: string;
}

export interface GradeProfileTask {
    idGradeTask: number;
    taskStatesIdTaskState: TaskState;
    taskHasDateIdTaskHasDate: TaskHasDate;
    gradeProfileIdGradePro: {
        idGradePro: number;
        roleHasPerson: RoleHasPerson;
        title: string;
        statusGraduationMode: number;
        status: number;
        createdAt: string;
    };
    comments: string;
    publicationDate: string | null;
    deadline: string | null;
    status: number;
    createdAt: string;
}

interface TaskTimelineContextType {
    tasks: GradeProfileTask[];
    fetchTasks: (userId: number) => void;
}
const TaskTimelineContext = createContext<TaskTimelineContextType | undefined>(undefined);

interface TaskTimelineProviderProps {
    children: React.ReactNode;
}

export const TaskTimelineProvider: React.FC<TaskTimelineProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<GradeProfileTask[]>([]);
    const { userDetails } = useSession(); // Usamos el contexto de sesión para obtener detalles del usuario.

    const fetchTasks = async () => {
        if (userDetails?.role !== "ESTUDIANTE") {
            console.error("Access denied: User is not a coordinator.");
            return;
        }

        try {
            const response = await axios.get(`${BASE_URL}grade-profile-tasks/user-tasks`, {
                params: { idUsers: userDetails.userId }
            });
            console.log("Tasks fetched from API");
            console.log(response.data.result);
            setTasks(response.data.result);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        if (userDetails?.userId) {
            fetchTasks();
        }
    }, [userDetails?.userId]); // Dependiendo del ID del usuario
    

    return (
        <TaskTimelineContext.Provider value={{ tasks, fetchTasks }}>
            {children}
        </TaskTimelineContext.Provider>
    );
}

export const useTasks = (): TaskTimelineContextType => {
    const context = useContext(TaskTimelineContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskTimelineProvider');
    }
    return context;
}