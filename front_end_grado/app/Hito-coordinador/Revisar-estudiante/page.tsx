//page.tsx
"use client";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import ReviewStudentTitle from "./components/ReviewStudentTitle";
import { useSearchParams } from "next/navigation";
import MilestoneStudentProvider from "./providers/MilestoneStudentProvider";
import ReviewStudentForm from "./components/ReviewStudentForm";

const ReviewStudent = () => {
  // Router params 
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idMilestone = params.get("idMilestone")
  const userId = params.get("userId")

  return (
    <ReactQueryClientProvider>
      <MilestoneStudentProvider>
        <ReviewStudentTitle idMilestone = {parseInt(idMilestone!,10)} userId = {parseInt(userId!,10)}/>
        <ReviewStudentForm/>
      </MilestoneStudentProvider>
    </ReactQueryClientProvider>
  );
};

export default ReviewStudent;
