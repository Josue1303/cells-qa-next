import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@/libs/db";

const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userFound = await db.users.findUnique({
          where: { email: credentials.email },
        });
        console.log(userFound);
        if (!userFound) {
          throw new Error("No user found");
        }
        const isMatch = await bcrypt.compare(
          credentials.password,
          userFound.password
        );
        if (!isMatch) {
          throw new Error("Invalid password");
        }
        return {
          id: userFound.id,
          email: userFound.email,
          username: userFound.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/Login",
  },
  secret: process.env.SECRET,
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  //   encryption: true,
  // },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.email = user.email;
  //       token.username = user.username;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user.id = token.id;
  //     session.user.email = token.email;
  //     session.user.username = token.username;
  //     return session;
  //   },
  // },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
