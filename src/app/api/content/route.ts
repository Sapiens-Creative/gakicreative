import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

const filePath = path.join(process.cwd(), "src/data/content.json");

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("gaki_admin_session");
  return session?.value === "authenticated";
}

export async function GET() {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return Response.json(JSON.parse(raw));
  } catch {
    return Response.json({ error: "Failed to read content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to save content" }, { status: 500 });
  }
}
