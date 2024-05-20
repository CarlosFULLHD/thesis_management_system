"use client";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  CircularProgress,
  Button,
  Input
} from "@nextui-org/react";
import { FaSearch, FaSort } from "react-icons/fa";
import { StudentsProfessors, useStudentsProfessors } from "../Providers/StudentsProfessorsProvider";
import { useProfessors } from "../../Providers/ProfessorsProvider";

const StudentsTable = () => {
  const [loading, setLoading] = useState(false);
  const {
    studentsProfessors,
    totalPages,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    filter,
    setFilter,
    sort,
    setSort,
    fetchStudentsProfessors,
    assignLecturer,
  } = useStudentsProfessors();

  const {
    professors,
    fetchProfessors,
  } = useProfessors();

  // To change page of the table
  const handlePagesChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  // To change the number of rows in the table
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    fetchStudentsProfessors();
  };

  // To filter the table
  const handleFilterChange = (e: { target: { value: any }}) => {
    setFilter(e.target.value);
    handlePagesChange(0, 0);
  };

  // To order the table
  const handleSortChange = (field: string) => {
    const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order });
    fetchStudentsProfessors();
  };

  const [selectedTutors, setSelectTutors] = useState<{ [key: string ]: string }>({});
  const handleLecturerChange = (event: ChangeEvent<HTMLSelectElement>, student: StudentsProfessors) => {
    const newLecturer = event.target.value;
    console.log("newLecturer: ", newLecturer);
  }

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

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={currentPage + 1}
          total={totalPages}
          onChange={(newPage) => setCurrentPage(newPage - 1)}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={currentPage === 0} size="sm" variant="flat" onPress={() => setCurrentPage(currentPage - 1)}>
            Previous
          </Button>
          <Button isDisabled={currentPage >= totalPages - 1} size="sm" variant="flat" onPress={() => setCurrentPage(currentPage + 1)}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [currentPage, totalPages]);
  
  if (!studentsProfessors) {
    return <CircularProgress aria-label="Loading..." />;
  }

  return (
    <div>
      {TopContent}
      <Table
        isCompact
        aria-label="Student data table"
        //bottomContent={bottomContent}
        >
          <TableHeader>
          <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('name')}>Nombre <FaSort /></span></TableColumn>
          <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('fatherLastName')}>Apellido Paterno <FaSort /></span></TableColumn>
          <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('motherLastName')}>Apellido Materno <FaSort /></span></TableColumn>
          <TableColumn><span style={{ display: 'flex', alignItems: 'center'}} onClick={() => handleSortChange('email')}>Correo <FaSort /></span></TableColumn>
          <TableColumn>Teléfono</TableColumn>
          <TableColumn>Tutor</TableColumn>
        </TableHeader>
        <TableBody>
          {studentsProfessors.map((student) => (
            <TableRow key={student.idGradePro}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.fatherLastName}</TableCell>
              <TableCell>{student.motherLastName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.cellPhone}</TableCell>
              <TableCell>
                <select
                  value={student.idTutor ?? ''}
                  onChange={(event) => handleLecturerChange(event, student)}
                >
                  <option key={''} value={''}>Selecciona docentes</option>
                  {professors.map((professor) => (
                    <option
                      key={professor.idRolePer}
                      value={professor.idRolePer}
                      disabled={student.idTutor == professor.idRolePer}
                    >
                      {professor.name} {professor.fatherLastName} {professor.motherLastName}
                    </option>
                  ))}
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {bottomContent}
    </div>
  );
}

export default StudentsTable;