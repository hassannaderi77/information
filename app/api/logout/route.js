import { NextResponse } from "next/server";

export async function POST() {
  try {
    // حذف کوکی با استفاده از NextResponse
    const response = NextResponse.json({ message: "خروج موفقیت‌آمیز بود" });

    // حذف کوکی با maxAge=0
    response.cookies.set({
      name: "token",
      value: "",
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    return NextResponse.json({ message: "خطا در خروج" }, { status: 500 });
  }
}