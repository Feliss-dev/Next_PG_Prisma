import { db } from "./db";


export async function getUserFromDb(email: string, pwHash: string) {
    const user = await db.user.findUnique({
      where: { email },
    });
  
    if (!user || user.password !== pwHash) {
      return null;
    }
  
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }