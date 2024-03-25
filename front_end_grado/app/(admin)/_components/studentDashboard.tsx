// StudentDashboard.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from '@nextui-org/react';

import { BASE_URL } from "@/config/globals"; // Global url for my endpoint
import { StudentResponse } from "../dashboardInformation/providers/StudentDashboardProvider"; // Asegúrate de que la ruta sea correcta

const StudentDashboard = () => {
  const fetchStudents = async () => {
    const response = await fetch(`${BASE_URL}/student/waiting-for-approval`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, isLoading, isError } = useQuery<StudentResponse, Error>({
    queryKey: ['students'],
    queryFn: fetchStudents
  });

  if (isLoading) {
    return <CircularProgress aria-label="Loading..." />;
  }

  if (isError || !data) {
    return <div>Error al cargar los datos.</div>;
  }

  return (
    <div>
      <Table aria-label="Tabla de estudiantes en espera de aprobación">
        <TableHeader>
          <TableColumn>Carnet</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {data.result.map((student) => (
            <TableRow key={student.idPerson}>
              <TableCell>{student.ci}</TableCell>
              <TableCell>{student.name} {student.fatherLastName} {student.motherLastName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <Button color="success">Aceptar</Button>
                <Button color="danger">Rechazar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentDashboard;
