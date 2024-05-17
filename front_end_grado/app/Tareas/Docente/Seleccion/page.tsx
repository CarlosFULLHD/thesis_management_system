"use client";

import React from 'react';
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import FrameComponent from "./components/frameComponent";
import { useSearchParams } from "next/navigation";

const SelectTasks = () => {
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get("userId");
  const userId = userIdParam ? parseInt(userIdParam, 10) : NaN;

  return (
    <ReactQueryClientProvider>
      {isNaN(userId) ? (
        <p>Error: ID de usuario inválido.</p>
      ) : (
        <FrameComponent userId={userId} />
      )}
    </ReactQueryClientProvider>
  );
};

export default SelectTasks;
