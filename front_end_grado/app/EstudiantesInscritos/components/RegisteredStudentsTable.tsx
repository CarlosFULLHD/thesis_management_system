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

const fetchStudents = async (): Promise<ActiveStudent[]> => {
  const { data } = await axios.get(`${BASE_URL}student/active-students`);
  return data.result;
};

const RegisteredStudentsTable = () => {
  const [selectedStudent, setSelectedStudent] = useState<ActiveStudent | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useQuery<ActiveStudent[], Error>({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const handleOpenModal = (student: ActiveStudent) => {
    setSelectedStudent(student);
    setModalOpen(true);
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

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-6">
        Estudiantes Inscritos:
      </h1>
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
    </div>
  );
};

export default RegisteredStudentsTable;
