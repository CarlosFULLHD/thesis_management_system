//page.tsx
"use client";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import { useSearchParams } from "next/navigation";
import MilestoneStudentProvider from "./providers/MilestoneStudentProvider";
import DetailsPanel from "./components/DetailsPanel";

const StudentDetails = () => {
  // Router params
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idMilestone = params.get("idMilestone");
  const userId = params.get("userId");

  return (
    <ReactQueryClientProvider>
      <MilestoneStudentProvider>
        <DetailsPanel
          idMilestone={parseInt(idMilestone!, 10)}
          userId={parseInt(userId!, 10)}
        />
      </MilestoneStudentProvider>
    </ReactQueryClientProvider>
  );
};

export default StudentDetails;
