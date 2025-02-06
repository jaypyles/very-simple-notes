import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import { NoteList, SingleNote } from "./Pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/note/:_id" element={<SingleNote />} />
      </Routes>
    </BrowserRouter>
  );
}
