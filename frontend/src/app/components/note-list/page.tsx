// import React, { useState } from "react";
// import { NoteCard, mockNotes } from "@/app/components/note-card/page"; // Adjust the import path as necessary

// const NoteList: React.FC = () => {
//   const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

//   const handleDropdownToggle = (id: number) => {
//     // If the clicked dropdown is already open, close it; otherwise, open the clicked one
//     setOpenDropdownId(openDropdownId === id ? null : id);
//   };

//   return (
//     <div>
//       {mockNotes.map((note) => (
//         <NoteCard
//           key={note.id}
//           id={note.id}
//           title={note.title}
//           creator={note.creator}
//           createdAt={note.createdAt}
//           isDropdownOpen={openDropdownId === note.id} // Determine if this note's dropdown is open
//           onDropdownToggle={handleDropdownToggle} // Pass the toggle function
//         />
//       ))}
//     </div>
//   );
// };

// export default NoteList;
