"use client";
import { useSearchParams } from "next/navigation";
import TitleComponent from "./components/titleComponent";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import TaskProvider from "../providers/tasksProvider";
import TaskToUpdateComponent from "./components/taskToUpdateComponent";
import BackButton from "./components/backButton";


const UpdateTask = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idTask = parseInt(params.get("idTask")!);
  const idGradePro = parseInt(params.get("idTask")!);


  return (
    <ReactQueryClientProvider>
      <TaskProvider>
        <TitleComponent/>
        <BackButton idGradePro={idGradePro}/>
        <TaskToUpdateComponent idTask={idTask}/>
      </TaskProvider>
    </ReactQueryClientProvider>
  )
}

export default UpdateTask;