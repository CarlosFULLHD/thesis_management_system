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
import AcceptStudentButton from './AcceptStudentButton';
import RejectStudentButton from './RejectStudentButton';

const StudentDashboard = () => {
  const fetchStudents = async () => {
    const response = await fetch(`${BASE_URL}student/waiting-for-approval`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, isLoading, isError, refetch } = useQuery<StudentResponse, Error>({
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
    <div className="w-full">
      <Table fullWidth aria-label="Tabla de estudiantes en espera de aprobación">
      <TableHeader>
  <TableColumn>Carnet</TableColumn>
  <TableColumn>Nombre</TableColumn>
  <TableColumn>Email</TableColumn>
  <TableColumn>Drives</TableColumn>
  <TableColumn>Celular</TableColumn>
  <TableColumn>Fecha de Creación</TableColumn>
  <TableColumn>Acciones</TableColumn>
</TableHeader>
        <TableBody >
          {data.result.map((student) => (
            <TableRow key={student.idPerson} >
              <TableCell>{student.ci}</TableCell>
              <TableCell>{student.name} {student.fatherLastName} {student.motherLastName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                {student.drives.map((drive, index) => (
                  <div key={index}>{drive.linkdriveLetter}</div>
                ))}
              </TableCell>
              <TableCell>{student.cellPhone}</TableCell>
              <TableCell>{student.createdAt}</TableCell>

              <TableCell>
              <RejectStudentButton
          idPerson={student.idPerson}
          onRejection={refetch}
        />
                <AcceptStudentButton
          idPerson={student.idPerson}
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
