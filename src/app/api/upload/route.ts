import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("gaki_admin_session");
  return session?.value === "authenticated";
}

export async function POST(request: Request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const ext = path.extname(file.name).toLowerCase();
    const allowed = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp", ".avif"];
    if (!allowed.includes(ext)) {
      return Response.json(
        { error: "File type not allowed" },
        { status: 400 }
      );
    }

    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure uploads dir exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, buffer);

    return Response.json({ url: `/uploads/${filename}` });
  } catch {
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
