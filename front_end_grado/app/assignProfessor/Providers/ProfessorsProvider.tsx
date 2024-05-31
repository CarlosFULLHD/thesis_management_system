"use client";
import { BASE_URL } from "@/config/globals";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface Professors {
  idRolePer: number;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  assignedStudents: number;
}

export interface ApiResponse {
  timeStamp: string;
  status: number;
  message: string;
  result: Professors[];
}

interface ProfessorsContextType {
  professors: Professors[];
  fetchProfessors: () => void;
}

const ProfessorsContext = createContext<ProfessorsContextType | undefined>(
  undefined
);

export const ProfessorsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [professors, setProfessors] = useState<Professors[]>([]);

  const fetchProfessors = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `${BASE_URL}professor/tutors`
      );
      if (response.data.status == 200) {
        console.log("Professors fetched" + response.data.result);
        setProfessors(response.data.result);
      } else {
        console.log("Error fetching tutors", response.data.message);
        toast.error("Error al cargar docentes");
      }
    } catch (error) {
      console.error("Error fetching tutors", error);
      toast.error("Error al cargar docentes");
    }
  };

  useEffect(() => {
    console.log("Fetching tutors" + professors);
    fetchProfessors();
  }, []);

  return (
    <ProfessorsContext.Provider
      value={{
        professors,
        fetchProfessors,
      }}
    >
      {children}
    </ProfessorsContext.Provider>
  );
};

export const useProfessors = (): ProfessorsContextType => {
  const context = useContext(ProfessorsContext);
  if (!context) {
    throw new Error("Error al usar docentes");
  }
  return context;
};
