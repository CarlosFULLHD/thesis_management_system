import { BASE_URL } from '@/config/globals';
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface TaskHasDateInterface {
    idTaskDate: number;
    taskIdTask: TaskIDTask;
    academicPeriodIdAcad: AcademicPeriodIDAcad;
    publicationDate: string;
    deadline: string;
    orderIs: number;
    isUrl: number;
    isMeeting: number;
    status: number;
    createdAt: string;
}

export interface AcademicPeriodIDAcad {
    idAcad: number;
    semester: string;
    initDate: string;
    endDate: string;
    accountUntil: string;
    status: number;
    createdAt: string;
}

export interface TaskIDTask {
    idTask: number;
    titleTask: string;
    task: string;
    isGradeoneortwo: number;
    status: number;
    createdAt: string;
}

// Provider structure interface (methods and data types)
interface TaskHasDateContextType {
    taskHasDateList: TaskHasDateInterface[],
    loadTaskHasDateList: (newEntry: TaskHasDateInterface[]) => void;
    loadTaskHasDateFromDB:  (idAcad:number) => Promise<void>;
    removeTaskHasDateOfList: (id: number) => void;
    getTaskHasDateById: (id: number) => TaskHasDateInterface | undefined;
    updateTaskHasDateById: (id: number, newEntry: TaskHasDateInterface) => void;
    addTaskHasDate: (newEntry: TaskHasDateInterface) => void;
}

// Provider context init
const TaskHasDateContext = createContext<TaskHasDateContextType | undefined>(undefined);
// Provider props with components
interface TaskHasDateProps {
    children: ReactNode;
}

const TaskHasDateProvider: React.FC<TaskHasDateProps> = ({ children }) => {
    // Initializing the taskHasDate list
    // Initializing the list that will contain the items from DB's
    const [taskHasDateList, setTaskHasDateList] = useState<TaskHasDateInterface[]>([]);

    // Fetch data function
    const fetchData = async (idAcad:number) => fetch(`${BASE_URL}task-date?idAcad=${idAcad}`).then((res) => res.json());

    // Load TaskHasDate for an academic period
    const loadTaskHasDateFromDB = async (idAcad: number) => {
        const data = await fetchData(idAcad);
        if (data.status == 200){
            var taskHasDateList: TaskHasDateInterface[] = data["result"].map((item:TaskHasDateInterface) => ({
                idTaskDate: item.idTaskDate,
                taskIdTask: item.taskIdTask,
                academicPeriodIdAcad: item.academicPeriodIdAcad,
                publicationDate: item.publicationDate,
                deadline: item.deadline,
                orderIs: item.orderIs,
                isUrl: item.isUrl,
                isMeeting: item.isMeeting,
                status: item.status,
                createdAt: item.createdAt,
            }))
            setTaskHasDateList(taskHasDateList);
        }
       
    }

    const loadTaskHasDateList = (newEntry: TaskHasDateInterface[]) => {
        setTaskHasDateList(newEntry);
    }

    // Remove an item of the list, based on its PK
    const removeTaskHasDateOfList = (id: number) => {
        setTaskHasDateList(prevList => prevList.filter(item => item.idTaskDate !== id))
    }

    // Get an item from the list, based on its PK
    const getTaskHasDateById = (id: number): TaskHasDateInterface | undefined => {
        return taskHasDateList.find(item => item.idTaskDate === id);
    }

    // Update an item from the list, based on its PK
    const updateTaskHasDateById = (id: number, newEntry: TaskHasDateInterface) => {
        setTaskHasDateList(prevList => {
            return prevList.map(item => item.idTaskDate === id ? { ...item, ...newEntry } : item)
        });
    }

    // Add a new item to the list
    const addTaskHasDate = (newEntry: TaskHasDateInterface) => {
        setTaskHasDateList(prevList => [...prevList, newEntry]);
    }

    return (
        <TaskHasDateContext.Provider value={{
            taskHasDateList,
            loadTaskHasDateList,
            loadTaskHasDateFromDB,
            removeTaskHasDateOfList,
            getTaskHasDateById,
            updateTaskHasDateById,
            addTaskHasDate
        }}>
            {children}
        </TaskHasDateContext.Provider>
    );
}

export const useTaskHasDate = (): TaskHasDateContextType => {
    const context = useContext(TaskHasDateContext);
    if (!context) {
        throw new Error('Error desde context - task');
    }
    return context;
}

export default TaskHasDateProvider;