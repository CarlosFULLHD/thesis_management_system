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
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center mt-10 p-10 shadow-md">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
        <GoogleSignInButton />
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
