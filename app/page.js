import Antigravity from "@/components/antigravity/Antigravity";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative text-center w-full h-screen text-xl flex flex-col items-center justify-center gap-y-5">
      <div className="absolute z-10">
        <h1 className="mt-10">
          برای مشاهده و تغییر اطلاعات کاربری خود ابتدا باید ثبت نام کنید.
        </h1>
        <h1>
          برای مشاهده پنل ادمین و قابلیت های پنل ادمین میتوانید از کدملی و شماره
          تلفن زیر استفاده کنید :
        </h1>
        <h1>0021058653 - 09120039763</h1>
        <Link href="/auth/login">
          <button className="bg-sky-50 rounded w-25 mb-3 cursor-pointer">
            شروع کنید
          </button>
        </Link>
        <h1>
          <span>&#128151;</span> Developed By Hassan Naderi
        </h1>
      </div>
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
  );
}
