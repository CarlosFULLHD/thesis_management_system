"use client";

import React from 'react';
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import FrameComponent from "./components/frameComponent";
import { useSearchParams } from "next/navigation";
import AcademicPeriodHasGradeProfileProvider from "../providers/academicPeriodHasGradeProfileProvider";


const SelectTasks = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idGradePro = parseInt(params.get("idGradePro")!);
  const userIdParam = searchParams.get("userId");
  const userId = userIdParam ? parseInt(userIdParam, 10) : NaN;

  return (
    <ReactQueryClientProvider>
      <AcademicPeriodHasGradeProfileProvider>
        {isNaN(userId) ? (
          <p>Error: ID de usuario inválido.</p>
        ) : (
          <FrameComponent idGradePro={idGradePro} userId={userId}/>
        )}
      </AcademicPeriodHasGradeProfileProvider>
    </ReactQueryClientProvider>
  );
};

export default SelectTasks;
