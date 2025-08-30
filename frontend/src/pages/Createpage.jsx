import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import api from "../lib/axios";
const Createpage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);
    if (!title.trim() || !content.trim()) {
      toast.error("All Field Are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log("Faild Creating Note", error);
      if (error.response?.status === 429) {
        toast.error("Yoy Are Hitting Rate Limit For Now!", {
          duration: 4000,
          icon: "🎈",
        });
      } else {
        toast.error("Failed creating note");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-base-200 ">
        <div className="container mx-auto px-4 py-8 ">
          <div className="max-w-2xl mx-auto ">
            <Link to={"/"} className="btn btn-ghost mb-6 ">
              <ArrowLeftIcon className="size-5 " />
              Back to notes
            </Link>
            <div className="card bg-base-100 ">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4 "> Create New Note</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Note title"
                      className="input input-bordered"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Write Your Note..."
                      className="textarea textarea-bordered h-32"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Note"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createpage;
