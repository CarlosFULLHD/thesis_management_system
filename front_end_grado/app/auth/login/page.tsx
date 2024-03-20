"use client";
import Image from "next/image";
import googleLogo from "@/public/google.png";
import githubLogo from "@/public/github.png";
import {
  GoogleSignInButton,
  GithubSignInButton,
} from "@/components/authButtons";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { CredentialsForm } from "@/components/credentialsForm";
import { useEffect } from "react";

import React from "react";
import {Card, CardHeader, CardBody} from "@nextui-org/react";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await getServerSession(authConfig);

      console.log("Session: ", session);

      if (session) {
        router.push("/dashboardInformation");
      }
    }

    checkSession();
  }, [router]);

  return (
    
    <div className="w-full flex flex-col items-center min-h-screen py-0">
      <div className="flex flex-col items-center mt-10 p-10 shadow-md">
        <Card className="py-0">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <img
                alt="Card background"
                className="object-cover rounded-xl"
                src="/../../../public/logo-sis.png"
                height={150}
                width={150}
              />
              <p className="text-tiny uppercase font-bold">Bienvenido</p>
            <small className="text-default-500">Si ya tienes una cuenta registrada, ingresa al sistema utilizando<br></br> tu cuenta académica de Google terminada en 'ucb.edu.bo'</small>
            {/*<h4 className="font-bold text-large">Sign In</h4>*/}
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <GoogleSignInButton />
          </CardBody>
        </Card>
        
        {/*<GithubSignInButton />
          <span className="text-2xl font-semibold text-white text-center mt-8">
            Or
          </span>
          <CredentialsSignInButton /> 
        <CredentialsForm />*/}
      </div>
    </div>
  );
}