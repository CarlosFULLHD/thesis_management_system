<<<<<<< HEAD
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


=======
"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import PublicInfoCollection from "./components/PublicInfoCollection";
import { PublicInfoProvider } from "./providers/PublicInfoProvider";



const MostrarInformacionPublica = () => {
   return (
    <ReactQueryClientProvider>
      <PublicInfoProvider>
        <PublicInfoCollection/>
      </PublicInfoProvider>
    </ReactQueryClientProvider>
  );
};

export default MostrarInformacionPublica;


>>>>>>> origin/main
