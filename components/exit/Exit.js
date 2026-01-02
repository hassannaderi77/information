"use client";

import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Exit() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "خطا در خروج");
        return;
      }

      // پاک کردن کوکی‌های سمت کلاینت در صورت نیاز
      document.cookie = "token=; path=/; max-age=0";

      toast.success("خروج با موفقیت انجام شد ✅");
      router.push("/auth/login"); // هدایت به صفحه لاگین
    } catch (err) {
      console.error(err);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  return (
    <>
      <Toaster />
      <button
        onClick={handleLogout}
        className="mb-3 cursor-pointer mt-7.5 text-black font-bold bg-sky-50 rounded-4xl w-75 h-12.5"
      >
        خروج
      </button>
    </>
  );
}