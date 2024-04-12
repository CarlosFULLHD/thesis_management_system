"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import TaskProvider from "../providers/TaskProvider";
import AddTaskButton from "./components/AddTaskButton";
import CollectionTasksWorkShopOne from "./components/CollectionTasksWorkShopOne";






const GestionTareasDos = () => {
  return (
    <ReactQueryClientProvider>
      <TaskProvider>
        <AddTaskButton />
        <CollectionTasksWorkShopOne />
      </TaskProvider>
    </ReactQueryClientProvider>
  );
}

export default GestionTareasDos;