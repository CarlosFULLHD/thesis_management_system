"use client";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import FormalDefenseProvider from "../providers/formalDefenseProvider";

import { useSession } from "@/app/providers/SessionProvider";
import GradeProfileStudentProvider from "../providers/gradeProfileStudentProvider";
import FrameComponent from "./components/frameComponent";
import { useSearchParams } from "next/navigation";
import React from "react";



const SelectDefenseStudent = () => {
    // Account provider
    const { userDetails } = useSession();
    if (userDetails?.role == "ESTUDIANTE") {

        return (
            <ReactQueryClientProvider>
                <GradeProfileStudentProvider>
                <FormalDefenseProvider>
                    <FrameComponent userDetails={userDetails} />
                </FormalDefenseProvider>
                </GradeProfileStudentProvider>
            </ReactQueryClientProvider>
        );
    } else {
        return (
            <>Acceso denegado</>
        )
    }
}

export default SelectDefenseStudent;
