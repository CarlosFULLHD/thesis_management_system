import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  Pagination,
  Input,
} from "@nextui-org/react";
import { FaSort, FaSearch } from "react-icons/fa";
import { User, useUserDashboard } from "../providers/UserDashboardProvider";
import EditUserModal from "./EditUserModal";

const UserDashboard = () => {
  const [loading, setLoading] = useState(false);
  const {
    users,
    totalPages,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    filter,
    setFilter,
    sort,
    setSort,
    fetchUsers,
    deleteUser,
    fetchUserById,
  } = useUserDashboard();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  if (!users) {
    return <CircularProgress aria-label="Loading..." />;
  }

  const handlePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (e: { target: { value: any } }) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (field: string) => {
    const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order });
    fetchUsers();
  };

  const onClear = useCallback(() => {
    setFilter("");
    setCurrentPage(0);
  }, []);

  const TopContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Input
          isClearable
          type="text"
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<FaSearch />}
          value={filter}
          onClear={() => {
            onClear();
          }}
          onChange={handleFilterChange}
        />
        Cantidad de datos por página:
        <select
          className="bg-transparent outline-none text-default-400 text-small"
          onChange={(event) => handlePageSize(Number(event.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    );
  }, [filter, pageSize]);

  const handleEditClick = async (userId: number) => {
    setSelectedUserId(userId);
    setIsEditModalOpen(true);
  };

  return (
    <div className="w-full">
      {TopContent}
      <Table fullWidth aria-label="Tabla de usuarios">
        <TableHeader>
          <TableColumn>
            <span
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => handleSortChange("userId")}
            >
              Id <FaSort />
            </span>
          </TableColumn>
          <TableColumn>
            <span
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => handleSortChange("username")}
            >
              Nombre de usuario <FaSort />
            </span>
          </TableColumn>
          <TableColumn>
            <span
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => handleSortChange("name")}
            >
              Nombre <FaSort />
            </span>
          </TableColumn>
          <TableColumn>
            <span
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => handleSortChange("fatherLastName")}
            >
              Apellido Paterno <FaSort />
            </span>
          </TableColumn>
          <TableColumn>
            <span
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => handleSortChange("motherLastName")}
            >
              Apellido Materno <FaSort />
            </span>
          </TableColumn>
          <TableColumn>
            <span
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => handleSortChange("role")}
            >
              Rol <FaSort />
            </span>
          </TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.fatherLastName}</TableCell>
              <TableCell>{user.motherLastName}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  color="danger"
                  onClick={() => deleteUser(user.userId)}
                  disabled={loading}
                >
                  Eliminar
                </Button>
                <Button onPress={() => handleEditClick(user.userId)}>
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        isCompact
        showControls
        showShadow
        total={totalPages}
        initialPage={1}
        color="secondary"
        page={currentPage + 1}
        onChange={(newPage) => setCurrentPage(newPage - 1)}
      />
      <EditUserModal
        userId={selectedUserId}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        refreshUsers={fetchUsers}
      />
    </div>
  );
};

export default UserDashboard;
