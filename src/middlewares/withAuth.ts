import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
  guestOnly: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Cek apakah halaman tersebut butuh autentikasi
    if (requireAuth.includes(pathname)) {
      if (!token) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
      return middleware(req, next);
    }

    // Cek apakah halaman ini hanya untuk guest (belum login)
    if (guestOnly.includes(pathname) && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect ke dashboard jika sudah login
    }

    return middleware(req, next);
  };
}
