'use client';
import React from "react";
import { Card, CardHeader, CardBody, Image, CircularProgress } from "@nextui-org/react";
import { BASE_URL } from "@/config/globals";
import { useQuery } from '@tanstack/react-query';
import { PersonItem, usePerson } from "../Providers/PersonProvider";

interface RapporteursCardProps {
  idGradeProfile: number;
}

const RapporteursCard: React.FC<RapporteursCardProps> = ({ idGradeProfile }) => {
  const { personMap, fetchPerson } = usePerson();

  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}lecturer/lecturers?idGradeProfile=${idGradeProfile}`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  };

  const loadPersonMap = (responseData: any) => {
    const personItems: Map<number, PersonItem> = (new Map());
    if (responseData["status"] == "200") {{
      console.log("Estatus 200?");
      responseData["result"].map((person: PersonItem) => (
        personItems.set(person.idPerson, person)))
    }}
    fetchPerson(personItems)
  }

  const { isLoading, isError } = useQuery({
    queryKey: ["infoCard"],
    queryFn: async () => {
      const data = await fetchData();
      loadPersonMap(data)
      return data
    }
  });

  if (isLoading) {
    return <CircularProgress aria-label="Loading..." />;
  }

  if (isError) {
    return <div>Oops!</div>;
  }

  if (personMap.size >0){
    return (
      <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-3 px-8">
        {Array.from(personMap.values()).map((person: PersonItem) => (
          <Card key={person.idPerson} className="py-4 col-span-12 sm:col-span-4 ">
            <CardBody className="overflow-visible py-2">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">{person.name}</p>
                  <small className="text-default-500">{person.description}</small>
                  <h4 className="font-bold text-large">{person.email}</h4>
                </CardHeader>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }
  else {
    return <div>
      <h1>No se han asignado Relatores</h1>
    </div>;
  }
}

export default RapporteursCard;