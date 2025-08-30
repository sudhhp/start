import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Createpage from "./pages/Createpage";
import NoteDetailPage from "./pages/NoteDetailPage";
const App = () => {
  return (
    <div data-theme="valentine">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
