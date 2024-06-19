import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
} from "@nextui-org/react";
import { FaSort } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import StudentInfoModal from "./InfoButton"; // Asegúrate de que la ruta sea correcta
import DesertionModal from "./RequestDesertionButton";
import { useStudents } from "../providers/StudentProvider";

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

const RegisteredStudentsTable = () => {
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
  } = useStudents();

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handleFilterChange = (e: { target: { value: any }}) => {
    setFilter(e.target.value);
    handlePageChange(0, 0);
  };

  const handleSortChange = (field: string) => {
    const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order });
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent the form from submitting
  };

  const handleSearch = () => {
    fetchStudents(); // Enable the query to run
  };

  const onClear = () => {
    setFilter("");
  };

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
          onChange={(event) => handlePageSizeChange(Number(event.target.value))}
        >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
        </select>
      </div>
    );
  }, [filter, pageSize]);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-6">
          Estudiantes Inscritos:
        </h1>
        {TopContent}
        <Table fullWidth aria-label="Registered students table">
          <TableHeader>
            <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('ci')}>CI<FaSort /></span></TableColumn>
            <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('name')}>Nombre<FaSort /></span></TableColumn>
            <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('email')}>Email<FaSort /></span></TableColumn>
            <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('cellPhone')}>Celular<FaSort /></span></TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody>
            {students?.map((student: ActiveStudent) => (
              <TableRow key={student.personResponse.idPerson}>
                <TableCell>{student.personResponse.ci}</TableCell>
                <TableCell>{`${student.personResponse.name} ${student.personResponse.fatherLastName} ${student.personResponse.motherLastName}`}</TableCell>
                <TableCell>{student.personResponse.email}</TableCell>
                <TableCell>{student.personResponse.cellPhone}</TableCell>
                <TableCell>
                  <StudentInfoModal student={student.personResponse} />
                  <DesertionModal student={student} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mx-auto block">
          {" "}
          <Pagination
            isCompact
            showControls
            showShadow
            total={totalPages}
            color="secondary"
            page={currentPage + 1}
            onChange={(newPage) => setCurrentPage(newPage - 1)}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisteredStudentsTable;
