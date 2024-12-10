import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { db } from "../lib/db"
import Credentials from "next-auth/providers/credentials"
import { verifyPassword } from "./utils/password"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
adapter: PrismaAdapter(db),
  providers: [
   
      ],
})