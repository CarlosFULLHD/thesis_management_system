import { BASE_URL } from "@/config/globals";
import { useQuery } from "@tanstack/react-query"; // React query useQuery
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

async function fetchUserRole(email: string) {
    console.log(`Fetching role for email: ${email}`);
    const url = `${BASE_URL}auth/getRole`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        console.error(`Error fetching role: ${response.status} ${response.statusText}`);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const roleName = await response.text();
    console.log(`Role for ${email} is ${roleName}`);
    return roleName;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: 'openid profile email',
                },
            },
        }),        
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('---------------LLAMANDO CALLBACK----------------');
            //console.log('User:', user);
            //console.log('Credentials:', credentials);
            //console.log('Account:', account);
            //console.log('Profile:', profile);
            console.log('Email:', email);
            return true;
        },
        async session({ session, token }) {
            console.log('Session callback called');
            //console.log('Session object:', session);
            //console.log('Token object:', token);
            session.user = session.user || {};
    
            if (token?.email) {
                console.log(`Email from token: ${token.email}`);
                session.user.email = token.email; 
    
                try {
                    const role = await fetchUserRole(token.email);
                    console.log(`Role fetched: ${role}`);
                    session.user.role = role; // Asigna el rol al usuario en la sesión
                    token.role = role;
                } catch (error) {
                    console.error('Error fetching role:', error);
                }
            } else {
                console.log('Email is undefined in token');
            }
            return session;
        }
    },
});

export { handler as GET, handler as POST };
