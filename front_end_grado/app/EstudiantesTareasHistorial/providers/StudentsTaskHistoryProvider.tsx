// StudentsTaskHistoryProvider.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/globals";

export interface Task {
  title: string;
  createdAt: string;
  comments: string;
  isTaskCurrent: number;
  idGradeTask: number;
  isTaskDone: number;
}

export interface GradeProfileTask {
  username: string;
  title: string;
  statusGraduationMode: number;
  status: number;
  tasks: Task[];
}

interface TaskContextType {
  tasks: GradeProfileTask[];
  fetchTasks: () => void;
}

// Asegurándonos de que el valor por defecto del contexto sea siempre válido
const defaultContextValue: TaskContextType = {
  tasks: [],
  fetchTasks: () => {} // No hacer nada como implementación por defecto
};

export const TaskContext = createContext<TaskContextType>(defaultContextValue);

interface TaskProviderProps {
  children: React.ReactNode;
  tutorLecturer: number; // Puede ser 1 o 2, según tu lógica de aplicación.
}

export const StudentsTaskHistoryProvider: React.FC<TaskProviderProps> = ({
  children,
  tutorLecturer,
}) => {
  const [tasks, setTasks] = useState<GradeProfileTask[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}grade-profile-tasks/tasks?tutorLecturer=${tutorLecturer}&roleHasPersonId=3`
      );
      console.log("Tareas del perfil de grado cargadas");
      console.log(response.data);
      setTasks(response.data.result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tutorLecturer]);

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a StudentsTaskHistoryProvider");
  }
  return context;
};
