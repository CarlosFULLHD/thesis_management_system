// StudentDashboard.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@nextui-org/react";

import { useStudentDashboard } from "../dashboardInformation/providers/StudentDashboardProvider";
import AcceptStudentButton from "./AcceptStudentButton";
import RejectStudentButton from "./RejectStudentButton";

const StudentDashboard = () => {
  const { students, fetchStudents } = useStudentDashboard();

  if (!students) {
    return <CircularProgress aria-label="Loading..." />;
  }

  return (
    <div className="w-full">
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
                  onRejection={fetchStudents}
                />
                <AcceptStudentButton idPerson={student.idPerson} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentDashboard;
