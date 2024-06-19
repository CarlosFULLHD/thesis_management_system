"use client";
import { ReactQueryClientProvider } from "./providers/ReactQueryClientProvider"; // Query provider
import { StudentProvider } from "./providers/StudentProvider";
import RegisteredStudentsTable from "./components/RegisteredStudentsTable";

const EstudiantesInscritos = () => {

   return (

    <ReactQueryClientProvider>
      <StudentProvider>
        <RegisteredStudentsTable/>
      </StudentProvider>
    </ReactQueryClientProvider>
  );
};

export default EstudiantesInscritos;


