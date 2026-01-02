"use client";

import BirthdayPicker from "@/components/birthday/Birthday";
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function EditUser({ user }) {
  const [form, setForm] = useState({
    name: user.name,
    family: user.family,
    gender: user.gender,
    father: user.father,
    codeMeli: user.codeMeli,
    birthDay: user.birthDay,
    phone: user.phone,
    married: user.married,
    childs: user.childs,
    sallary: user.sallary,
    yarane: user.yarane,
  });

  const router = useRouter();

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      if (!user._id) {
        toast.error("شناسه کاربر نامعتبر است");
        return;
      }

      const res = await fetch(`/api/user/${user._id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 مهم
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("تغییرات با موفقیت انجام شد ✅");
      router.replace(`/user/${data.user._id}`);
    } catch (error) {
      console.error(error);
      toast.error("خطا در ارتباط با سرور ❌");
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-300 m-auto">
        <h1 className="text-3xl text-white text-center mt-10">
          تغییرات اطلاعات کاربری
        </h1>
        <form className="w-full flex flex-col gap-3 mt-10 justify-start items-center">
          <input
            className="w-full bg-white focus:outline-none rounded-4xl h-12.5 text-center"
            type="text"
            placeholder="نام"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full bg-white focus:outline-none rounded-4xl h-12.5 text-center"
            type="text"
            placeholder="نام خانوادگی"
            value={form.family}
            onChange={(e) => setForm({ ...form, family: e.target.value })}
          />
          <select
            className="w-full text-center focus:outline-none cursor-pointer border border-gray-400 rounded-4xl h-12.5 p-3 text-white"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="" hidden disabled>
              جنسیت
            </option>
            <option className="text-gray-700 bg-green-100" value="men">
              مرد
            </option>
            <option className="text-gray-700 bg-green-100" value="women">
              زن
            </option>
          </select>
          <input
            className="w-full bg-white focus:outline-none rounded-4xl h-12.5 text-center"
            type="text"
            placeholder="نام پدر"
            value={form.father}
            onChange={(e) => setForm({ ...form, father: e.target.value })}
          />
          <input
            className="w-full bg-white focus:outline-none rounded-4xl h-12.5 text-center"
            type="text"
            placeholder="کد ملی"
            value={form.codeMeli}
            disabled
          />

          <BirthdayPicker
            value={form.birthDay}
            onChange={(date) =>
              setForm({
                ...form,
                birthDay: date ? date.format("YYYY/MM/DD") : "",
              })
            }
          />

          <input
            className="w-full bg-white focus:outline-none rounded-4xl h-12.5 text-center"
            type="text"
            placeholder="شماره تلفن"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <select
            className="w-full text-center focus:outline-none cursor-pointer border border-gray-400 rounded-4xl h-12.5 p-3 text-white"
            value={form.married}
            onChange={(e) => setForm({ ...form, married: e.target.value })}
          >
            <option value="" hidden disabled>
              وضعیت تاهل
            </option>
            <option className="text-gray-700 bg-green-100" value="married">
              متاهل
            </option>
            <option className="text-gray-700 bg-green-100" value="alone">
              مجرد
            </option>
          </select>
          <input
            className="w-full bg-white focus:outline-none rounded-4xl h-12.5 text-center"
            type="number"
            placeholder="تعداد فرزند"
            value={form.childs}
            onChange={(e) => setForm({ ...form, childs: e.target.value })}
          />
          <select
            className="w-full text-center focus:outline-none cursor-pointer border border-gray-400 rounded-4xl h-12.5 p-3 text-white"
            value={form.sallary}
            onChange={(e) => setForm({ ...form, sallary: e.target.value })}
          >
            <option value="" hidden disabled>
              حقوق دریافتی
            </option>
            <option className="text-gray-700 bg-green-100" value="10">
              {Number("10").toLocaleString("fa-IR")} میلیون تومان
            </option>
            <option className="text-gray-700 bg-green-100" value="15">
              {Number("15").toLocaleString("fa-IR")} میلیون تومان
            </option>
            <option className="text-gray-700 bg-green-100" value="18">
              {Number("18").toLocaleString("fa-IR")} میلیون تومان
            </option>
            <option className="text-gray-700 bg-green-100" value="20">
              {Number("20").toLocaleString("fa-IR")} میلیون تومان
            </option>
            <option className="text-gray-700 bg-green-100" value="25">
              {Number("25").toLocaleString("fa-IR")} میلیون تومان
            </option>
            <option className="text-gray-700 bg-green-100" value="30">
              {Number("30").toLocaleString("fa-IR")} میلیون تومان
            </option>
            <option className="text-gray-700 bg-green-100" value="40">
              بیشتز از {Number("30").toLocaleString("fa-IR")} میلیون تومان
            </option>
          </select>

          <button
            onClick={formHandler}
            className="mb-3 cursor-pointer mt-7.5 text-black font-bold bg-sky-50 rounded-4xl w-75 h-12.5"
          >
            ثبت
          </button>
        </form>
      </div>
    </>
  );
}
