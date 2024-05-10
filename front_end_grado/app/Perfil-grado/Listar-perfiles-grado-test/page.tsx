"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import GradeProfileLecturerCollectionProvider from "./providers/gradeProfileLecturerCollectionProvider";
import GradeProfileLecturerCollection from "./components/gradeProfileCollection";



const ListarPerfilesGradoTest = () => {
  return (
    <ReactQueryClientProvider>
      <GradeProfileLecturerCollectionProvider>
        <GradeProfileLecturerCollection/>
      </GradeProfileLecturerCollectionProvider>
    </ReactQueryClientProvider>
  );
};

export default ListarPerfilesGradoTest;
