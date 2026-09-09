import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AdminRole, AdminSession } from "@/lib/platform-types";

const rolePermissions: Record<AdminRole, string[]> = {
  ADMIN_MASTER: ["manage:all", "publish:all", "users:all", "audit:read"],
  ADMIN: ["manage:content", "publish:content", "users:read", "audit:read"],
  EDITOR: ["manage:draft", "publish:request"],
  USER: []
};

export async function getAdminSession(): Promise<AdminSession> {
  const cookieStore = await cookies();
  const role = (cookieStore.get("fgx_role")?.value as AdminRole | undefined) ?? "USER";
  const userId = cookieStore.get("fgx_user_id")?.value ?? "guest-user";
  const fullName = cookieStore.get("fgx_user_name")?.value ?? "Convidado";
  const email = cookieStore.get("fgx_user_email")?.value ?? "guest@fgexacta.com";

  return {
    userId,
    fullName,
    email,
    role
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!["ADMIN_MASTER", "ADMIN", "EDITOR"].includes(session.role)) {
    redirect("/login");
  }

  return session;
}

export function hasPermission(role: AdminRole, permission: string) {
  const permissions = rolePermissions[role] ?? [];
  return permissions.includes("manage:all") || permissions.includes(permission);
}

export async function requirePermission(permission: string) {
  const session = await requireAdminSession();

  if (!hasPermission(session.role, permission)) {
    throw new Error("Permissão insuficiente para esta ação.");
  }

  return session;
}
