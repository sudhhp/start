import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";
const NoteDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const handleDelete = async () => {
    if (!window.confirm("Are You Sure You Want To Delete This Note??")) return;
    setSaving(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note Deleted!");
      navigate("/");
    } catch (error) {
      console.log("Deleting Failed ", error);
      toast.error("Something Went wrong!");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content Are Required!");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note Updated Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Updating Failed!", error);
      toast.error("Updating Failed");
    } finally {
      setSaving(false);
    }
  };
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("fetch failed", error);
        toast.error("failed fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  console.log(note);
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="container mx-auto px-4 py-8 ">
        <div className="max-w-2xl mx-auto ">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              disabled={saving}
              className="btn btn-error btn-outline"
            >
              <TrashIcon className="h-5 w-5" />

              {saving ? "Deleting..." : "Delete Note"}
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
