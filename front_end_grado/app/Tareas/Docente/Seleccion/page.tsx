"use client";

import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import FrameComponent from "./components/frameComponent";
import { useSearchParams } from "next/navigation";


const SelectTasks = () => {
  // Router params 
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const idGradePro = parseInt(params.get("idGradePro")!)
  
  return (
    <ReactQueryClientProvider>
      <FrameComponent idGradePro={idGradePro}/>
    </ReactQueryClientProvider>
  );
};

export default SelectTasks;
