import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/globals"; // Global url for my endpoint
import { toast } from "react-toastify";

interface ProfessorItem {
  idPerson?: number;
  ci: string;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  description: string;
  email: string;
  cellPhone: string;
}

interface ProfessorContextType {
  professors: ProfessorItem[];
  addProfessor: (
    professorData: Omit<ProfessorItem, "idPerson">
  ) => Promise<void>;
}

const ProfessorContext = createContext<ProfessorContextType | undefined>(
  undefined
);

export const ProfessorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [professors, setProfessors] = useState<ProfessorItem[]>([]);

  const addProfessor = async (
    professorData: Omit<ProfessorItem, "idPerson">
  ) => {
    await toast
      .promise(
        axios.post(`${BASE_URL}professor/register`, professorData, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
        {
          pending: "Registrando profesor...",
          success: "Profesor registrado con éxito",
          error: {
            render({ data }: { data: any }) {
              return (
                data?.response?.data?.message || "Error al registrar profesor"
              );
            },
          },
        }
      )
      .then((response) => {
        if (response.data.status === "200") {
          setProfessors((prevProfessors) => [
            ...prevProfessors,
            response.data.result,
          ]);
        }
      })
      .catch((error) => {
        console.error("Error registering new professor:", error);
        throw error;
      });
  };

  return (
    <ProfessorContext.Provider value={{ professors, addProfessor }}>
      {children}
    </ProfessorContext.Provider>
  );
};

export const useProfessors = (): ProfessorContextType => {
  const context = useContext(ProfessorContext);
  if (!context) {
    throw new Error("useProfessors must be used within a ProfessorProvider");
  }
  return context;
};
