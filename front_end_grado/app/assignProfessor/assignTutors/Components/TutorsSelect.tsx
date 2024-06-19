import React, { useState } from "react";
import {Select, SelectItem} from "@nextui-org/react";
import { HiOutlineSelector } from "react-icons/hi";
import { BASE_URL } from "@/config/globals";
import { useQuery } from "@tanstack/react-query";
import { useTutor, TutorItem } from "../../Providers/TutorProvider";
import { toast } from "react-toastify";

interface TutorSelectProps {
    studentId: number;
    selectedTutorId?: number;
    onChange: (studentId: number, selectedTutorId: number) => void;
}

export default function TutorsSelect({ studentId, selectedTutorId, onChange }: TutorSelectProps) {
    const { tutorMap, fetchTutor } = useTutor();
    const [selectTutor, setSelectTutor] = useState(undefined);

    const fetchData = async () => {
        const res = await fetch(`${BASE_URL}professor/all`);
        if (!res.ok) {
            throw new Error('Network response was not ok (${res.status})');
        }
        const data = await res.json();
        console.log(data);
        return data;
    }

    const loadProfessors = (responseData: any) => {
        const tutorItems: Map<number, TutorItem> = (new Map());
        if (responseData["status"] == "200") {
            responseData["result"].map((tutor: TutorItem) => (
                tutorItems.set(tutor.idPerson, tutor)
            ))
        }
        fetchTutor(tutorItems)
    }

    const { isLoading, isError } = useQuery({
        queryKey: ["infoSelect"],
        queryFn: async () => {
            const data = await fetchData();
            loadProfessors(data)
            return data
        }
    });

    const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedTutorId = Number(event.target.value);
        console.log("Selected tutor id: " + selectedTutorId + " for student id: " + studentId);
        onChange(studentId, selectedTutorId);

        toast.success("Docente asignado correctamente" + selectedTutorId + " for student id: " + studentId);

        // try {
        //     const response = await fetch(`${BASE_URL}lecturer/assignTutor?idStudent=${studentId}&idTutor=${selectedTutorId}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //     })
        //     // if (!response.ok) {
        //     //     toast.error("Error al asignar docente");
        //     //     throw new Error('Network response was not ok');
        //     // }
        //     console.log(response);
        //     toast.success("Docente asignado correctamente");
        // } catch (error) {
        //     throw new Error(`Network response was not ok ${error}`);
        // }
    }
    
    if (tutorMap.size > 0) {
        return (
            <Select
                value={selectedTutorId || ''}
                placeholder="Seleccione un docente"
                labelPlacement="outside"
                className="max-w-xs"
                disableSelectorIconRotation
                selectorIcon={<HiOutlineSelector />}
                onChange={handleChange}
            >
            {Array.from(tutorMap.values()).map((tutor: TutorItem) => (
                <SelectItem key={tutor.idPerson} value={tutor.idPerson}>
                {tutor.name}
                </SelectItem>
            ))}
            </Select>
        );
    } else {
        return <div>
            <h1>No se encontraron docentes</h1>
        </div>
    }
}
