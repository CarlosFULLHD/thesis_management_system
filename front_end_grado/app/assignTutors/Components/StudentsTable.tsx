"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  CircularProgress
} from "@nextui-org/react";
import { BASE_URL } from "@/config/globals";
import { useQuery } from "@tanstack/react-query";
import { PersonItem, usePerson } from "../Providers/PersonProvider";
import TutorsSelect from "./TutorsSelect";

export default function StudentsTable() {
  const { personMap, fetchPerson } = usePerson();

  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}student/active-students`);
    if (!res.ok) {
      throw new Error('Network response was not ok (${res.status})');
    }
    const data = await res.json();
    console.log(data);
    return data;
  };

  const loadStudents = (responseData: any) => {
    const personItems: Map<number, PersonItem> = (new Map());
    if (responseData["status"] == "200") {
      responseData["result"].forEach((entry: { personResponse: PersonItem, usersId: number }) => {
        const person = entry.personResponse;
        personItems.set(person.idPerson, person);
      });
    }
    fetchPerson(personItems)
  }

  const { isLoading, isError } = useQuery({
    queryKey: ["infoTable"],
    queryFn: async () => {
      const data = await fetchData();
      loadStudents(data)
      return data
    }
  });

  if (isLoading) {
    return <CircularProgress aria-label="Loading..." />;
  }

  if (isError) {
    return <div>Oops!</div>;
  }

  if (personMap.size > 0) {
    // const [page, setPage] = React.useState(1);
    // const rowsPerPage = 5;
    // const pages = Math.ceil(students.length / rowsPerPage);

    // const items = React.useMemo(() => {
    //   const start = (page - 1) * rowsPerPage;
    //   const end = start + rowsPerPage;
    //   return students.slice(start, end);
    // }, [page]);

    // const bottomContent = React.useMemo(() => {
    //   return (
    //     <div className="flex justify-between items-center my-4">
    //       <Pagination
    //         total={pages}
    //         initialPage={1}
    //         page={page}
    //         onChange={(newPage) => setPage(newPage)}
    //       />
    //     </div>
    //   );
    // }, [page]);

    return (
      <Table
        isCompact
        aria-label="Student data table">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Apellido Paterno</TableColumn>
          <TableColumn>Apellido Materno</TableColumn>
          <TableColumn>Correo</TableColumn>
          <TableColumn>Teléfono</TableColumn>
          <TableColumn>Tutor</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.from(personMap.values()).map((student: PersonItem) => (
            <TableRow key={student.idPerson}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.fatherLastName}</TableCell>
              <TableCell>{student.motherLastName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.cellPhone}</TableCell>
              <TableCell><TutorsSelect /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return <div>
      <h1>No hay estudiantes</h1>
    </div>
  }
}
