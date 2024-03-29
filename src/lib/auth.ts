import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { Session, type NextAuthOptions } from "next-auth";

import { db } from "@/lib/db";
import { remember } from "@epic-web/remember";

import Discord from "next-auth/providers/discord";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";
import { getSession } from "./user";

export const authConfig: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      const user = await db.user.findUnique({
        where: { email: token.email ?? "" },
      });

      if (!user) return token;

      token.id = user.id;
      token.redirectToTutorial = !user.isTutorialFinished;
      token.name = user.name;
      token.picture = user.image;

      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          image: token.picture,
          redirectToTutorial: token.redirectToTutorial,
        },
      };
    },
  },
};

export const auth = remember("auth", () => NextAuth(authConfig));

export function withAuth(handler: (session: Session) => Promise<NextResponse>) {
  return async () => {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return handler(session);
  };
}
