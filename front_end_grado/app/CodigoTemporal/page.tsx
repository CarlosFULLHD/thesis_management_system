"use client";
import { ReactQueryClientProvider } from "../providers/ReactQueryClientProvider";
import CodeVerifier from "./components/CodeVerifier";
import CodigoTemporalTitle from "./components/CodigoTemporalTitle";


const CodigoTemporal = () => {
  return (
    <ReactQueryClientProvider>
     <CodigoTemporalTitle/>
     <CodeVerifier/>
    </ReactQueryClientProvider>
  );
}

export default CodigoTemporal;