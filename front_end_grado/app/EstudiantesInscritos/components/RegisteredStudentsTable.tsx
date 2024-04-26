import React, { useState } from "react";
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
import axios from "axios";
import { BASE_URL } from "@/config/globals";
import StudentInfoModal from "./InfoButton"; // Asegúrate de que la ruta sea correcta
import DesertionModal from "./RequestDesertionButton";

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

const fetchStudents = async (
  page: number,
  filter: String,
  size = 10
): Promise<ActiveStudent[]> => {
  const { data } = await axios.get(`${BASE_URL}student/active-students`, {
    params: {
      page: page - 1, // API might expect 0-indexed pages
      filter: filter,
      size,
    },
  });
  return data.result; // Assuming 'result' contains the students data
};

const RegisteredStudentsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [totalPages, setTotalPages] = useState(10); // This should ideally come from the backend
  const [selectedStudent, setSelectedStudent] = useState<ActiveStudent | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    data: students,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["students", currentPage, filter],
    queryFn: () => fetchStudents(currentPage, filter),
  });

  const handlePageChange = (newPage: React.SetStateAction<number>) => {
    setCurrentPage(newPage);
    refetch();
  };

  const handleOpenModal = (student: ActiveStudent) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };
  const handleFilterChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log("Filter changing");
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page with the new filter
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    console.log("Form submit");
    e.preventDefault(); // Prevent the form from submitting
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || error)
    return (
      <div>Error loading students: {error?.message || "Unknown error"}</div>
    );

  const rows =
    students?.map((student) => (
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
    )) || [];

  const handleSearch = () => {
    fetchStudents(currentPage, filter); // Enable the query to run
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-6">
          Estudiantes Inscritos:
        </h1>
        <Input
          isClearable
          variant="bordered"
          color="primary"
          size="lg"
          placeholder="Filter by name, father's or mother's last name"
          value={filter}
          onChange={handleFilterChange}
        />
        {/* <Button onClick={handleSearch}>Buscar</Button> */}
        <Table fullWidth aria-label="Registered students table">
          <TableHeader>
            <TableColumn>CI</TableColumn>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Celular</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody>{rows}</TableBody>
        </Table>
        <div className="mx-auto block">
          {" "}
          <Pagination
            total={totalPages}
            initialPage={1}
            color="secondary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisteredStudentsTable;
