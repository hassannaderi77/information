import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    await connectDB();

    const params = await context.params; // <-- await اضافه شد
    const userId = params.id;

    const user = await User.findById(userId).select("-__v");

    if (!user) {
      return NextResponse.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("GET USER ERROR:", error);
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}
