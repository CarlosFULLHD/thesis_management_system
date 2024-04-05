// StudentDashboardProvider.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export interface Drive {
  linkdriveLetter: string;
  statusProfile: number;
  uploadedAt: string;
}

export interface Student {
  idPerson: number;
  ci: string;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  description: string;
  email: string;
  cellPhone: string;
  createdAt: string;
  drives: Drive[];
}

export interface StudentResponse {
  timeStamp: string;
  status: string;
  message: string;
  result: Student[];
}

interface StudentDashboardContextType {
  students: Student[];
  fetchStudents: () => void;
}

const StudentDashboardContext = createContext<StudentDashboardContextType | undefined>(undefined);

export const StudentDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get<StudentResponse>('http://127.0.0.1:8080/api/v1/student/waiting-for-approval');
      if (response.data.status === '200') {
        setStudents(response.data.result);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentDashboardContext.Provider value={{ students, fetchStudents }}>
      {children}
    </StudentDashboardContext.Provider>
  );
};

export const useStudentDashboard = (): StudentDashboardContextType => {
  const context = useContext(StudentDashboardContext);
  if (!context) {
    throw new Error('useStudentDashboard must be used within a StudentDashboardProvider');
  }
  return context;
};
