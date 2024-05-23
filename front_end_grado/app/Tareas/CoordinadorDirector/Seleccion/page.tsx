"use client";

import React from 'react';
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import { useSearchParams } from "next/navigation";
import FrameComponent from './components/frameComponent';
import TaskGradeProfileProvider from '../providers/taskGradeProfileProvider';

const SelectTasks = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idGradePro = parseInt(params.get("idGradePro")!);

  return (
    <ReactQueryClientProvider>
      <TaskGradeProfileProvider>
        <FrameComponent idGradePro={idGradePro}/>
      </TaskGradeProfileProvider>
    </ReactQueryClientProvider>
  );
};

export default SelectTasks;
