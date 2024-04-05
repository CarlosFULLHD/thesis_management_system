"use client";

import PublicInfoCollection from "./components/PublicInfoCollection";
import ShowPublicInfoTitle from "./components/ShowPublicInfoTitle";
import { ReactQueryClientProvider } from "./providers/ReactQueryClientProvider";


const MostrarInformacionPublica = () => {
   return (
    <ReactQueryClientProvider>
      
      <PublicInfoCollection/>
    </ReactQueryClientProvider>
  );
};

export default MostrarInformacionPublica;


