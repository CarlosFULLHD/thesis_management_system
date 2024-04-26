// StudentDashboard.tsx
import React, { useState } from "react";

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

import { useStudentDashboard } from "../dashboardInformation/providers/StudentDashboardProvider";
import AcceptStudentButton from "./AcceptStudentButton";
import RejectStudentButton from "./RejectStudentButton";

const StudentDashboard = () => {
  const [loading, setLoading] = useState(false);
  const {
    students,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    filter,
    setFilter,
    sort,
    setSort,
    fetchStudents,
  } = useStudentDashboard();
  const [totalPages, setTotalPages] = useState(10);
  if (!students) {
    return <CircularProgress aria-label="Loading..." />;
  }

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };
  const handleFilterChange = (e: { target: { value: any } }) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (field: string) => {
    // Toggle between 'asc' and 'desc'
    const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order });
    fetchStudents(); // Optionally re-fetch the sorted data
  };
  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Filter by name..."
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: "10px" }}
      />
      <Button onClick={() => handleSortChange("name")}>
        Ordenar por nombre
      </Button>
      <div className="w-full">
        <Button
          className="mb-6 bg-primary-50 font-bold px-10 shadow-md"
          onClick={fetchStudents}
          disabled={loading}
        >
          Refrescar
        </Button>
      </div>
      <Table
        fullWidth
        aria-label="Tabla de estudiantes en espera de aprobación"
      >
        <TableHeader>
          <TableColumn>Carnet</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Celular</TableColumn>
          <TableColumn>Fecha de Creación</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.idPerson}>
              <TableCell>{student.ci}</TableCell>
              <TableCell>
                {student.name} {student.fatherLastName} {student.motherLastName}
              </TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.cellPhone}</TableCell>
              <TableCell>{student.createdAt}</TableCell>

              <TableCell>
                <RejectStudentButton
                  idPerson={student.idPerson}
                  setLoading={setLoading}
                  disabled={loading}
                />
                <AcceptStudentButton
                  idPerson={student.idPerson}
                  setLoading={setLoading}
                  disabled={loading}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        total={totalPages}
        initialPage={1}
        color="secondary"
        page={currentPage}
      />
    </div>
  );
};

export default StudentDashboard;
