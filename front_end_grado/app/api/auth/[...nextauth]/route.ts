import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

async function fetchUserRole(email: string) {
    console.log(`Fetching role for email: ${email}`);
    const url = `${process.env.BASE_URL}auth/getRole`;
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
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            console.log('Session callback called');
            const email = user?.email ?? '';
            console.log(`Email from user: ${email}`);
            if (email) {
                try {
                    const role = await fetchUserRole(email);
                    console.log(`Role fetched: ${role}`);
                    if (session.user) {
                        session.user.role = role;
                    } else {
                        console.log('User is undefined in session');
                    }
                } catch (error) {
                    console.error('Error fetching role:', error);
                }
            }
            return session;
        }
    },
});

export { handler as GET, handler as POST };
