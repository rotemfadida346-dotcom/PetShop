import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "admin-secret-change-me"
);

export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin-token")?.value;

    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (payload.role !== "ADMIN") return null;

    return {
      id: payload.id as string,
      email: payload.email as string,
      name: (payload.name as string) || null,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}
