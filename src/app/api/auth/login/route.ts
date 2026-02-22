import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Mock authentication - will be replaced with real auth
    // For now, any email/password works
    const userData = {
      id: "user-" + Date.now(),
      email: email,
      name: email.split("@")[0],
      avatar: null,
    };

    const token = "mock-token-" + Date.now();

    return NextResponse.json({
      user: userData,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
