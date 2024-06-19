//page.tsx
"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import MilestoneTitle from "./components/MilestoneTitle";
import AcademicPeriodProvider from "./providers/AcademicPeriodProvider";
import MilestoneCollectionProvider from "./providers/MilestoneCollectionProvider";
import MilestoneCollection from "./components/MilestoneCollection";




const ListarPeriodo = () => {
  return (
    <ReactQueryClientProvider>
      <AcademicPeriodProvider>
        <MilestoneCollectionProvider>
        <MilestoneTitle />
        <MilestoneCollection />
        </MilestoneCollectionProvider>
      </AcademicPeriodProvider>
    </ReactQueryClientProvider>
  );
};

export default ListarPeriodo;
