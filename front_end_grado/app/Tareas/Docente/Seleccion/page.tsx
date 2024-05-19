"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import FrameComponent from "./components/frameComponent";
import { useSearchParams } from "next/navigation";
import AcademicPeriodHasGradeProfileProvider from "../providers/academicPeriodHasGradeProfileProvider";


const SelectTasks = () => {
  // Router params 
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idGradePro = parseInt(params.get("idGradePro")!)

  return (
    <ReactQueryClientProvider>
      <AcademicPeriodHasGradeProfileProvider>
        <FrameComponent idGradePro={idGradePro} />
      </AcademicPeriodHasGradeProfileProvider>
    </ReactQueryClientProvider>
  );
};

export default SelectTasks;
