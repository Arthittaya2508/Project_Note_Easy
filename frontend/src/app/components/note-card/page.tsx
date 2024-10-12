import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Link from "next/link";
import Swal from "sweetalert2";

interface NoteCardProps {
  id: number;
  title: string;
  creator: string;
  createdAt: string;
}

const NoteCard: React.FC<NoteCardProps> = ({
  id,
  title,
  creator,
  createdAt,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "หากลบแล้วจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`ลบโน้ตที่มี ID: ${id}`);

        Swal.fire("ลบแล้ว!", "โน้ตของคุณถูกลบเรียบร้อยแล้ว.", "success");
      }
    });
  };

  // วันเวลา
  const formattedDateTime = new Date(createdAt).toLocaleString("th-TH", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div className="border text-gray-700 rounded-lg p-4 shadow-md relative">
      <Link href={`/homepage/note`} className="font-bold cursor-pointer">
        {title || "Untitled"}
      </Link>

      <p>สร้างโดย: {creator}</p>
      <p>วันที่: {formattedDateTime}</p>

      <button
        onClick={handleDropdownToggle}
        className="absolute top-4 right-4"
        aria-label="Toggle dropdown"
      >
        <HiDotsVertical className="w-6 h-6" />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-12 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <Link
                href={`/homepage/note`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                เปิด
              </Link>
            </li>
            <li>
              <button
                onClick={() => console.log(`Add to favorites for note ${id}`)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                เพิ่มรายการที่ชอบ
              </button>
            </li>
            <li>
              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                ลบ
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const mockNotes = [
  {
    id: 1,
    title: "โปรเจค",
    creator: "Arthittaya",
    createdAt: "2024-10-10T12:00:00Z",
    favorite: false,
  },
  {
    id: 2,
    title: "วันจันทร์",
    creator: "Arthittaya",
    createdAt: "2024-10-09T08:30:00Z",
    favorite: true,
  },
  {
    id: 3,
    title: "ฝึกงาน",
    creator: "Arthittaya",
    createdAt: "2024-10-08T14:45:00Z",
    favorite: false,
  },
  {
    id: 4,
    title: "Front End",
    creator: "Arthittaya",
    createdAt: "2024-10-07T10:15:00Z",
    favorite: false,
  },
  {
    id: 5,
    title: "อาทิตยา",
    creator: "Arthittaya",
    createdAt: "2024-10-06T16:00:00Z",
    favorite: true,
  },
  {
    id: 6,
    title: "กรุงเทพ",
    creator: "Arthittaya",
    createdAt: "2024-10-06T16:00:00Z",
    favorite: false,
  },
  {
    id: 7,
    title: "A",
    creator: "Arthittaya",
    createdAt: "2024-10-06T16:00:00Z",
    favorite: false,
  },
  {
    id: 8,
    title: "type",
    creator: "Arthittaya",
    createdAt: "2024-10-06T16:00:00Z",
    favorite: true,
  },
];

export { NoteCard, mockNotes };
