import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { useRouter } from "next/router";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Email & Password",
      type: "credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) throw new Error("Missing fields");

        const dbUser = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (!dbUser || !dbUser.hashedPassword) {
          // throw new Error("No user found with this sign in method");
          throw new Error("Incorret email or password, please try again");
        }
        const passwordsMatch = await compare(credentials.password, dbUser.hashedPassword);

        if (!passwordsMatch) {
          // throw new Error("Incorrect password");
          throw new Error("Incorret email or password, please try again");
        }

        if (dbUser && dbUser.email === credentials.email) {
          return dbUser;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          user: {
            ...user,
          },
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
};
