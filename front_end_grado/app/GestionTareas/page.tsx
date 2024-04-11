"use client";
import { ReactQueryClientProvider } from "../providers/ReactQueryClientProvider";
import TaskTable from "./components/TaskTable";
import TaskProvider from "./providers/TaskProvider";


const GestionTareas = () => {
  return (
    <ReactQueryClientProvider>
      <TaskProvider>
        <TaskTable/>
      </TaskProvider>

    </ReactQueryClientProvider>
  );
}

export default GestionTareas;