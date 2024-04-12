"use client";
import { ReactQueryClientProvider } from "../providers/ReactQueryClientProvider";
import GradeProfileCollection from "./components/GradeProfileCollection";


const VerPerfilGrado = () => {
  return (
    <ReactQueryClientProvider>
     <GradeProfileCollection/>
    </ReactQueryClientProvider>
  );
};

export default VerPerfilGrado;
