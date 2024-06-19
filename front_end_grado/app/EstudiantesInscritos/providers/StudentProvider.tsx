// StudentProvider.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/globals";
import { toast } from "react-toastify";

interface Person {
  idPerson: number;
  ci: string;
  name: string;
  email: string;
  cellPhone: string;
  createdAt: string;
  description: string;
  fatherLastName: string;
  motherLastName: string;
  status: number;
}

interface ActiveStudent {
  personResponse: Person;
  usersId: number;
}

export interface ApiResponse {
  timeStamp: string;
  status: number;
  message: string;
  result: {
    totalItem: number;
    data: ActiveStudent[];
    totalPages: number;
  };
}

interface StudentContextType {
  students: ActiveStudent[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  filter: string;
  sort: { field: string; order: string };
  setTotalPages: (totalPages: number) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilter: (filter: string) => void;
  setSort: (sort: { field: string; order: string }) => void;
  fetchStudents: () => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

interface StudentProviderProps {
  children: React.ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({
  children,
}) => {
  const [students, setStudents] = useState<ActiveStudent[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ field: "fatherLastName", order: "asc" });

  const fetchStudents = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `${BASE_URL}student/active-students`,
        {
          params: {
            page: currentPage,
            size: pageSize,
            filter: filter,
            sort: `${sort.field},${sort.order}`,
          }
        }
      );
      console.log("Estudiantes activos api");
      if (response.data.status == 200) {
        console.log(response.data.result.data);
        setStudents(response.data.result.data);
        setTotalPages(response.data.result.totalPages);
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

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handleSortChange = (field: string) => {
    const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order });
  };

  useEffect(() => {
    fetchStudents();
  }, [currentPage, pageSize, filter, sort]);

  return (
    <StudentContext.Provider 
      value={{ 
        students,
        totalPages,
        currentPage,
        pageSize,
        filter,
        sort,
        setTotalPages,
        setCurrentPage,
        setPageSize,
        setFilter,
        setSort,
        fetchStudents,
      }}>
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
