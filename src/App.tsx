import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import { NoteList, SingleNote } from "./Pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/note/:name" element={<SingleNote />} />
      </Routes>
    </BrowserRouter>
  );
}
