"use client";

import React from "react";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import UserProvider from "./provider/UserContextProvider";
import PersonProvider from "./provider/PersonContextProvider";
import FrameComponent from './components/frameComponent';

const EditarPerfilDocente = () => {
  return (
    <ReactQueryClientProvider>
      <UserProvider>
        <PersonProvider>
          <FrameComponent />
        </PersonProvider>
      </UserProvider>
    </ReactQueryClientProvider>
  );
};

export default EditarPerfilDocente;
