"use client";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import { useSession } from "@/app/providers/SessionProvider";
import MilestoneStudentProvider from "../providers/MilestoneStudentProvider";
import StudentMileStoneState from "./components/StudentMileStoneState";




const CartaEstudiante = () => {
  // Account provider
  const { userDetails } = useSession();
  if (userDetails?.role == "ESTUDIANTE") {
    return (
      <ReactQueryClientProvider>
        <MilestoneStudentProvider>
          <StudentMileStoneState userDetails={userDetails}/>
        </MilestoneStudentProvider>
      </ReactQueryClientProvider>
    );
  }
};

export default CartaEstudiante;
