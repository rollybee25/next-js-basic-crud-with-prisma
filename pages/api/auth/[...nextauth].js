import { prisma } from "../../../lib/prisma";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "johndoe@test.com"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials) {
                try
                {
                    const user = await prisma.users.findFirst({
                        where: {
                            email: credentials.email
                        }
                    });

                    if (user !== null)
                    {
                        if(user.password === credentials.password) {
                            return {
                                id: user.userId,
                                name: user.firstName+ " " + user.lastName,
                                email: user.email
                            }
                        }
                        return null;
                    }
                    return null;
                }
                catch (err)
                {
                    console.log("Authorize error:", err);
                }

            }
        }),
    ],
    pages: {
        signIn: '/auth/credentails-sign',
    },
    callbacks: {
        // first time jwt callback is run, user objects is available
        jwt: ({token, user}) => {
            if(user) {
                token.id = user.id
            }
            return token
        },
        session: ({session, token}) => {
            if(token) {
                session.id = token.id
            }
            return session;
        },
    },
    secret: "test",
    jwt: {
      secret: "test",
      encryption: true,
    }
})
