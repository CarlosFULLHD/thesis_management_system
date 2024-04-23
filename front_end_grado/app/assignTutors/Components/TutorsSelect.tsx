import React from "react";
import {Select, SelectItem} from "@nextui-org/react";
import { HiOutlineSelector } from "react-icons/hi";
import { BASE_URL } from "@/config/globals";
import { useQuery } from "@tanstack/react-query";
import { useTutor, TutorItem } from "../Providers/TutorProvider";

export default function TutorsSelect() {
    const { tutorMap, fetchTutor } = useTutor();
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

    if (tutorMap.size > 0) {
        return (
            <Select
            placeholder="Seleccione un docente"
            labelPlacement="outside"
            className="max-w-xs"
            disableSelectorIconRotation
            selectorIcon={<HiOutlineSelector />}
            >
            {Array.from(tutorMap.values()).map((tutor: TutorItem) => (
                <SelectItem key={tutor.idPerson}>
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
