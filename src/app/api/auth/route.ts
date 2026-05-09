import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { action, password } = await request.json();

    if (action === "login") {
      const adminPass = process.env.ADMIN_PASSWORD;
      
      if (!adminPass) {
        return NextResponse.json({ error: "ADMIN_PASSWORD not set" }, { status: 500 });
      }

      if (password === adminPass) {
        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("gaki_admin_session", "authenticated", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
      }
    } 
    
    if (action === "logout") {
      const cookieStore = await cookies();
      cookieStore.delete("gaki_admin_session");
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("gaki_admin_session");
  return NextResponse.json({ isAuthenticated: session?.value === "authenticated" });
}
