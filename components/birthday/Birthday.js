"use client";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";

export default function BirthdayPicker({ value, onChange }) {
  return (
    <div className="w-full bg-white rounded-4xl h-12.5 text-center p-3">
      <DatePicker
        value={value}
        onChange={onChange}
        calendar={persian}
        locale={persian_fa}
        placeholder="تاریخ تولد"
        animations={[transition()]}
        inputClass="text-center focus:outline-none w-full"
      />
    </div>
  );
}
