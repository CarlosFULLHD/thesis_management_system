import React, {createContext, useState, useContext, ReactNode} from 'react';

// Task item response interface
export interface TaskItem{
    idTask: number,
    titleTask: string,
    task: string,
    isGradeoneortwo: number,
    publicationDate: Date,
    deadline: Date,
    status:number,
    createdAt:Date
}
// Provider structure interface (methods and data types)
interface TaskContextType {
    taskMap: Map<number,TaskItem>;
    fetchTask: (newTask: Map<number,TaskItem>) => void;
    addTask: (newTask: TaskItem) => void;
    removeTask: (idTask: number) => void;
    updateTaskInfo : (idTask: number, newTaskEntry: TaskItem) => void;
}
// Provider context init
const TaskContext = createContext<TaskContextType | undefined>(undefined);
// Provider props with components
interface TaskProviderProps {
    children: ReactNode;
}


const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    // Initializing the map that will contain items from DB's
    const [taskMap, setTask] = useState<Map<number,TaskItem>>(new Map());

    const fetchTask = (newPublicInfo: Map<number, TaskItem>) => {
        setTask(newPublicInfo);
    };

    const addTask = (newTask : TaskItem) => {
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
        <TaskContext.Provider value={{ taskMap ,fetchTask, addTask, removeTask, updateTaskInfo}}>
            { children }
        </TaskContext.Provider>
    );
}

// Context initializer
export const useTask = () : TaskContextType => {
    const context = useContext(TaskContext);
    if (!context){
        throw new Error('Error desde context - task');
    }
    return context;
} 

export default TaskProvider;