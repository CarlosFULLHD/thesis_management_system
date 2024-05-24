"use client";
import { useSearchParams } from "next/navigation";
import TitleComponent from "./components/titleComponent";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import TaskProvider from "../providers/tasksProvider";
import TaskToUpdateComponent from "./components/taskToUpdateComponent";


const UpdateTask = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idTask = parseInt(params.get("idTask")!);



  return (
    <ReactQueryClientProvider>
      <TaskProvider>
        <TitleComponent/>
        <TaskToUpdateComponent idTask={idTask}/>
      </TaskProvider>
    </ReactQueryClientProvider>
  )
}

export default UpdateTask;