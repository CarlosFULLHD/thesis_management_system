"use client";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import FormalDefenseProvider from "../providers/formalDefenseProvider";
import FrameComponent from "./components/frameComponent";
import { useSearchParams } from "next/navigation";
import AcademicPeriodHasGradeProfileProvider from "../providers/academicPeriodHasGradeProfileProvider";



const CreateFormalDefense = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const idGradePro = parseInt(params.get("idGradePro")!);
    return (
        <ReactQueryClientProvider>
            <FormalDefenseProvider>
                <AcademicPeriodHasGradeProfileProvider>
                    <FrameComponent idGradePro={idGradePro} />
                </AcademicPeriodHasGradeProfileProvider>
            </FormalDefenseProvider>
        </ReactQueryClientProvider>
    );
};

export default CreateFormalDefense;
