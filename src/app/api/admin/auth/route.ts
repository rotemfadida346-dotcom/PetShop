import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "admin-secret-change-me"
);

// Temporary hardcoded admin credentials (until database is connected)
const TEMP_ADMINS = [
  {
    email: "admin@pawsome.com",
    password: "admin123456",
    name: "Admin",
    role: "ADMIN",
    id: "temp-admin-1",
  },
  {
    email: "rotemfadida346@gmail.com", // Your personal email
    password: "admin123456", // Same password - you can change it
    name: "Rotem Fadida",
    role: "ADMIN",
    id: "temp-admin-2",
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "אימייל וסיסמה נדרשים" }, { status: 400 });
    }

    // Try database first (if connected)
    let user = null;
    try {
      user = await prisma.user.findUnique({ where: { email } });
      if (user && user.hashedPassword && user.role === "ADMIN") {
        const valid = await bcrypt.compare(password, user.hashedPassword);
        if (!valid) {
          return NextResponse.json({ error: "פרטי התחברות שגויים" }, { status: 401 });
        }
      }
    } catch {
      // Database not connected - use temp credentials
      console.log("Database not available, using temp credentials");
    }

    // If no database user found, check temp credentials
    if (!user) {
      const tempAdmin = TEMP_ADMINS.find(admin => admin.email === email && admin.password === password);
      if (!tempAdmin) {
        return NextResponse.json({ error: "פרטי התחברות שגויים" }, { status: 401 });
      }
      // Use temp admin
      user = tempAdmin;
    }

    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });

    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-token", "", { maxAge: 0, path: "/" });
  return response;
}
