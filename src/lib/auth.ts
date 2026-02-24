import { cookies } from "next/headers";

// In-memory token store (would be a database in production)
const tokens = new Map<string, { email: string; expires: number }>();

export function generateToken(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 64; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

export function storeToken(token: string, email: string): void {
  tokens.set(token, { email, expires: Date.now() + 1000 * 60 * 30 }); // 30 min
}

export function validateToken(token: string): string | null {
  const entry = tokens.get(token);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    tokens.delete(token);
    return null;
  }
  tokens.delete(token); // one-time use
  return entry.email;
}

export async function getAuthEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("gw_auth")?.value ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  const email = await getAuthEmail();
  return email !== null && email.length > 0;
}
