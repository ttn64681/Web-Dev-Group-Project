import { authConfig } from "./src/app/auth.config";
import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./src/app/models/userSchema";

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
                    console.log("An error occured: ", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
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
                    id: token._id as string,
                    username: token.username as string,
                    email: "NA",
                    emailVerified: null,
                };
            }
            return session;
        },
    },
});