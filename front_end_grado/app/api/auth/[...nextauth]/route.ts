import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

async function fetchUserRole(email: string) {
    const url = `${process.env.BASE_URL}auth/getRole`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const roleName = await response.text();
    return roleName;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            // Suponiendo que `user.email` esté disponible
            const email = user.email ?? '';
            const role = await fetchUserRole(email);
            session.user.role = role;
            return session;
        }
    },
})

export { handler as GET, handler as POST };
