"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import GradeProfileLecturerCollectionProvider from "./providers/gradeProfileLecturerCollectionProvider";
import GradeProfileLecturerCollection from "./components/gradeProfileCollection";
import LecturerCollectionProvider from "./providers/lecturerCollectionProvider";



const ListarPerfilesGradoTest = () => {
  return (
    <ReactQueryClientProvider>
      <GradeProfileLecturerCollectionProvider>
        <LecturerCollectionProvider>
          <GradeProfileLecturerCollection />
        </LecturerCollectionProvider>
      </GradeProfileLecturerCollectionProvider>
    </ReactQueryClientProvider>
  );
};

export default ListarPerfilesGradoTest;
