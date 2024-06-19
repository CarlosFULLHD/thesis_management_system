import { BASE_URL } from '@/config/globals';
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Task item response interface
export interface TaskItem {
    idTask: number,
    titleTask: string,
    task: string,
    isGradeoneortwo: number,
    status: number,
    createdAt: string,
}
// Provider structure interface (methods and data types)
interface TaskContextType {
    taskList: TaskItem[];
    fetchTaskList: (newTask: TaskItem[]) => void;
    removeTaskList: (idTask: number) => void;
    getTaskById: (idTask: number) => TaskItem | undefined;
    updateTaskListById: (idTask: number, newTaskEntry: TaskItem) => void;
    addTaskList: (newTask: TaskItem) => void;
    loadActiveTasksFromDB: (isGradeoneortwo: number) => Promise<void>;
    taskMap: Map<number, TaskItem>;
    fetchTask: (newTask: Map<number, TaskItem>) => void;
    addTask: (newTask: TaskItem) => void;
    removeTask: (idTask: number) => void;
    updateTaskInfo: (idTask: number, newTaskEntry: TaskItem) => void;
}
// Provider context init
const TaskContext = createContext<TaskContextType | undefined>(undefined);
// Provider props with components
interface TaskProviderProps {
    children: ReactNode;
}


const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    // Initializing the list that will contain the items from DB's
    const [taskList, setTaskList] = useState<TaskItem[]>([]);

    const fetchTaskList = (newTask: TaskItem[]) => {
        setTaskList(newTask);
    }

    const removeTaskList = (idTask: number) => {
        setTaskList(prevList => prevList.filter(task => task.idTask !== idTask));
    }

    const getTaskById = (idTask: number): TaskItem | undefined => {
        return taskList.find(task => task.idTask === idTask);
    };

    const updateTaskListById = (idTask: number, newTaskEntry: TaskItem) => {
        setTaskList(prevList => {
            return prevList.map(task => task.idTask === idTask ? { ...task, ...newTaskEntry } : task);
        });
    }

    const addTaskList = (newTaskEntry: TaskItem) => {
        setTaskList(prevList => [...prevList, newTaskEntry]);
    }

    // Fetch data function
    const fetchData = async (isGradeoneortwo: number) => fetch(`${BASE_URL}task/work-shop?isGradeoneortwo=${isGradeoneortwo}`).then((res) => res.json());

    const loadActiveTasksFromDB = async (isGradeoneortwo: number) => {
        const data = await fetchData(isGradeoneortwo)
        if (data.status == 200) {
            var taskListItems: TaskItem[] = data["result"].map((task: TaskItem) => ({
                idTask: task.idTask,
                titleTask: task.titleTask,
                task: task.task,
                isGradeoneortwo: task.isGradeoneortwo,
                status: task.status,
                createdAt: task.createdAt // Convert string to Date object
            }));
            fetchTaskList(taskListItems);
        }
    }




    // Initializing the map that will contain items from DB's
    const [taskMap, setTask] = useState<Map<number, TaskItem>>(new Map());




    const fetchTask = (newPublicInfo: Map<number, TaskItem>) => {
        setTask(newPublicInfo);
    };

    const addTask = (newTask: TaskItem) => {
        setTask((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(newTask.idTask, newTask);
            return newMap;
        });
    }

    const removeTask = (idTask: number) => {
        setTask((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.delete(idTask);
            return newMap;
        });
    }

    const updateTaskInfo = (idTask: number, newTaskEntry: TaskItem) => {
        setTask((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(idTask, newTaskEntry);
            return newMap;
        });
    }

    return (
        <TaskContext.Provider value={{ taskList, fetchTaskList, removeTaskList, getTaskById, updateTaskListById, addTaskList, loadActiveTasksFromDB,
                                        taskMap, fetchTask, addTask, removeTask, updateTaskInfo }}>
            {children}
        </TaskContext.Provider>
    );
}

// Context initializer
export const useTask = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('Error desde context - task');
    }
    return context;
}

export default TaskProvider;