"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import TaskProvider from "../providers/TaskProvider";
import AddTaskButton from "./components/AddTaskButton";
import CollectionTasksWorkShopTwo from "./components/CollectionTasksWorkShopTwo";


const GestionTareasDos = () => {
  return (
    <ReactQueryClientProvider>
      <TaskProvider>
        <AddTaskButton />
        <CollectionTasksWorkShopTwo />
      </TaskProvider>
    </ReactQueryClientProvider>
  );
}

export default GestionTareasDos;