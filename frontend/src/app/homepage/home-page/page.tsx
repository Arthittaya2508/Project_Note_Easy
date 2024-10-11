"use client";
import React, { useState } from "react";
import { CiGrid41, CiBoxList, CiTimer, CiStar } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaPlusCircle } from "react-icons/fa";
import { NoteCard, mockNotes } from "@/app/components/note-card/page";

interface Note {
  id: number;
  title: string;
  creator: string;
  createdAt: string; // สอดคล้องกับ prop ที่เราจะใช้ใน NoteCard
  favorite: boolean;
}

const Page: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteName, setNoteName] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [filter, setFilter] = useState<
    "recent" | "favorite" | "name-asc" | "name-desc" | "date-asc" | "date-desc"
  >("recent");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Track dropdown open/close state for each note
  const [dropdownStates, setDropdownStates] = useState<{
    [key: number]: boolean;
  }>({});

  // Handle adding a new note
  const handleAddNote = () => setIsModalOpen(true);

  // Handle creating a new note
  const handleCreateNote = () => {
    if (noteName.trim()) {
      const newNote: Note = {
        id: notes.length + 1, // Simple ID generation
        title: noteName,
        creator: "User", // Update with actual creator
        createdAt: new Date().toISOString(),
        favorite: false, // Set default value for favorite
      };

      // Update notes with the new note
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setIsModalOpen(false);
      setNoteName("");

      // Add dropdown state for the newly created note
      setDropdownStates((prevStates) => ({
        ...prevStates,
        [newNote.id]: false,
      }));
    }
  };

  // Handle deleting a note
  const handleDeleteNote = (noteId: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    setDropdownStates((prevStates) => {
      const newStates = { ...prevStates };
      delete newStates[noteId];
      return newStates;
    });
  };

  // Handle sorting/filtering
  const handleFilterChange = (newFilter: typeof filter) => {
    setFilter(newFilter);
    setIsFilterDropdownOpen(false);

    let sortedNotes = [...notes];

    switch (newFilter) {
      case "recent":
        // Sort from the most recent to the oldest
        sortedNotes.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "favorite":
        // Show only favorite notes
        sortedNotes = sortedNotes.filter((note) => note.favorite);
        break;
      case "name-asc":
        // Sort by name A-Z
        sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        // Sort by name Z-A
        sortedNotes.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        // Sort by the oldest to the most recent
        sortedNotes.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "date-desc":
        // Sort by the most recent to the oldest
        sortedNotes.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        break;
    }

    setNotes(sortedNotes); // Update the notes state with sorted/filtered notes
  };
  // Handle dropdown toggle
  const handleDropdownToggle = (noteId: number) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [noteId]: !prevStates[noteId],
    }));
  };

  // Handle view change (grid/list)
  const handleViewChange = (isGrid: boolean) => {
    setIsGridView(isGrid);
  };

  // Handle keydown for modal close
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <div className="flex flex-col items-center mt-8">
        <div className="flex flex-col items-center">
          <button
            onClick={handleAddNote}
            className="flex mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <FaPlusCircle className="mt-1 mr-2" />
            เพิ่ม
          </button>
        </div>

        <div className="border rounded-lg shadow-md p-6 w-full max-w-6xl">
          {/* Filter and View Options */}
          <div className="flex justify-between w-full mt-4">
            {/* Filter Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => handleFilterChange("recent")}
                className={`px-4 py-2 rounded flex  hover:bg-willow-grove-500 ${
                  filter === "recent"
                    ? "bg-nandor-700 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <CiTimer className="w-5 h-5 mt-0.5 font-bold mr-1" />
                ล่าสุด
              </button>
              <button
                onClick={() => handleFilterChange("favorite")}
                className={`px-4 py-2 rounded flex  hover:bg-willow-grove-500 ${
                  filter === "favorite"
                    ? "bg-nandor-700 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <CiStar className="w-5 h-5 mt-0.5 font-bold mr-1" />
                ชื่นชอบ
              </button>
            </div>

            {/* View and Filter Options */}
            <div className="flex space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
                  className="px-4 py-2 rounded bg-nandor-700 text-white flex hover:bg-willow-grove-500"
                >
                  ตัวกรองอื่นๆ <RiArrowDropDownLine className="w-7 h-7" />
                </button>

                {isFilterDropdownOpen && (
                  <div
                    id="dropdown"
                    className="absolute right-0 mt-2 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                  >
                    <ul className="py-2 text-sm text-gray-700 ">
                      <li className="hover:bg-brandy-100">
                        <button
                          onClick={() => handleFilterChange("name-asc")}
                          className="block px-4 py-2 "
                        >
                          ชื่อ (ก-ฮ , A-Z)
                        </button>
                      </li>
                      <li className="hover:bg-brandy-100">
                        <button
                          onClick={() => handleFilterChange("name-desc")}
                          className="block px-4 py-2 "
                        >
                          ชื่อ (ฮ-ก , Z-A)
                        </button>
                      </li>
                      <li className="hover:bg-brandy-100">
                        <button
                          onClick={() => handleFilterChange("date-asc")}
                          className="block px-4 py-2 "
                        >
                          วันที่ (เก่าสุด)
                        </button>
                      </li>
                      <li className="hover:bg-brandy-100">
                        <button
                          onClick={() => handleFilterChange("date-desc")}
                          className="block px-4 py-2"
                        >
                          วันที่ (ใหม่สุด)
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => handleViewChange(true)}
                  className={`p-2 rounded  hover:bg-willow-grove-500  ${
                    isGridView
                      ? "bg-nandor-700 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <CiGrid41 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleViewChange(false)}
                  className={`p-2 rounded  hover:bg-willow-grove-500 ${
                    !isGridView
                      ? "bg-nandor-700 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <CiBoxList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Notes Display */}
          <div
            className={`grid ${
              isGridView ? "grid-cols-4" : "grid-cols-1"
            } gap-4 mt-4`}
          >
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                creator={note.creator}
                createdAt={note.createdAt}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-bold mb-4 text-gray-700">
              เพิ่มโน้ตใหม่
            </h2>
            <input
              type="text"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
              className="border rounded-lg p-2 w-full text-gray-700"
              placeholder="ชื่อโน้ต"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 bg-gray-400 px-4 py-2 rounded text-black"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleCreateNote}
                className="bg-nandor-700 text-white px-4 py-2 rounded"
              >
                สร้าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
