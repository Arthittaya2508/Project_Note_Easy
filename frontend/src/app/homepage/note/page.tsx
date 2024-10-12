"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Swal from "sweetalert2";

const NotePage: React.FC = () => {
  const [note, setNote] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    const savedNote = localStorage.getItem("note");
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem("note", note);

    // แสดง SweetAlert เมื่อบันทึก
    Swal.fire({
      icon: "success",
      title: "บันทึกสำเร็จ!",
      text: "โน้ตของคุณได้ถูกบันทึกเรียบร้อยแล้ว.",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#3085d6",
    });
  };

  // Print note
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Note</title>
            <style>
              @page { size: A4; margin: 20mm; }
              body { font-family: Arial, sans-serif; padding: 20px; font-size: ${fontSize}px; }
            </style>
          </head>
          <body>
            <pre>${note}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Download the note as a .txt file
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([note], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "note.txt"; // เปลี่ยมนามสกุลได้
    document.body.appendChild(element);
    element.click();
  };

  // // Apply bold formatting to selected text
  // const handleBold = () => {
  //   const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
  //   const start = textarea.selectionStart;
  //   const end = textarea.selectionEnd;

  //   if (start !== end) {
  //     const selectedText = note.slice(start, end);
  //     const updatedText =
  //       note.slice(0, start) + `**${selectedText}**` + note.slice(end);
  //     setNote(updatedText);
  //     textarea.focus();
  //     textarea.setSelectionRange(start, end + 4);
  //   } else {
  //     setNote(note + "**bold text here**");
  //   }
  // };

  // // Apply italic formatting to selected text
  // const handleItalic = () => {
  //   const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
  //   const start = textarea.selectionStart;
  //   const end = textarea.selectionEnd;

  //   if (start !== end) {
  //     const selectedText = note.slice(start, end);
  //     const updatedText =
  //       note.slice(0, start) + `*${selectedText}*` + note.slice(end);
  //     setNote(updatedText);
  //     textarea.focus();
  //     textarea.setSelectionRange(start, end + 2); // Move cursor after the inserted text
  //   } else {
  //     setNote(note + "*italic text here*");
  //   }
  // };

  // เพิ่มขนาดตัวหนังสือ
  const handleIncreaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  // ลดขนาดตัวหนังสือ
  const handleDecreaseFontSize = () => {
    setFontSize((prevSize) => (prevSize > 8 ? prevSize - 2 : prevSize));
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-100 p-3 mb-5 flex justify-between items-center border border-gray-300 rounded-md">
        <div className="flex space-x-4">
          <h1 className="text-xl font-bold text-black">Note Actions</h1>
          {/* <button
            onClick={handleBold}
            className="px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-500"
          >
            Bold
          </button>
          <button
            onClick={handleItalic}
            className="px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-500"
          >
            Italic
          </button> */}
          <button
            onClick={handleIncreaseFontSize}
            className="px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-500"
          >
            A+
          </button>
          <button
            onClick={handleDecreaseFontSize}
            className="px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-500"
          >
            A-
          </button>
        </div>

        <div className="space-x-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Print
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download
          </button>
        </div>
      </nav>

      <div className="max-w-[250mm] h-[800px] mx-auto p-5 border-gray-300">
        {/*เนื้อหาโน๊ต */}
        <textarea
          value={note}
          onChange={handleChange}
          rows={30}
          style={{ fontSize: `${fontSize}px` }}
          className="w-full h-full p-3 mb-5 border border-gray-300 rounded-md text-black"
          placeholder="Write your note here..."
        />
      </div>
    </div>
  );
};

export default NotePage;
