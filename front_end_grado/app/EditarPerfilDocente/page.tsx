"use client";

import React from "react";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import UserProvider from "./provider/UserContextProvider";
import CombinedProvider from "./provider/CombinedProvider"; // Cambiado
import FrameComponent from './components/frameComponent';

const EditarPerfilDocente = () => {
  return (
    <ReactQueryClientProvider>
      <UserProvider>
        <CombinedProvider>
          <FrameComponent />
        </CombinedProvider>
      </UserProvider>
    </ReactQueryClientProvider>
  );
};

export default EditarPerfilDocente;
