// StudentDashboardProvider.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/globals"; // Global url for my endpoint
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
  rejectStudent: (idPerson: number) => Promise<void>;
}

const StudentDashboardContext = createContext<
  StudentDashboardContextType | undefined
>(undefined);

export const StudentDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get<StudentResponse>(
        `${BASE_URL}student/waiting-for-approval`
      );
      if (response.data.status === "200") {
        setStudents(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const rejectStudent = async (idPerson: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}student/${idPerson}`);
      if (response.status === 200) {
        setStudents((currentStudents) =>
          currentStudents.filter((student) => student.idPerson !== idPerson)
        );
        // Additional logic like notifications or error handling can be added here
      }
    } catch (error) {
      console.error("Error rejecting student:", error);
      // Error handling logic
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentDashboardContext.Provider
      value={{ students, fetchStudents, rejectStudent }}
    >
      {children}
    </StudentDashboardContext.Provider>
  );
};

export const useStudentDashboard = (): StudentDashboardContextType => {
  const context = useContext(StudentDashboardContext);
  if (!context) {
    throw new Error(
      "useStudentDashboard must be used within a StudentDashboardProvider"
    );
  }
  return context;
};
