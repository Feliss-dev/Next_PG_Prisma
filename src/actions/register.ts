import { RegisterSchema } from "@/shemas";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Invalid fields", fields: validatedFields.error.errors };
    }

    const {email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser){
        return { error: "Email already in use"};
    }

    await db.user.create({
        data: {
            email,
            name, 
            password: hashedPassword,
        },
    });

    return { success: "User created" };
};