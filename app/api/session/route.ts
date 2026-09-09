import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { mode?: "usuario" | "administrador" };
  const response = NextResponse.json({ ok: true });

  if (body.mode === "administrador") {
    response.cookies.set("fgx_role", "ADMIN_MASTER");
    response.cookies.set("fgx_user_id", "user-admin-master-01");
    response.cookies.set("fgx_user_name", "Filipe Galetto");
    response.cookies.set("fgx_user_email", "admin.master@fgexacta.com");
  } else {
    response.cookies.set("fgx_role", "USER");
    response.cookies.set("fgx_user_id", "user-01");
    response.cookies.set("fgx_user_name", "Rafael Martins");
    response.cookies.set("fgx_user_email", "rafael@fgexacta.com");
  }

  return response;
}
