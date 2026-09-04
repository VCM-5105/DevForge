import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. useEffect is used for side effects in functional React components.",
  });

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await API.get("/notes");
      setNotes(response.data.data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) return;

    try {
      await API.post("/notes", newNote);
      fetchNotes();
      setNewNote({
        title: "",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. useEffect is used for side effects in functional React components.",
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Developer Notes</h1>
            <p className="text-xs text-gray-500 mt-1">
              Create personal engineering notes, syntax guides, and interview cheatsheets.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            + Create Note
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400 text-xs">
            Loading notes...
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">
                    {note.title}
                  </h3>
                  <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
                    {note.content}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                  <span>
                    {note.createdAt
                      ? new Date(note.createdAt).toLocaleDateString()
                      : "Saved"}
                  </span>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 text-xs">
            No notes created yet. Click "+ Create Note" to write one!
          </div>
        )}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg border border-gray-200">
              <h2 className="text-base font-bold text-gray-900 mb-4">Add Note</h2>
              <form onSubmit={handleAddSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Note Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. React useEffect Side Effects"
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote({ ...newNote, title: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={newNote.content}
                    onChange={(e) =>
                      setNewNote({ ...newNote, content: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3.5 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Notes;