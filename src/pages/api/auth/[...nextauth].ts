import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signInWithGoogle, signIn } from "@/lib/firebase/services";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import jwt from "jsonwebtoken";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password }: any = credentials as {
          email: string;
          password: string;
        };

        const user: any = await signIn({ email });

        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.phone = user.phone;
        token.role = user.role;
        token.id = user.id;
        token.image = user.image;
      } else if (account?.provider === "google") {
        let dbUser: any = null;
        await signInWithGoogle(
          {
            id: user.id,
            fullname: user.name,
            email: user.email,
            image: user.image,
            type: "google",
            balance: 0,
          },
          (result: any) => {
            dbUser = result.data.userData;
          }
        );

        token.id = dbUser.id;
        token.email = dbUser.email;
        token.fullname = dbUser.fullname;
        token.role = dbUser.role;
        token.image = dbUser.image;
        token.phone = dbUser.phone || null; // Tambahkan ini jika perlu
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user.email = token.email;
      session.user.fullname = token.fullname;
      session.user.phone = token.phone;
      session.user.role = token.role;
      session.user.image = token.image;
      session.user.id = token.id;

      session.accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
