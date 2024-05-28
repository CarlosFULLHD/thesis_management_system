"use client";
import React, { useState } from "react";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import { TutorsProvider, useTutors } from "../_providers/tutorsProvider";
import TutorsList from "../_components/tutorsList";

const App = () => {
  return (
    <ReactQueryClientProvider>
      <TutorsProvider>
        <h1 className="text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark pt-6">
          Tutores U.C.B.
        </h1>
        <TutorsList />
      </TutorsProvider>
    </ReactQueryClientProvider>
  );
};

export default App;
