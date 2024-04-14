"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import GradeProfileCollection from "./components/GradeProfileCollection";


const VerPerfilGrado = () => {
  return (
    <ReactQueryClientProvider>
     <GradeProfileCollection/>
    </ReactQueryClientProvider>
  );
};

export default VerPerfilGrado;
