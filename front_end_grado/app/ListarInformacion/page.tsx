"use client";
import InfoTable from "./components/InfoTable"; // Whole table component
import { ReactQueryClientProvider } from "./providers/ReactQueryClientProvider"; // Query provider
import PublicInfoProvider from "./providers/PublicInfoProvider";

const ListarInformacion = () => {

   return (

    <ReactQueryClientProvider>
      <PublicInfoProvider>
        <InfoTable/>
      </PublicInfoProvider>
    </ReactQueryClientProvider>
  );
};

export default ListarInformacion;


