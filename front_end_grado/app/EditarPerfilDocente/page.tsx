<<<<<<< HEAD
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
=======
"use client";

import React from "react";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import UserProvider from "./provider/UserContextProvider";
import CombinedProvider from "./provider/CombinedProvider"; // Cambiado
import FrameComponent from "./components/frameComponent";
import { UserInformationProvider } from "./providers/UserInformationProvider";
import UserInformation from "./components/UserInformation";

const EditarPerfilDocente = () => {
  return (
    <ReactQueryClientProvider>
      <UserInformationProvider>
        <h1 className="text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark py-6">
          Información Personal
        </h1>
        <UserInformation />
      </UserInformationProvider>
    </ReactQueryClientProvider>
  );
};

export default EditarPerfilDocente;
>>>>>>> origin/main
