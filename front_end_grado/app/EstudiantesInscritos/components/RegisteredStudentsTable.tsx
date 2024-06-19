import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Input,
} from "@nextui-org/react";
import { FaSort } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "@/config/globals";
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

// const fetchStudents = async (
//   page: number,
//   filter: String,
//   size = 10
// ): Promise<ActiveStudent[]> => {
//   const { data } = await axios.get(`${BASE_URL}student/active-students`, {
//     params: {
//       page: page - 1, // API might expect 0-indexed pages
//       filter: filter,
//       size,
//     },
//   });
//   return data.result; // Assuming 'result' contains the students data
// };

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
  // const [currentPage, setCurrentPage] = useState(1);
  // const [filter, setFilter] = useState("");
  // const [totalPages, setTotalPages] = useState(10); // This should ideally come from the backend
  const [selectedStudent, setSelectedStudent] = useState<ActiveStudent | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);
  // const {
  //   data: students,
  //   isLoading,
  //   isError,
  //   error,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["students", currentPage, filter],
  //   queryFn: () => fetchStudents(currentPage, filter),
  // });

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  }

  const handleOpenModal = (student: any) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleFilterChange = (e: { target: { value: any }}) => {
    console.log("Filter changing");
    setFilter(e.target.value);
    handlePageChange(0, 0);
  };

  const handleSortChange = (field: string) => {
    const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order });
  }

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    console.log("Form submit");
    e.preventDefault(); // Prevent the form from submitting
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (isError || error)
  //   return (
  //     <div>Error loading students: {error?.message || "Unknown error"}</div>
  //   );
    

  const handleSearch = () => {
    fetchStudents(); // Enable the query to run
  };

  const onClear = () => {
    setFilter("");
  }

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
        {/* <Button onClick={handleSearch}>Buscar</Button> */}
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
