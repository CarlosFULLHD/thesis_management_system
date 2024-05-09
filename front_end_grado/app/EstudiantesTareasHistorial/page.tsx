"use client";
import React from "react";
import { ReactQueryClientProvider } from "../providers/ReactQueryClientProvider"; 
import StudentsTabs from "./components/StudentsTabs";
import { StudentsTaskHistoryProvider } from "./providers/StudentsTaskHistoryProvider";
import {Switch} from "@nextui-org/react";

const EstudiantesInscritos = () => {
    let selection=0;
    const [isSelected, setIsSelected] = React.useState(true);
    if(isSelected){
        selection=1;
    }
    else{
        selection=2;
    }
    return (
        <>
            <div className="flex flex-col gap-2">
                <Switch defaultSelected color="secondary" isSelected={isSelected} onValueChange={setIsSelected}>
                    Tipo docente
                </Switch>  
                <p className="text-small text-default-500">{isSelected ? "Tutor" : "Relator"}</p>
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


