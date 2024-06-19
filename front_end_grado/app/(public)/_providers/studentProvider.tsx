import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/globals"; // Global url for my endpoint

interface StudentItem {
  idPerson?: number;
  ci: string;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  email: string;
  cellPhone: string;
}

interface StudentContextType {
  students: StudentItem[];
  addStudent: (studentData: Omit<StudentItem, "idPerson">) => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [students, setStudents] = useState<StudentItem[]>([]);

  const addStudent = async (studentData: Omit<StudentItem, "idPerson">) => {
    try {
      const response = await axios.post(
        `${BASE_URL}student/register`,
        studentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "200") {
        setStudents((prevStudents) => [...prevStudents, response.data.result]);
      }
    } catch (error) {
      console.error("Error registering new student:", error);
      throw error;
    }
  };

  return (
    <StudentContext.Provider value={{ students, addStudent }}>
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
