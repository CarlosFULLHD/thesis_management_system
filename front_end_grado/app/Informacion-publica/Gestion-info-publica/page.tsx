"use client";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import InfoTable from "./components/InfoTable"; // Whole table component

import PublicInfoProvider from "./providers/PublicInfoProvider";

const GestionInformacionPublica = () => {

   return (

    <ReactQueryClientProvider>
      <PublicInfoProvider>
        <InfoTable/>
      </PublicInfoProvider>
    </ReactQueryClientProvider>
  );
};

export default GestionInformacionPublica;


