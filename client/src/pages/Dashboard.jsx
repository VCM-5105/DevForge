import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    problemsCount: 0,
    goalsCount: 0,
    projectsCount: 0,
    notesCount: 0,
  });
  const [recentProblems, setRecentProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [problemsRes, goalsRes, projectsRes, notesRes] = await Promise.all([
          API.get("/problems"),
          API.get("/goals"),
          API.get("/projects"),
          API.get("/notes"),
        ]);

        const problemsData = problemsRes.data.data || [];
        setStats({
          problemsCount: problemsData.length,
          goalsCount: (goalsRes.data.data || []).length,
          projectsCount: (projectsRes.data.data || []).length,
          notesCount: (notesRes.data.data || []).length,
        });

        setRecentProblems(problemsData.slice(0, 5));
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || "Developer"} 👋
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Here is your live developer workspace overview and summary stats.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">Solved Problems</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {loading ? "..." : stats.problemsCount}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">Active Goals</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {loading ? "..." : stats.goalsCount}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">Total Projects</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {loading ? "..." : stats.projectsCount}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">Saved Notes</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {loading ? "..." : stats.notesCount}
            </p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
              Recent Coding Activity
            </h2>
            <span className="text-xs text-gray-400">Live Backend Data</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Topic</th>
                  <th className="px-5 py-3">Platform</th>
                  <th className="px-5 py-3">Difficulty</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-6 text-center text-gray-400">
                      Loading data
                    </td>
                  </tr>
                ) : recentProblems.length > 0 ? (
                  recentProblems.map((problem) => (
                    <tr key={problem._id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-900">
                        {problem.title}
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {problem.topic}
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {problem.platform}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2 py-0.5 text-[11px] font-medium rounded ${getDifficultyBadge(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-700">
                        {problem.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-5 py-6 text-center text-gray-400">
                      No problems added yet. Go to Problems page to add your first solution!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;