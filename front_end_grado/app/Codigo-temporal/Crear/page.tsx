"use client";
import { ReactQueryClientProvider } from "../../providers/ReactQueryClientProvider";
import CodigoTemporalForm from "./components/CodigoTemporalForm";
import CodigoTemporalInfo from "./components/CodigoTemporalInfo";
import CodigoTemporalTitle from "./components/CodigoTemporalTitle";

const CrearCodigoTemporal = () => {
  return (
    <ReactQueryClientProvider>
      <CodigoTemporalTitle/>
      <CodigoTemporalForm/>
      <CodigoTemporalInfo/>
    </ReactQueryClientProvider>
  );
}

export default CrearCodigoTemporal;