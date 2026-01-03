// app/api/login/route.js
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const ADMIN_CODE_MELI = "0021058653";
const ADMIN_PHONE = "09120039763";

export async function POST(req) {
  try {
    const { codeMeli, phone } = await req.json();

    // 🔴 بررسی خالی نبودن
    if (!codeMeli || !phone) {
      return NextResponse.json(
        { message: "لطفاً کد ملی و شماره تلفن را وارد کنید" },
        { status: 400 }
      );
    }

    // 🔴 اعتبارسنجی کد ملی
    if (!/^\d{10}$/.test(codeMeli)) {
      return NextResponse.json(
        { message: "کد ملی باید دقیقاً ۱۰ رقم باشد" },
        { status: 400 }
      );
    }

    // 🔴 اعتبارسنجی شماره تلفن
    if (!/^\d{11}$/.test(phone)) {
      return NextResponse.json(
        { message: "شماره تلفن باید دقیقاً ۱۱ رقم باشد" },
        { status: 400 }
      );
    }

    /* =========================
       🟡 چک ادمین (قبل از DB)
    ========================== */
    if (codeMeli === ADMIN_CODE_MELI && phone === ADMIN_PHONE) {
      const adminToken = jwt.sign(
        {
          role: "admin",
          codeMeli,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const response = NextResponse.json(
        {
          message: "ورود ادمین موفق",
          role: "admin",
        },
        { status: 200 }
      );

      response.cookies.set("token", adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    /* =========================
       🟢 لاگین کاربر عادی
    ========================== */
    await connectDB();

    const user = await User.findOne({ codeMeli, phone });
    if (!user) {
      return NextResponse.json(
        { message: "کاربری با این مشخصات یافت نشد" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      {
        message: "ورود موفق",
        role: "user",
        user: {
          id: user._id.toString(),
          name: user.name,
          family: user.family,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { message: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}