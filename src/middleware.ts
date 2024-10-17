import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function mainMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;
}

// Halaman yang butuh autentikasi
const requireAuthPages = ["/dashboard"];
// Halaman yang hanya bisa diakses jika belum login
const guestOnlyPages = ["/auth/login", "/auth/register", "/auth/forgot"];

export default withAuth(mainMiddleware, requireAuthPages, guestOnlyPages);
