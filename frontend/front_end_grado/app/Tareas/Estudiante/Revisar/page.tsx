"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import { useSession } from "@/app/providers/SessionProvider";
import { useSearchParams } from "next/navigation";
import TaskProvider from "../providers/tasksProvider";
import TitleComponent from "./components/titleComponent";
import TaskToReviewComponent from "./components/taskToReviewComponent";



const ReviewTaskStudent = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idTask = parseInt(params.get("idTask")!);
  // Account provider
  const { userDetails } = useSession();
  if (userDetails?.role == "ESTUDIANTE") {
    return (

      <ReactQueryClientProvider>
       <TaskProvider>
        <TitleComponent/>
        <TaskToReviewComponent idTask={idTask}/>
      </TaskProvider>
      </ReactQueryClientProvider>
    );
  };
}

export default ReviewTaskStudent;
