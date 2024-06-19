"use client";
import React from 'react';
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import { useSearchParams } from "next/navigation";
import FrameComponent from './components/frameComponent';
import TaskGradeProfileProvider from '../providers/taskGradeProfileProvider';
import { TaskCountProvider } from '../providers/taskCountProvider'; // Import the new provider

const SelectTasks = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idGradePro = parseInt(params.get("idGradePro")!);

  return (
    <ReactQueryClientProvider>
      <TaskGradeProfileProvider idGradeProfile={idGradePro}>
        <TaskCountProvider idGradeProfile={idGradePro}>
          <FrameComponent idGradePro={idGradePro}/>
        </TaskCountProvider>
      </TaskGradeProfileProvider>
    </ReactQueryClientProvider>
  );
};

export default SelectTasks;
