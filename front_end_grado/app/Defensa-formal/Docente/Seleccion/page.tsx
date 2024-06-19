"use client";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import FormalDefenseProvider from "../providers/formalDefenseProvider";

import { useSession } from "@/app/providers/SessionProvider";
import AcademicPeriodHasGradeProfileProvider from "../providers/academicPeriodHasGradeProfileProvider";
import FrameComponent from "./components/frameComponent";
import { useSearchParams } from "next/navigation";



const SelectFormalDefense = () => {
    // Account provider
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const idGradePro = parseInt(params.get("idGradePro")!);
    const { userDetails } = useSession();
    if (userDetails?.role == "DOCENTE") {

        return (
            <ReactQueryClientProvider>
                <AcademicPeriodHasGradeProfileProvider>
                <FormalDefenseProvider>
                    <FrameComponent idGradePro={idGradePro} />
                </FormalDefenseProvider>
                </AcademicPeriodHasGradeProfileProvider>
            </ReactQueryClientProvider>
        );
    } else {
        return (
            <>Acceso denegado</>
        )
    }
}

export default SelectFormalDefense;
