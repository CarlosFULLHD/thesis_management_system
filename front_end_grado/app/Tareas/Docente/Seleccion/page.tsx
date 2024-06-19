"use client";

import React from 'react';
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import FrameComponent from "./components/frameComponent";
import { useSearchParams } from "next/navigation";
import AcademicPeriodHasGradeProfileProvider from "../providers/academicPeriodHasGradeProfileProvider";
import TaskProvider from '../providers/tasksProvider';


const SelectTasks = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idGradePro = parseInt(params.get("idGradePro")!);
  
  return (
    <ReactQueryClientProvider>
      <AcademicPeriodHasGradeProfileProvider>
        <TaskProvider>
            <FrameComponent idGradePro={idGradePro} />
        </TaskProvider>
      </AcademicPeriodHasGradeProfileProvider>
    </ReactQueryClientProvider>
  );
};

export default SelectTasks;
