import { FcBusinessman } from "react-icons/fc";
import { FcBusinesswoman } from "react-icons/fc";

export default function TableUsers({user}) {

  return (
    <>
    <div className="flex flex-col hover:bg-gray-700 hover:shadow-lg transition-colors duration-200 items-center p-6 border rounded-xl text-white cursor-pointer">
      <div>
        {user.gender == "men" ? (
            <FcBusinessman size={80} />
        ) : (
            <FcBusinesswoman size={80} />
        )}
      </div>
      <p>{user.name} <span>{user.family}</span></p> 
      <p>{user.married === "alone" ? "مجرد" : "متاهل"}</p>
      <p>کدملی: {user.codeMeli}</p>
      <p>تاریخ تولد: {user.birthDay}</p>
      <p>نام پدر: {user.father}</p>
      <p>شماره تماس: {user.phone}</p>
      <p>تعداد فرزند: {user.childs}</p>
      <p>حقوق: {user.sallary}</p>
      <p className={`${user.yarane ? "text-green-400" : "text-red-400"}`}>یارانه: {user.yarane ? "فعال" : "غیر فعال"}</p>
    </div>
    </>
  )
}
