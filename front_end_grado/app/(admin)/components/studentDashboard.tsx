// StudentDashboard.tsx
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
import { FaSort } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useStudentDashboard } from "../dashboardInformation/providers/StudentDashboardProvider";
import AcceptStudentButton from "./AcceptStudentButton";
import RejectStudentButton from "./RejectStudentButton";

const StudentDashboard = () => {
  const [loading, setLoading] = useState(false);
  const {
    students,
    totalPages,
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
  if (!students) {
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
    // Toggle between 'asc' and 'desc'
    const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order });
    fetchStudents(); // Optionally re-fetch the sorted data
  };

  const onClear = useCallback(() => {
    setFilter('');
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
          onClear={() => {onClear()}}
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
    )
  }, [filter, pageSize]);

  return (
    <div className="w-full">
      {TopContent}
      <Table
        fullWidth
        aria-label="Tabla de estudiantes en espera de aprobación"
      >
        <TableHeader>
          <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('ci')}>Carnet<FaSort /></span></TableColumn>
          <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('name')}>Nombre<FaSort /></span></TableColumn>
          <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('email')}>Email<FaSort /></span></TableColumn>
          <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('cellPhone')}>Celular<FaSort /></span></TableColumn>
          <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('createdAt')}>Fecha de Creación<FaSort /></span></TableColumn>
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
        isCompact
        showControls
        showShadow
        total={totalPages}
        initialPage={1}
        color="secondary"
        page={currentPage + 1}
        onChange={(newPage) => setCurrentPage(newPage - 1)}
      />
    </div>
  );
};

export default StudentDashboard;
