// StudentProvider.tsx
import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/globals";

export interface Student {
  idPerson: number;
  ci: string;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  email: string;
  cellPhone: string;
  createdAt: string;
}

interface StudentContextType {
  students: Student[];
  fetchStudents: () => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

interface StudentProviderProps {
  children: React.ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({
  children,
}) => {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}student/active-students?page=1&size=10`
      );
      console.log("Estudiantes activos api");
      console.log(response.data);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <StudentContext.Provider value={{ students, fetchStudents }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
};
