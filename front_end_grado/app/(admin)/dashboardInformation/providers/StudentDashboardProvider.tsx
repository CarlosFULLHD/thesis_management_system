// StudentDashboardProvider.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/globals"; // Global url for my endpoint
import { toast } from "react-toastify";

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
  currentPage: number;
  pageSize: number;
  filter: string;
  sort: { field: string; order: string };
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilter: (filter: string) => void;
  setSort: (sort: { field: string; order: string }) => void;
  fetchStudents: () => void;
  rejectStudent: (idPerson: number) => Promise<void>;
  acceptStudent: (idPerson: number, description: string) => Promise<void>;
  refreshStudents: () => void;
}

const StudentDashboardContext = createContext<
  StudentDashboardContextType | undefined
>(undefined);

export const StudentDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ field: "createdAt", order: "asc" }); // Example
  const fetchStudents = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get<StudentResponse>(
        `${BASE_URL}student/waiting-for-approval`,
        {
          params: {
            page: currentPage - 1,
            pageSize: pageSize,
            filter: filter,
            sortField: sort.field,
            sortOrder: sort.order,
          },
          // headers: {
          //   Authorization: `Bearer ${token}`, // AUTH OFF
          // },
        }
      );
      if (response.data.status === "200") {
        setStudents(response.data.result);
      } else {
        toast.error("Error al obtener estudiantes");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Error al obtener estudiantes");
    }
  };

  const handleFilterChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (field: string) => {
    const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order });
  };

  const rejectStudent = (idPerson: number): Promise<void> => {
    const token = localStorage.getItem("token");
    return toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios.delete(
            `${BASE_URL}student/${idPerson}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Usa el token en los headers de Authorization
              },
            }
          );
          if (response.status === 200) {
            setStudents((currentStudents) =>
              currentStudents.filter((student) => student.idPerson !== idPerson)
            );
            resolve();
            fetchStudents();
          } else {
            reject(new Error("No se pudo rechazar al estudiante"));
          }
        } catch (error) {
          console.error("Error rejecting student:", error);
          reject(error);
        }
      }),
      {
        pending: "Rechazando estudiante...",
        success: "Estudiante rechazado correctamente.",
        error: "Error al rechazar al estudiante.",
      }
    );
  };

  const acceptStudent = (
    idPerson: number,
    description: string
  ): Promise<void> => {
    const token = localStorage.getItem("token");
    return toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          // Si el textarea de condiciones no está vacío, actualiza la descripción
          if (description.trim() !== "") {
            await axios.patch(
              `${BASE_URL}student/update-description/${idPerson}`,
              {
                description,
                headers: {
                  Authorization: `Bearer ${token}`, // Usa el token en los headers de Authorization
                },
              }
            );
          }
          const response = await axios.post(`${BASE_URL}users/student`, {
            personIdPerson: { idPerson },
            headers: {
              Authorization: `Bearer ${token}`, // Usa el token en los headers de Authorization
            },
          });
          if (response.status === 201) {
            resolve();
            fetchStudents(); // Actualizar la lista de estudiantes después de aceptar
          } else {
            reject(new Error("No se pudo aceptar al estudiante"));
          }
        } catch (error) {
          console.error("Error accepting student:", error);
          reject(error);
        }
      }),
      {
        pending: "Aceptando estudiante...",
        success: "Estudiante aceptado y cuenta creada con éxito.",
        error: "Error al aceptar al estudiante.",
      }
    );
  };

  useEffect(() => {
    fetchStudents();
  }, [currentPage, pageSize, filter, sort]);

  const refreshStudents = () => {
    fetchStudents();
  };
  return (
    <StudentDashboardContext.Provider
      value={{
        students,
        currentPage,
        pageSize,
        filter,
        sort,
        setCurrentPage,
        setPageSize,
        setFilter,
        setSort,
        fetchStudents,
        rejectStudent,
        acceptStudent,
        refreshStudents,
      }}
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
