import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/globals";
import { toast } from "react-toastify";

interface Role {
  idRole: number;
  userRole: string;
}
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
  fetchRoles: () => Promise<Role[]>;
  fetchUserById: (userId: number) => Promise<User | null>;
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
    try {
      const response = await axios.get<UserResponse>(`${BASE_URL}users`, {
        params: {
          page: currentPage,
          size: pageSize,
          filter: filter,
          sort: `${sort.field},${sort.order}`,
        },
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
    return toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios.delete(`${BASE_URL}users/${userId}`);
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

  const fetchRoles = async (): Promise<Role[]> => {
    try {
      const response = await axios.get(`${BASE_URL}roles/all`);
      return response.data.result;
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Error al obtener roles.");
      return [];
    }
  };

  const fetchUserById = async (userId: number): Promise<User | null> => {
    try {
      const response = await axios.get(`${BASE_URL}users/${userId}`);
      return response.data.result;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      toast.error("Error al obtener detalles del usuario.");
      return null;
    }
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
        fetchRoles,
        fetchUserById,
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
