import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {

  console.log("MIDDLEWARE TOKEN:", req.cookies.get("token")?.value);
  const token = req.cookies.get("token")?.value;

  // ❌ توکن نیست
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    // 🔐 محافظت از /user/:id
    if (req.nextUrl.pathname.startsWith("/user")) {
      const id = req.nextUrl.pathname.split("/")[2];

      if (String(payload.userId) !== String(id)) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/user/:path*", '/admin/:path*'],
};
