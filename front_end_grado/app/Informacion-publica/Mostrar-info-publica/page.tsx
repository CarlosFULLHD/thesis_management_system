"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import PublicInfoCollection from "./components/PublicInfoCollection";



const MostrarInformacionPublica = () => {
   return (
    <ReactQueryClientProvider>
      <PublicInfoCollection/>
    </ReactQueryClientProvider>
  );
};

export default MostrarInformacionPublica;


