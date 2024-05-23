"use client";

import React from 'react';
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import { useSearchParams } from "next/navigation";
import FrameComponent from './components/frameComponent';
import { useSession } from '@/app/providers/SessionProvider';
import GradeProfileStudentProvider from './providers/gradeProfileStudentProvider';
import TaskProvider from './providers/tasksProvider';


const SelectTasks = () => {
  // const searchParams = useSearchParams();
  // const params = new URLSearchParams(searchParams);
  // const idGradePro = parseInt(params.get("idGradePro")!);
  // Account provider
  const { userDetails } = useSession();
  if (userDetails?.role == "ESTUDIANTE") {
    return (

      <ReactQueryClientProvider>
        <GradeProfileStudentProvider>
          <TaskProvider>
            <FrameComponent userDetails={userDetails} />
          </TaskProvider>
        </GradeProfileStudentProvider>
      </ReactQueryClientProvider>
    );
  };
}

export default SelectTasks;
