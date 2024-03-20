import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "./lib/db";

import bcrypt from "bcryptjs";

export default {
    providers: [
    Credentials({
    // The name to display on the sign in form (e.g. "Sign in with...")
    async authorize(credentials) {
      // Add logic here to look up the user from the credentials supplied
      const user = await db.user.findUnique({
        where: { email: credentials.email as string}
      })
      if(user && user?.password){
        const passHash = await bcrypt.compare(credentials.password as string, user.password)
        if(passHash) return user
      }

      //if(credentials.email == user.email && credentials.password == user.password) return { email: user.email}
      
      return null
    }
  }),
    Google
  ],
} satisfies NextAuthConfig