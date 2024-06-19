"use client";
import { useSearchParams } from "next/navigation";
import TitleComponent from "./components/titleComponent";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import TaskProvider from "../providers/tasksProvider";
import TaskToReviewComponent from "./components/taskToReviewComponent";
import BackButton from "./components/backButton";

const ReviewTask = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idTask = parseInt(params.get("idTask")!);
  const idGradePro = parseInt(params.get("idGradePro")!);



  return (
    <ReactQueryClientProvider>
      <TaskProvider>
        <TitleComponent/>
        <BackButton idGradePro={idGradePro}/>
        <TaskToReviewComponent idTask={idTask}/>
      </TaskProvider>
    </ReactQueryClientProvider>
  )
}

export default ReviewTask;