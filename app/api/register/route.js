// app/api/register/route.js

import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      family,
      gender,
      father,
      codeMeli,
      birthDay,
      phone,
      married,
      childs,
      sallary,
    } = body;

    // 🔴 بررسی پر بودن همه فیلدها
    if (
      !name ||
      !family ||
      !gender ||
      !father ||
      !codeMeli ||
      !birthDay ||
      !phone ||
      !married ||
      childs === "" ||
      !sallary
    ) {
      return NextResponse.json(
        { message: "لطفاً تمام فیلدها را پر کنید" },
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

    // 🔴 بررسی تکراری بودن کد ملی
    const isExist = await User.findOne({ codeMeli });
    if (isExist) {
      return NextResponse.json(
        { message: "کاربری با این کد ملی قبلاً ثبت شده است" },
        { status: 409 }
      );
    }

    // 🟢 محاسبه یارانه
    const yarane =
      married === "married" || Number(childs) > 0 ? true : false;

    const newUser = await User.create({
      name,
      family,
      gender,
      father,
      codeMeli,
      birthDay,
      phone,
      married,
      childs,
      sallary,
      yarane,
    });

    return NextResponse.json(
      {
        message: "ثبت نام با موفقیت انجام شد",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { message: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}