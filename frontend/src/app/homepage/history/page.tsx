"use client";
import { useEffect, useState } from "react";

interface EditHistory {
  id: number;
  noteId: number;
  editedAt: string;
  editedContent: string;
}

const EditHistoryPage = () => {
  const [editHistory, setEditHistory] = useState<EditHistory[]>([]);
  const noteId = 1; // สมมุติว่าเราต้องการประวัติการแก้ไขของโน้ตนี้

  // ข้อมูล Mockup สำหรับประวัติการแก้ไขโน้ต
  const mockEditHistory: EditHistory[] = [
    {
      id: 1,
      noteId: 1,
      editedAt: "2024-10-10T14:00:00Z",
      editedContent: "แก้ไขหัวข้อโปรเจค",
    },
    {
      id: 2,
      noteId: 1,
      editedAt: "2024-10-10T15:00:00Z",
      editedContent: "เพิ่มรายละเอียดโปรเจค",
    },
    {
      id: 3,
      noteId: 2,
      editedAt: "2024-10-09T09:00:00Z",
      editedContent: "แก้ไขวันที่สำคัญ",
    },
    {
      id: 4,
      noteId: 3,
      editedAt: "2024-10-08T15:00:00Z",
      editedContent: "เพิ่มงานฝึกงานใหม่",
    },
  ];

  useEffect(() => {
    // ตั้งค่า editHistory จาก mock data
    setEditHistory(mockEditHistory);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4 text-black">
        ประวัติการแก้ไขโน้ต
      </h1>
      <table className="min-w-full border-collapse border border-gray-200 text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left">
              หมายเลข
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              วันที่แก้ไข
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              เนื้อหาแก้ไข
            </th>
          </tr>
        </thead>
        <tbody>
          {editHistory.map((history) => (
            <tr key={history.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{history.id}</td>
              <td className="border border-gray-200 px-4 py-2">
                {new Date(history.editedAt).toLocaleString()}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {history.editedContent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditHistoryPage;
