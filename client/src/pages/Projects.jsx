import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    techStack: "React, Express, MongoDB",
    status: "In Progress",
    github: "",
    liveUrl: "",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Developer project built with modern web technologies.",
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await API.get("/projects");
      setProjects(response.data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newProject.title) return;

    try {
      await API.post("/projects", newProject);
      fetchProjects();
      setNewProject({
        title: "",
        techStack: "React, Express, MongoDB",
        status: "In Progress",
        github: "",
        liveUrl: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Developer project built with modern web technologies.",
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
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
            <h1 className="text-2xl font-bold text-gray-900">Projects Showcase</h1>
            <p className="text-xs text-gray-500 mt-1">
              Maintain your personal software engineering projects and repositories.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            + Add Project
          </button>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-400 text-xs">
            Loading projects...
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-base">
                      {project.title}
                    </h3>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                      {project.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 my-3 leading-relaxed">
                    {project.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(project.techStack || []).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-600 hover:text-black font-medium"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-600 hover:text-amber-800 font-medium"
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(project._id)}
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
            No projects added yet. Click "+ Add Project" to feature your work!
          </div>
        )}

        {/* Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg border border-gray-200">
              <h2 className="text-base font-bold text-gray-900 mb-4">Add Project</h2>
              <form onSubmit={handleAddSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DevForge Workspace App"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="React, Node, Express, MongoDB"
                    value={newProject.techStack}
                    onChange={(e) =>
                      setNewProject({ ...newProject, techStack: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={newProject.github}
                      onChange={(e) =>
                        setNewProject({ ...newProject, github: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Live URL
                    </label>
                    <input
                      type="url"
                      placeholder=""
                      value={newProject.liveUrl}
                      onChange={(e) =>
                        setNewProject({ ...newProject, liveUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({ ...newProject, description: e.target.value })
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
                    Save Project
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

export default Projects;