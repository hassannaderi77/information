import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({}).sort({ createdAt: -1 }); // همه کاربران، مرتب بر اساس تاریخ ثبت

    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    return new Response(JSON.stringify({ error: "خطا در دریافت کاربران" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}