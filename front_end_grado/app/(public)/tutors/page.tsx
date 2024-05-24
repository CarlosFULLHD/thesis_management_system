"use client";
import React, { useState } from "react";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import { TutorsProvider, useTutors } from "../_providers/tutorsProvider";
import TutorsList from "../_components/tutorsList";

const App = () => {
  return (
    <ReactQueryClientProvider>
      <TutorsProvider>
        <TutorsList />
      </TutorsProvider>
    </ReactQueryClientProvider>
  );
};

export default App;
