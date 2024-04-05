"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import { signIn } from "next-auth/react";

interface GoogleSignInButtonProps {
  onSignInSuccess: () => void; // Tipando la función como una que no recibe argumentos y no retorna nada
}

export function GoogleSignInButton({ onSignInSuccess }: GoogleSignInButtonProps) {
  const handleClick = async () => {
    // Intenta iniciar sesión con Google
    const result = await signIn("google", { redirect: false });

    // Si el inicio de sesión es exitoso y se provee una función de éxito, llámala
    if (result?.ok && onSignInSuccess) {
      onSignInSuccess();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}