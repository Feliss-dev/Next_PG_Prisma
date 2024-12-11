import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/shemas";
import { z } from "zod";

export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null,
) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Invalid fields", fields: validatedFields.error.errors };
    }

    const {email, password, code} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.password || !existingUser.email){
        return { error: "Invalid email or password" };
    }

    
}