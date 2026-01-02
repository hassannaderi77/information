"use client"

import Antigravity from "@/components/antigravity/Antigravity";
import { LuUserRound } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {

  const [form, setForm] = useState({ codeMeli: "", phone: "" });
  const router = useRouter();

  // const loginHandler = async (e) => {
  //   e.preventDefault();

  //   const res = await fetch("/api/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include", // خیلی مهم
  //     body: JSON.stringify(form),
  //   });

  //   const data = await res.json();

  //   if (!res.ok) {
  //     toast.error(data.message);
  //     return;
  //   }

  //   toast.success("خوش آمدید");
  //   setUserId(data.user.id);
  //   setSuccess(true);

  //   console.log("login user id:", data.user.id)
  // };

  const loginHandler = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.message);
    return;
  }

  toast.success("خوش آمدید");

  // 🟢 تصمیم بر اساس role
  if (data.role === "admin") {
    router.replace("/admin");
    return;
  }

  if (data.role === "user" && data.user?.id) {
    router.replace(`/user/${data.user.id}`);
  }
};


  return (
    <>
    <Toaster />
    <div className="w-full h-screen relative flex items-center justify-center">
      <form onSubmit={loginHandler} className="absolute z-20 w-87.5 flex flex-col justify-start items-center h-110">
        <h1 className="text-3xl text-white">ورود به اکانت</h1>
        <div className="cursor-pointer flex h-12.5 mt-10 items-center justify-between rounded-4xl w-75 text-black gap-x-2">
          <input
            className="bg-white focus:outline-none opacity-60 rounded-4xl pr-2.5 h-12.5 w-75"
            type="text"
            placeholder="کد ملی"
            value={form.codeMeli}
            onChange={(e) => setForm({...form , codeMeli: e.target.value})}
          />
          <LuUserRound className="transparent" size={30} color="white" />
        </div>
        <p className="mt-5">مثال : 0021058653</p>
        <div className="cursor-pointer flex h-12.5 mt-10 items-center justify-between rounded-4xl w-75 text-black gap-x-2">
          <input
            className="bg-white focus:outline-none opacity-60 rounded-4xl pr-2.5 h-12.5 w-75"
            type="text"
            placeholder="شماره تلفن"
            value={form.phone}
            onChange={(e) => setForm({...form , phone: e.target.value})}
          />
          <FiPhone className="transparent" size={30} color="white" />
        </div>
        <p className="mt-5">مثال : 09120039763</p>
        <button type="submit" className="cursor-pointer mt-7.5 text-black font-bold bg-sky-50 rounded-4xl w-75 h-12.5">
          وارد شوید
        </button>
        <Link href="/auth/register" className="cursor-pointer underline mt-5 font-bold text-white">ثبت نام</Link>
      </form>
      <Antigravity
        count={300}
        magnetRadius={6}
        ringRadius={7}
        waveSpeed={0.4}
        waveAmplitude={1}
        particleSize={1.5}
        lerpSpeed={0.05}
        color={"#92F590"}
        autoAnimate={true}
        particleVariance={1}
      />
    </div>
    </>
  );
}
