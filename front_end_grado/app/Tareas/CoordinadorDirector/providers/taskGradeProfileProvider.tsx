import { createContext, useContext, useState, ReactNode } from 'react';
import { BASE_URL } from '@/config/globals';
// Define the structure of the data
interface Task {
  idTaskState: number;
  taskStateDescription: string;
  taskStateStatus: number;
  ci: string;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  personDescription: string;
  email: string;
  cellPhone: string;
  gradeProfileTitle: string;
  statusGraduationMode: number;
  isGradeoneortwo: number;
  semester: string;
  titleTask: string;
  task: string;
  feedback: string;
  orderIs: number;
  publicationDate: string;
  deadline: string;
  taskStatus: number;
  meeting: boolean;
  url: boolean;
}

// Define the context
interface TaskContextType {
  tasks: Task[];
  loadTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskGradeProfileProviderProps {
  children: ReactNode;
}

// Define the provider
const TaskGradeProfileProvider: React.FC<TaskGradeProfileProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const response = await fetch(`${BASE_URL}task/gradeProfile/1`);
    const data = await response.json();
    setTasks(data);
  };

  return (
    <TaskContext.Provider value={{ tasks, loadTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

// Define a hook for easy context access
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskGradeProfileProvider');
  }
  return context;
};

export default TaskGradeProfileProvider;