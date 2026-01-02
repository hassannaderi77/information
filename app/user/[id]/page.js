import Exit from "@/components/exit/Exit";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FcBusinessman } from "react-icons/fc";
import { FcBusinesswoman } from "react-icons/fc";
import { cookies } from "next/headers";

async function getUser(id) {
  const cookieStore = await cookies(); // ❌ await نداشته باشد
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`http://localhost:3000/api/user/${id}`, {
    cache: "no-store",
    credentials: "include"
  });

  console.log(" api token:", token );
  console.log(" param id:", id );

  if (!res.ok) return null;

  const data = await res.json();
  return data.user;
}

export default async function User({ params: paramsPromise }) {

  const params = await paramsPromise;
  const {id} = params;
  const user = await getUser(id);

  if (!user) notFound();

  

  return (
    <div className="flex flex-col items-center justify-center max-w-300 h-screen m-auto">
      <div className="flex w-full border-2 rounded-xl border-stone-100">
        <div>
          {user.gender === "men" ? (
            <FcBusinessman size={300} />
          ) : (
            <FcBusinesswoman size={300} />
          )}
        </div>
        <div className="w-[70%] text-stone-100 flex flex-col items-center justify-center gap-y-3.5">
          <div className="flex w-[30%] items-center justify-around">
            <h1 className="text-xl font-bold">نام :</h1>
            <p>{user.name}</p>
          </div>
          <div className="flex w-[30%] items-center justify-around">
            <h1 className="text-xl font-bold">نام خانوادگی:</h1>
            <p>{user.family}</p>
          </div>
          <div className="flex w-[30%] items-center justify-around">
            <h1 className="text-xl font-bold">کد ملی :</h1>
            <p>{user.codeMeli}</p>
          </div>
          <div className="flex w-[30%] items-center justify-around">
            <h1 className="text-xl font-bold">تاریخ تولد :</h1>
            <p>{user.birthDay}</p>
          </div>
          <div className="flex w-[30%] items-center justify-around">
            <h1 className="text-xl font-bold">تاریخ ثبت نام :</h1>
            <p>{new Date(user.createdAt).toLocaleDateString("fa-IR")}</p>
          </div>
          <div className="flex w-[30%] items-center justify-around">
            <h1 className="text-xl font-bold">تاریخ آخرین آپدیت :</h1>
            <p>{new Date(user.updatedAt).toLocaleDateString("fa-IR")}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-full border-2 rounded-xl  border-stone-100 mt-5 text-stone-100 p-3">
        <div className="flex w-[50%] items-center gap-2">
          <h1 className="text-xl font-bold">نام پدر :</h1>
          <p>{user.father}</p>
        </div>
        <div className="flex w-[50%] items-center gap-2">
          <h1 className="text-xl font-bold"> شماره تلفن :</h1>
          <p>{user.phone}</p>
        </div>
        <div className="flex w-[50%] items-center gap-2">
          <h1 className="text-xl font-bold">وضعیت تاهل :</h1>
          <p>{user.married === "married" ? "متاهل" : "مجرد"}</p>
        </div>
        <div className="flex w-[50%] items-center gap-2">
          <h1 className="text-xl font-bold"> تعداد فرزند :</h1>
          <p>{user.childs.toLocaleString("fa-IR")}</p>
        </div>
        <div className="flex w-[50%] items-center gap-2">
          <h1 className="text-xl font-bold"> حقوق دریافتی :</h1>
          <p>{Number(user.sallary).toLocaleString("fa-IR")} میلیون تومان</p>
        </div>
        <div className="flex w-[50%] items-center gap-2">
          <h1 className="text-xl font-bold">وضعیت یارانه :</h1>
          <p>{user.yarane ? "شامل یارانه میشوید" : "شامل یارانه نمیشوید"}</p>
        </div>
      </div>
      <Link href={`/user/${id}/edit`}>
        <button id={id} className="mb-3 cursor-pointer mt-7.5 text-black font-bold bg-sky-50 rounded-4xl w-75 h-12.5">
          اعمال تغییرات
        </button>
      </Link>
     
      <Exit />
      
    </div>
  );
}


