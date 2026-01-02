"use client";

import Link from "next/link";
import { useState } from "react";
import Exit from "../exit/Exit";

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(null);

  const menuItems = [
    {title: "لیست همه افراد ثبت نام شده", href: "/admin/all"},
    {title: "افراد مجرد", href: "/admin/single"},
    {title: "افراد متاهل", href: "/admin/married"},
    {title: "افراد خانوم", href: "/admin/women"},
    {title: "افراد آقا", href: "/admin/men"}
  ];

  return (
    <div className="w-[25%] flex flex-col items-center justify-center gap-y-5 text-white h-175">
      {menuItems.map((item, index) => (
        <Link href={item.href} key={index}>
          <p
            className={`cursor-pointer text-xl hover:text-gray-700 hover:text-shadow-lg transition-colors duration-200 ${
              activeIndex === index ? "text-yellow-400" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {item.title}
          </p>
        </Link>
      ))}
      <div>
        <Exit />
      </div>
    </div>
  );
}