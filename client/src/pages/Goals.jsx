import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: 100,
    current: 0,
    deadline: "",
    status: "In Progress",
  });

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await API.get("/goals");
      setGoals(response.data.data || []);
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.target) return;

    try {
      await API.post("/goals", newGoal);
      fetchGoals();
      setNewGoal({
        title: "",
        target: 100,
        current: 0,
        deadline: "",
        status: "In Progress",
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/goals/${id}`);
      setGoals((prev) => prev.filter((g) => g._id !== id));
    } catch (error) {
      console.error("Error deleting goal:", error);
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
            <h1 className="text-2xl font-bold text-gray-900">Developer Goals</h1>
            <p className="text-xs text-gray-500 mt-1">
              Set learning targets and track your progress milestones.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            + Create Goal
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400 text-xs">
            Loading goals...
          </div>
        ) : goals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const progressPct = Math.min(
                100,
                Math.round((goal.current / (goal.target || 1)) * 100)
              );

              return (
                <div
                  key={goal._id}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-sm">{goal.title}</h3>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium">
                        {goal.status}
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>
                          {goal.current} / {goal.target} ({progressPct}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-amber-400 h-full transition-all duration-300"
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                    <span>
                      {goal.deadline
                        ? `Deadline: ${new Date(goal.deadline).toLocaleDateString()}`
                        : "No deadline"}
                    </span>
                    <button
                      onClick={() => handleDelete(goal._id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 text-xs">
            No goals created yet. Click "+ Create Goal" to add one!
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg border border-gray-200">
              <h2 className="text-base font-bold text-gray-900 mb-4">Add Learning Goal</h2>
              <form onSubmit={handleAddSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Complete 150 DSA Problems"
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, title: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Current Count
                    </label>
                    <input
                      type="number"
                      value={newGoal.current}
                      onChange={(e) =>
                        setNewGoal({
                          ...newGoal,
                          current: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Target Target
                    </label>
                    <input
                      type="number"
                      required
                      value={newGoal.target}
                      onChange={(e) =>
                        setNewGoal({
                          ...newGoal,
                          target: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Deadline Date
                  </label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, deadline: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
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
                    Save Goal
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

export default Goals;