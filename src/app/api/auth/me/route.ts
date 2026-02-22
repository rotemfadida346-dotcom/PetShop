import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Mock user data for now - will be replaced with real auth
    const userData = {
      id: "user-123",
      email: "rotemfadida346@gmail.com",
      name: "Rotem",
      avatar: null,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Auth verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
