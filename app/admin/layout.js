import Navbar from "@/components/navbar/Navbar";

export default function layout({ children }) {

  return (
    <div className=" max-w-350 m-auto flex gap-x-5 items-center justify-between h-screen">
      <Navbar />
      <div className="w-[75%]">
        {children}
        </div>
    </div>
  );
}
