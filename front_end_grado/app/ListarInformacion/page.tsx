"use client";
import InfoTable from "./components/InfoTable"; // Whole table component
import { ReactQueryClientProvider } from "./components/ReactQueryClientProvider"; // Query provider


const ListarInformacion = () => {

   return (
    <ReactQueryClientProvider>
      <InfoTable/>
    </ReactQueryClientProvider>
  );
};

export default ListarInformacion;


