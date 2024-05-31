"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import AcademicPeriodProvider from "../../providers/AcademicPeriodProvider";
import CollectionTwo from "./components/CollectionTwo";
import TaskProvider from "@/app/Gestion-tareas/providers/TaskProvider";
import TaskHasDateProvider from "../../providers/TaskHasDateProvider";

const TareasAcadDos = () => {
  return (
    <ReactQueryClientProvider>
      <AcademicPeriodProvider>
        <TaskProvider>
          <TaskHasDateProvider>
            <CollectionTwo />
          </TaskHasDateProvider>
        </TaskProvider>
      </AcademicPeriodProvider>
    </ReactQueryClientProvider>
  );
};

export default TareasAcadDos;
