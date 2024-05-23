import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BASE_URL } from '@/config/globals';
import axios from 'axios';

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

interface ApiResponse {
  timeStamp: string;
  status: number;
  message: string;
  result: {
    totalItem: number;
    data: Task[];
    totalPages: number;
  };
}

// Define the context
interface TaskContextType {
  tasks: Task[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  setTotalPages: (totalPages: number) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  loadTasks: (idGradeProfile: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskGradeProfileProviderProps {
  children: ReactNode;
}

// Define the provider
export const TaskGradeProfileProvider: React.FC<TaskGradeProfileProviderProps> = ({ children}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(1);
  const idGradePro = '';

  const loadTasks = async (idGradePro: number) => {
    try {
      const response = await axios.get<ApiResponse>(
        `${BASE_URL}task/gradeProfile/${idGradePro}`,
        {
          params: {
            page: currentPage,
            size: pageSize,
          },
        }
      );
      if (response.data.status != 200) {
        console.error('Error fetching tasks:', response.data.message);
        console.log("response",response.data.status);
        return;
      }
      setTasks(response.data.result.data);
      setTotalPages(response.data.result.totalPages);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks(Number(idGradePro));
  }, [currentPage, pageSize]);

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      totalPages,
      currentPage,
      pageSize,
      setTotalPages,
      setCurrentPage,
      setPageSize,
      loadTasks, 
    }}>
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
