"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  CircularProgress,
  Button
} from "@nextui-org/react";
import { BASE_URL } from "@/config/globals";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PersonItem, usePerson } from "../../Providers/PersonProvider";
import TutorsSelect from "./TutorsSelect";
import { number } from "zod";

interface StudentsTableProps {
  initialPage: number;
  pageSize: number;
}

const StudentsTable: React.FC<StudentsTableProps> = ({initialPage, pageSize}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const { personMap, fetchPerson } = usePerson();
  const [sortField, setSortField] = useState('fatherLastName');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (newSortField: string) => {
    setSortField(newSortField);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  }

  const [selectedTutors, setSelectTutors] = useState<Record<number, number>>({});

  const handleTutorChange = (studentId: number, selectedTutorId: number) => {
    setSelectTutors((prevTutors) => ({ ...prevTutors, [studentId]: selectedTutorId }));
};

  const fetchData = async ()=> {
    const res = await fetch(`${BASE_URL}student/active-students?page=${currentPage}&size=${pageSize}&sort=${sortField},${sortDirection}`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    console.log(data);
    // setTotalPages(data.totalPages);
    // console.log("Total de paginas " + setTotalPages);
    return data;
  };

  const loadStudents = (responseData: any) => {
    const personItems: Map<number, PersonItem> = new Map();
    if (responseData["status"] == 200) {
      responseData["result"].forEach((entry: { userId: number, personResponse: PersonItem }) => {
        const person = entry.personResponse;
        if (person) {
          personItems.set(person.idPerson, person);
        }
      });
    }
    fetchPerson(personItems);
  }

  const { isLoading, error } = useQuery({
    queryKey: ["infoTable", sortField, sortDirection],
    queryFn: async () => {
      const data = await fetchData();
      loadStudents(data);
      return data;
    }
  });

  if (isLoading) {
    return <CircularProgress aria-label="Loading..." />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // const bottomContent = React.useMemo(() => {
  //   return (
  //     <div className="py-2 px-2 flex justify-between items-center">
  //       <Pagination
  //         isCompact
  //         showControls
  //         showShadow
  //         color="primary"
  //         page={currentPage + 1}
  //         total={totalPages}
  //         onChange={(newPage) => setCurrentPage(newPage - 1)}
  //       />
  //       <div className="hidden sm:flex w-[30%] justify-end gap-2">
  //         <Button isDisabled={currentPage === 0} size="sm" variant="flat" onPress={() => setCurrentPage(currentPage - 1)}>
  //           Previous
  //         </Button>
  //         <Button isDisabled={currentPage >= totalPages - 1} size="sm" variant="flat" onPress={() => setCurrentPage(currentPage + 1)}>
  //           Next
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }, [currentPage, totalPages]);

  if (personMap.size > 0) {
    return (
        <Table
          isCompact
          aria-label="Student data table"
          //bottomContent={bottomContent}
          >
          <TableHeader>
            <TableColumn><span onClick={() => handleSort('name')}>Nombre</span></TableColumn>
            <TableColumn><span onClick={() => handleSort('fatherLastName')}>Apellido Paterno</span></TableColumn>
            <TableColumn onClick={() => handleSort('motherLastName')}>Apellido Materno</TableColumn>
            <TableColumn onClick={() => handleSort('email')}>Correo</TableColumn>
            <TableColumn onClick={() => handleSort('cellPhone')}>Teléfono</TableColumn>
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
                <TableCell><TutorsSelect 
                  studentId={student.idPerson}
                  selectedTutorId={selectedTutors[student.idPerson]}
                  onChange={handleTutorChange}
                /></TableCell>
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

export default StudentsTable;