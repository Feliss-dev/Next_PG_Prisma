import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { db } from "../lib/db"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { LoginSchema } from "@/shemas"
import { getUserByEmail } from "@/data/user"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if(validatedFields.success){
          const {email, password} = validatedFields.data;

          const user = await getUserByEmail(email);
          if(!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if(passwordMatch){
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              emailVerified: user.emailVerified,
              image: user.image,
            };
          }

          return null;
        }
        return null;
      }
    })
      ],
})