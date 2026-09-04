import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    type: "Documentation",
    url: "",
    category: "React",
  });

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await API.get("/resources");
      setResources(response.data.data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newResource.title || !newResource.url) return;

    try {
      await API.post("/resources", newResource);
      fetchResources();
      setNewResource({
        title: "",
        type: "Documentation",
        url: "",
        category: "React",
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/resources/${id}`);
      setResources((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error deleting resource:", error);
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
            <h1 className="text-2xl font-bold text-gray-900">Saved Resources</h1>
            <p className="text-xs text-gray-500 mt-1">
              Bookmark useful tutorials, official documentations, and engineering blogs.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            + Add Bookmark
          </button>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Link</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-gray-400">
                      Loading resources
                    </td>
                  </tr>
                ) : resources.length > 0 ? (
                  resources.map((res) => (
                    <tr key={res._id} className="hover:bg-gray-50">
                      <td className="px-5 py-3.5 font-medium text-gray-900">
                        {res.title}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">{res.category}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 text-[11px] bg-purple-50 text-purple-700 rounded font-medium">
                          {res.type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-600 hover:underline font-medium"
                        >
                          Visit Link
                        </a>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleDelete(res._id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-gray-400">
                      No resources saved yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg border border-gray-200">
              <h2 className="text-base font-bold text-gray-900 mb-4">Add Resource</h2>
              <form onSubmit={handleAddSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Resource Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. React Official Docs"
                    value={newResource.title}
                    onChange={(e) =>
                      setNewResource({ ...newResource, title: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    URL Link
                  </label>
                  <input
                    type="url"
                    required
                    placeholder=""
                    value={newResource.url}
                    onChange={(e) =>
                      setNewResource({ ...newResource, url: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={newResource.type}
                      onChange={(e) =>
                        setNewResource({ ...newResource, type: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="Documentation">Documentation</option>
                      <option value="Article">Article</option>
                      <option value="Video">Video</option>
                      <option value="Course">Course</option>
                      <option value="Tool">Tool</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. React, Node, CSS"
                      value={newResource.category}
                      onChange={(e) =>
                        setNewResource({ ...newResource, category: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
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
                    Save Resource
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

export default Resources;