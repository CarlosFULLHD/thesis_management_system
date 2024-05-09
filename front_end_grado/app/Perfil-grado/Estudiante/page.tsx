"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import { useSession } from "@/app/providers/SessionProvider";
import GradeProfileStudentTitle from "./components/gradeProfileStudentTitle";
import GradeProfileStudentProvider from "./providers/gradeProfileStudentProvider";
import GradeProfileComponent from "./components/gradeProfileComponent";



const PerfilGradoEstudiante = () => {
  // Account provider
  const { userDetails } = useSession();
  if (userDetails?.role == "ESTUDIANTE") {
    return (
      <ReactQueryClientProvider>
        <GradeProfileStudentProvider>
          <GradeProfileStudentTitle userDetails={userDetails} />
          <GradeProfileComponent userDetails={userDetails} />
        </GradeProfileStudentProvider>
      </ReactQueryClientProvider>
    );
  }

};

export default PerfilGradoEstudiante;
