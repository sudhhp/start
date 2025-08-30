import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../component/Navbar";
import RateLimitedUI from "../component/RateLimitedUI";
// import axios from "axios";
import api from "../lib/axios";
import NoteCard from "../component/NoteCard";
import NoteNotFound from "../component/NoteNotFound";
import { LoaderIcon } from "react-hot-toast";
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        // const data = await res.json();
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to Load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6 ">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-base-200/80 z-50">
            <LoaderIcon className="animate-spin w-24 h-24 text-primary" />
            <span className="ml-3 text-primary text-lg">Loading notes...</span>
          </div>
        )}

        {notes.length === 0 && !isRateLimited && <NoteNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {notes.map((note) => (
              <div key={note._id}>
                {/* {note.title}|{note.content} */}
                <NoteCard note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
