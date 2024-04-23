import React, { Children } from "react";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";

import { TutorsProvider } from "../_providers/tutorsProvider";
import TutorCard from "../_components/tutorCard";
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
