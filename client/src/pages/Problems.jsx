import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProblem, setNewProblem] = useState({
    title: "",
    topic: "",
    platform: "LeetCode",
    difficulty: "Easy",
    status: "Solved",
    notes: "",
  });

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await API.get("/problems");
      setProblems(response.data.data || []);
    } catch (error) {
      console.error("Error fetching problems:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(search.toLowerCase()) ||
      problem.topic.toLowerCase().includes(search.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "All" || problem.difficulty === difficultyFilter;

    const matchesStatus =
      statusFilter === "All" || problem.status === statusFilter;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

 
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newProblem.title || !newProblem.topic) return;

    try {
      await API.post("/problems", newProblem);
      fetchProblems(); // refresh list
      setNewProblem({
        title: "",
        topic: "",
        platform: "LeetCode",
        difficulty: "Easy",
        status: "Solved",
        notes: "",
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/problems/${id}`);
      setProblems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-700 bg-green-50 border border-green-200";
      case "Medium":
        return "text-amber-700 bg-amber-50 border border-amber-200";
      case "Hard":
        return "text-red-700 bg-red-50 border border-red-200";
      default:
        return "text-gray-700 bg-gray-50 border border-gray-200";
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Coding Problems</h1>
            <p className="text-xs text-gray-500 mt-1">
              Track your solved DSA and LeetCode problems with topic notes.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            + Add Problem
          </button>
        </div>

       
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <input
            type="text"
            placeholder="Search problems or topics"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-3.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
          />

          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-1/2 md:w-auto px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-1/2 md:w-auto px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="All">All Statuses</option>
              <option value="Solved">Solved</option>
              <option value="Attempted">Attempted</option>
              <option value="To-Do">To-Do</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Topic</th>
                  <th className="px-5 py-3">Platform</th>
                  <th className="px-5 py-3">Difficulty</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-gray-400">
                      Loading problems
                    </td>
                  </tr>
                ) : filteredProblems.length > 0 ? (
                  filteredProblems.map((problem) => (
                    <tr key={problem._id} className="hover:bg-gray-50">
                      <td className="px-5 py-3.5 font-medium text-gray-900">
                        {problem.title}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">{problem.topic}</td>
                      <td className="px-5 py-3.5 text-gray-500">{problem.platform}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-2 py-0.5 text-[11px] font-medium rounded ${getDifficultyBadge(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-medium text-gray-700">
                        {problem.status}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleDelete(problem._id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-gray-400">
                      No problems found.
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
              <h2 className="text-base font-bold text-gray-900 mb-4">Add Problem</h2>
              <form onSubmit={handleAddSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Two Sum"
                    value={newProblem.title}
                    onChange={(e) =>
                      setNewProblem({ ...newProblem, title: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Array, Hash Map"
                    value={newProblem.topic}
                    onChange={(e) =>
                      setNewProblem({ ...newProblem, topic: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={newProblem.difficulty}
                      onChange={(e) =>
                        setNewProblem({ ...newProblem, difficulty: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={newProblem.status}
                      onChange={(e) =>
                        setNewProblem({ ...newProblem, status: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="Solved">Solved</option>
                      <option value="Attempted">Attempted</option>
                      <option value="To-Do">To-Do</option>
                    </select>
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
                    Save Problem
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

export default Problems;