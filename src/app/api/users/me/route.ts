
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  const user = { id: "1", name: "Fake User", email: "user@example.com" };

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  if (token !== "DUMMY_TOKEN_VALID") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(user);
}

