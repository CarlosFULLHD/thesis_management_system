"use client";
import { ReactQueryClientProvider } from "./providers/ReactQueryClientProvider"; // Query provider
import { DesertionProvider } from "./providers/DesertionProviders";
import DesertionTable from "./components/DesertionStudentsTable";

const EstudiantesAbandonoHistoria= () => {

   return (

    <ReactQueryClientProvider>
      <DesertionProvider>
        <DesertionTable/>
      </DesertionProvider>
    </ReactQueryClientProvider>
  );
};

export default EstudiantesAbandonoHistoria;


