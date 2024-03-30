// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Agrega esta línea para incluir 'role' en el tipo
    }
  }
}
