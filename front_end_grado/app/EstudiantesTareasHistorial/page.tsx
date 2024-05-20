"use client";
import React from "react";
import { ReactQueryClientProvider } from "../providers/ReactQueryClientProvider"; 
import StudentsTabs from "./components/StudentsTabs";
import { StudentsTaskHistoryProvider } from "./providers/StudentsTaskHistoryProvider";
import {Switch} from "@nextui-org/react";

const EstudiantesInscritos = () => {
    let selection=0;
    let tipo="";
    const [isSelected, setIsSelected] = React.useState(true);
    if(isSelected){
        selection=1;
        tipo="tutor";
    }
    else{
        selection=2;
        tipo="relator";
    }
    return (
        <>
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-6">
            Ver mis estudiantes asignados
        </h1>
            <div className="flex flex-col gap-2 mb-4">
                <Switch defaultSelected color="secondary" isSelected={isSelected} onValueChange={setIsSelected}>
                    Eres {tipo} de los estudiantes:
                </Switch>  
            </div>
            <ReactQueryClientProvider>
                    <StudentsTaskHistoryProvider tutorLecturer={selection}>
                            <StudentsTabs/>
                    </StudentsTaskHistoryProvider>
            </ReactQueryClientProvider>
        </>
    );
};

export default EstudiantesInscritos;


