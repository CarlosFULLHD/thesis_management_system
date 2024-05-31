"use client";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import AcademicPeriodProvider from "../../providers/AcademicPeriodProvider";
import TaskProvider from "@/app/Gestion-tareas/providers/TaskProvider";
import CollectionOne from "./components/CollectionOne";
import TaskHasDateProvider from "../../providers/TaskHasDateProvider";


const TareasAcadUno = () => {
  return (
    <ReactQueryClientProvider>
      <AcademicPeriodProvider>
        <TaskProvider>
          <TaskHasDateProvider>
          <CollectionOne />
          </TaskHasDateProvider>
        </TaskProvider>
      </AcademicPeriodProvider>
    </ReactQueryClientProvider>
  );
};

export default TareasAcadUno;
