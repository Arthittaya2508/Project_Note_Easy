"use client";
import { useEffect, useState, useMemo } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface EditHistory {
  id: number;
  noteId: number;
  editedAt: string;
  editedContent: string;
}

const EditHistoryPage = () => {
  const [editHistory, setEditHistory] = useState<EditHistory[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  // Mock up ข้อมูลวันที่
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
    {
      id: 5,
      noteId: 1,
      editedAt: "2024-10-11T10:00:00Z",
      editedContent: "เพิ่มบันทึกใหม่",
    },
    {
      id: 6,
      noteId: 1,
      editedAt: "2024-10-12T11:00:00Z",
      editedContent: "แก้ไขบันทึกเก่า",
    },
    {
      id: 7,
      noteId: 1,
      editedAt: "2024-10-11T10:00:00Z",
      editedContent: "เพิ่มบันทึกใหม่",
    },
    {
      id: 8,
      noteId: 1,
      editedAt: "2024-10-12T11:00:00Z",
      editedContent: "แก้ไขบันทึกเก่า",
    },
  ];

  useEffect(() => {
    setEditHistory(mockEditHistory);
  }, []);

  const totalPages = Math.ceil(editHistory.length / rowsPerPage);
  const paginatedEditHistory = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return editHistory.slice(start, end);
  }, [page, editHistory]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4 text-black">
        ประวัติการแก้ไขโน้ต
      </h1>
      <table className="min-w-full border-collapse border border-gray-200 text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">หมายเลข</th>
            <th className="border border-gray-200 px-4 py-2">วันที่แก้ไข</th>
            <th className="border border-gray-200 px-4 py-2">เนื้อหาแก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEditHistory.map((history) => (
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

      {/* Pagination */}
      <div className="justify-center mt-4">
        <div className="flex justify-center">
          <span className="mx-2 text-black">
            Page {page} of {totalPages}
          </span>
        </div>
        <div className="flex w-full justify-center mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="mx-1 px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          >
            <FaAngleLeft />
          </button>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="mx-1 px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHistoryPage;
