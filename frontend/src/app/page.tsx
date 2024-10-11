import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-6   w-full text-center">
        <div className="font-bold text-5xl mb-10 text-gray-700">
          What is Note Easy?
        </div>
        <p className="text-gray-700 text-base mb-4">
          Note Easy เป็นแอปพลิเคชันที่ช่วยให้การจัดการบันทึกง่ายและเป็นระเบียบ
          ฟีเจอร์ที่หลากหลายช่วยให้การจดบันทึกสะดวก
          <br /> และมีประสิทธิภาพ เช่น การสร้างบันทึก การจัดหมวดหมู่
          การแสดงประวัติการแก้ไข และการจัดเรียงบันทึกได้ตามต้องการ
        </p>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            การจัดการบันทึก
          </span>
          <span className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            หมวดหมู่
          </span>
          <span className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            ประวัติการแก้ไข
          </span>
        </div>
      </div>
    </div>
  );
}
