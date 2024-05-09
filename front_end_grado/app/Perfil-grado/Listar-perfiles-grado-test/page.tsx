"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import GradeProfileCollection from "./components/GradeProfileCollection";


const ListarPerfilesGrado = () => {
  return (
    <ReactQueryClientProvider>
     <GradeProfileCollection/>
    </ReactQueryClientProvider>
  );
};

export default ListarPerfilesGrado;
