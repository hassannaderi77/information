// app/api/user/[id]/edit/route.js
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function PUT(req, context) {
  try {
    await connectDB();

    // ⚡ نکته کلیدی: unwrap کردن params
    const params = await context.params; // حتما await بزن
    const userId = params.id;
    console.log("userId:", userId);

    const body = await req.json();

    // شماره تلفن باید 11 رقمی باشد
    if (!/^\d{11}$/.test(body.phone)) {
      return NextResponse.json(
        { message: "شماره تلفن باید 11 رقمی باشد" },
        { status: 400 }
      );
    }

    // یارانه خودکار
    if (body.married === "alone" || Number(body.childs) === 0) {
      body.yarane = false;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: body.name,
        family: body.family,
        gender: body.gender,
        father: body.father,
        phone: body.phone,
        married: body.married,
        childs: body.childs,
        sallary: body.sallary,
        yarane: body.yarane,
      },
      { new: true }
    ).select("-__v");

    if (!updatedUser) {
      return NextResponse.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("PUT USER ERROR:", error);
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}