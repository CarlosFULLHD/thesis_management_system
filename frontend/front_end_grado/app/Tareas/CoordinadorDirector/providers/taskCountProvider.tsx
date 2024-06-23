import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface TaskCount {
  description: string;
  quantity: number;
}

interface TaskCountContextType {
  taskCounts: TaskCount[];
  loadTaskCounts: (idGradeProfile: number) => void;
}

const TaskCountContext = createContext<TaskCountContextType | undefined>(undefined);

interface TaskCountProviderProps {
  children: ReactNode;
  idGradeProfile: number;
}

export const TaskCountProvider: React.FC<TaskCountProviderProps> = ({ children, idGradeProfile }) => {
  const [taskCounts, setTaskCounts] = useState<TaskCount[]>([]);

  const loadTaskCounts = async (idGradeProfile: number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/api/v1/task/count/?idGradeProfile=${idGradeProfile}`);
      if (response.data.status !== "200") {
        console.error('Error fetching task counts:', response.data.message);
        return;
      }
      setTaskCounts(response.data.result);
    } catch (error) {
      console.error('Error fetching task counts:', error);
    }
  };

  useEffect(() => {
    loadTaskCounts(idGradeProfile);
  }, [idGradeProfile]);

  return (
    <TaskCountContext.Provider value={{ taskCounts, loadTaskCounts }}>
      {children}
    </TaskCountContext.Provider>
  );
};

export const useTaskCounts = (): TaskCountContextType => {
  const context = useContext(TaskCountContext);
  if (!context) {
    throw new Error('useTaskCounts must be used within a TaskCountProvider');
  }
  return context;
};
