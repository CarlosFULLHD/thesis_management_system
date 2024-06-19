"use client";

import AbandonoSolicitud from "./components/AbandonoSolicitud";
import { ReactQueryClientProvider } from "./providers/ReactQueryClientProvider"; // Query provider
import { DesertionProvider } from "./providers/StudentRequestProvider";
const EstudianteAbandonoSolicitud = () => {

   return (
    <ReactQueryClientProvider>
      <DesertionProvider>
        <AbandonoSolicitud/>
      </DesertionProvider>
    </ReactQueryClientProvider>
  );
};

export default EstudianteAbandonoSolicitud;


