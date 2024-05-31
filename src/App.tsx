import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Layout from "./Layout";
import NotePage from "./NotePage";
import Note from "./Note";

const fetchDataFromFastAPI = async () => {
  try {
    const response = await fetch("/api/endpoint");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="main-wrapper flex justify-center p-4">
        <div className="main">
          <Routes>
            <Route path="/" element={<NotePage></NotePage>} />
            <Route path="/note/:name" element={<Note />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
