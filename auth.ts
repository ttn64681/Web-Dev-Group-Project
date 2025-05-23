import { authConfig } from "./src/app/auth.config";
import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./src/app/models/userSchema";

// For an explanation on this, check the NextAuth credentials documentation
// Basically this creates a session and determines what goes inside the JWT token
export const {
    handlers: { GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    const user = await User.findOne({ username: credentials.username }).lean();
                    
                    const databasePassword = user?.password.toString();
                    const givenPassword = credentials.password?.toString();

                    if (!databasePassword || !givenPassword) {
                        console.log("There was an error matching passwords");
                        return null;
                    }

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            givenPassword,
                            databasePassword
                        );

                        if (isMatch) {
                            return {
                                id: user._id as string,
                                username: user.username as string,
                            };
                        } else {
                            console.log("Username or Password is not correct");
                            return null;
                        }
                    } else {
                        console.log("User not found");
                        return null;
                    }
                } catch (error: any) {
                    console.log("An error occurred: ", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        // Determines what is inside of the session
        async jwt({ token, user, account }) {
            // Called when a JWT is created/updated
            if (user) {
                token.id = user.id as string;
                token.username = user.username as string;
            }
            return token;
        },
        async session({ session, token }) {
            // Attach custom properties to the session
            if (token) {
                session.user = {
                    id: token.id as string,
                    username: token.username as string,
                    email: "NA",
                    emailVerified: null,
                };
            }
            return session;
        },
    },
    debug: process.env.NODE_ENV === 'development',
});