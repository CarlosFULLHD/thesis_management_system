"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import CollectionTasksWorkShopOne from "./components/CollectionTasksWorkShopOne";
import TaskProvider from "../providers/TaskProvider";
import AddTaskButton from "./components/AddTaskButton";

const GestionTareasUno = () => {
  return (
    <ReactQueryClientProvider>
      <TaskProvider>
        <AddTaskButton />
        <CollectionTasksWorkShopOne />
      </TaskProvider>
    </ReactQueryClientProvider>
  );
}

export default GestionTareasUno;