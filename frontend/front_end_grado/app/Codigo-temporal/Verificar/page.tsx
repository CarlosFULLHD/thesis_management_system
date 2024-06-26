"use client";
import { ReactQueryClientProvider } from "../../providers/ReactQueryClientProvider";
import CodeVerifier from "./components/CodeVerifier";
import CodigoTemporalTitle from "./components/CodigoTemporalTitle";


const VerificarCodigoTemporal = () => {
  return (
    <ReactQueryClientProvider>
     <CodigoTemporalTitle/>
     <CodeVerifier/>
    </ReactQueryClientProvider>
  );
}

export default VerificarCodigoTemporal;