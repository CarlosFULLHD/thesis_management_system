import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/globals"; // URL base para tus endpoints
import { toast } from "react-toastify";

export interface User {
  userId: number;
  ci: string;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  role: string;
  description: string;
  email: string;
  cellPhone: string;
  createdAt: string;
  username: string;
  userRole: string;
}

export interface UserResponse {
  timeStamp: string;
  status: string;
  message: string;
  result: {
    totalItems: number;
    data: User[];
    totalPages: number;
  };
}

interface UserDashboardContextType {
  users: User[];
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
  fetchUsers: () => void;
  deleteUser: (userId: number) => Promise<void>;
  refreshUsers: () => void;
}

const UserDashboardContext = createContext<
  UserDashboardContextType | undefined
>(undefined);

export const UserDashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ field: "createdAt", order: "asc" });

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get<UserResponse>(`${BASE_URL}users`, {
        params: {
          page: currentPage,
          size: pageSize,
          filter: filter,
          sort: sort.field + "," + sort.order,
        },
        // headers: {
        //   Authorization: `Bearer ${token}`, // AUTH OFF
        // },
      });
      if (response.data.status === "200") {
        setUsers(response.data.result.data);
        setTotalPages(response.data.result.totalPages);
      } else {
        toast.error("Error al obtener usuarios");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error al obtener usuarios");
    }
  };

  const deleteUser = (userId: number): Promise<void> => {
    const token = localStorage.getItem("token");
    return toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios.delete(`${BASE_URL}users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Usa el token en los headers de Authorization
            },
          });
          if (response.status === 200) {
            setUsers((currentUsers) =>
              currentUsers.filter((user) => user.userId !== userId)
            );
            resolve();
            fetchUsers();
          } else {
            reject(new Error("No se pudo eliminar al usuario"));
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          reject(error);
        }
      }),
      {
        pending: "Eliminando usuario...",
        success: "Usuario eliminado correctamente.",
        error: "Error al eliminar al usuario.",
      }
    );
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize, filter, sort]);

  const refreshUsers = () => {
    fetchUsers();
  };

  return (
    <UserDashboardContext.Provider
      value={{
        users,
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
        fetchUsers,
        deleteUser,
        refreshUsers,
      }}
    >
      {children}
    </UserDashboardContext.Provider>
  );
};

export const useUserDashboard = (): UserDashboardContextType => {
  const context = useContext(UserDashboardContext);
  if (!context) {
    throw new Error(
      "useUserDashboard must be used within a UserDashboardProvider"
    );
  }
  return context;
};
