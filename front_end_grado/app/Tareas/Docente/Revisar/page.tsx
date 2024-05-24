"use client";
import { useSearchParams } from "next/navigation";
import TitleComponent from "./components/titleComponent";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import TaskProvider from "../providers/tasksProvider";
import TaskToReviewComponent from "./components/taskToReviewComponent";

const ReviewTask = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idTask = parseInt(params.get("idTask")!);



  return (
    <ReactQueryClientProvider>
      <TaskProvider>
        <TitleComponent/>
        <TaskToReviewComponent idTask={idTask}/>
      </TaskProvider>
    </ReactQueryClientProvider>
  )
}

export default ReviewTask;