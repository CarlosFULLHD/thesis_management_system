import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/globals"; // Asegúrate de que esta URL esté configurada correctamente a tu endpoint backend
import { Button } from "@nextui-org/react"; // Ajusta la importación según tu biblioteca de componentes UI

interface Subject {
  idSubject: number;
  subjectName: string;
}

const SubjectsFilter: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}subjects`);
        if (response.status === 200) {
          setSubjects(response.data);
        } else {
          toast.error("Failed to fetch subjects");
        }
      } catch (error) {
        toast.error("Failed to fetch subjects");
      }
    };

    fetchSubjects();
  }, []);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <h3>Filtro:</h3>
      <div className="flex flex-row">
        <Button onClick={handleToggle} className="bg-blue-dark text-off-white ">
          {showAll ? "Ocultar" : "Ver más"}
        </Button>
        <ul
          className={`flex flex-wrap ${showAll ? "" : "overflow-hidden h-10"}`}
        >
          {subjects.map((subject) => (
            <li key={subject.idSubject} className="mr-2 mb-2">
              <Button>{subject.subjectName}</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubjectsFilter;
