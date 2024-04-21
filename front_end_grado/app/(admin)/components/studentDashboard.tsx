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
} from "@nextui-org/react";

import { useStudentDashboard } from "../dashboardInformation/providers/StudentDashboardProvider";
import AcceptStudentButton from "./AcceptStudentButton";
import RejectStudentButton from "./RejectStudentButton";

const StudentDashboard = () => {
  const [loading, setLoading] = useState(false);
  const { students, fetchStudents } = useStudentDashboard();

  if (!students) {
    return <CircularProgress aria-label="Loading..." />;
  }

  return (
    <div className="w-full">
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
    </div>
  );
};

export default StudentDashboard;
