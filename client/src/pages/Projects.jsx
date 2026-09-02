import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'DevForge',
    description: 'All-in-one developer productivity workspace and learning tracker.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    status: 'In Progress',
    progress: 70,
    githubUrl: 'https://github.com/example/devforge',
    liveUrl: 'https://devforge.example.com'
  },
  {
    id: 2,
    title: 'CodeSync',
    description: 'Real-time collaborative code editor with syntax highlighting and chat.',
    techStack: ['React', 'Socket.io', 'Node.js', 'Tailwind'],
    status: 'In Progress',
    progress: 45,
    githubUrl: 'https://github.com/example/codesync',
    liveUrl: ''
  },
  {
    id: 3,
    title: 'AlgoVisualizer',
    description: 'Interactive sorting and pathfinding algorithm visualizer in the browser.',
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
    status: 'Completed',
    progress: 100,
    githubUrl: 'https://github.com/example/algo-visualizer',
    liveUrl: 'https://algoviz.example.com'
  }
]

const Projects = () => {
  // 1. State Management
  const [projects, setProjects] = useState(INITIAL_PROJECTS)
  const [filter, setFilter] = useState('All') // 'All', 'In Progress', 'Completed'
  const [showAddModal, setShowAddModal] = useState(false)

  // 2. Form state for new project
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: '',
    status: 'In Progress',
    progress: 50,
    githubUrl: '',
    liveUrl: ''
  })

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setNewProject((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle adding a new project
  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!newProject.title.trim()) return

    const createdProject = {
      id: Date.now(),
      title: newProject.title,
      description: newProject.description,
      // Convert comma-separated string to an array of tags
      techStack: newProject.techStack
        ? newProject.techStack.split(',').map((item) => item.trim()).filter(Boolean)
        : ['React'],
      status: newProject.status,
      progress: Number(newProject.progress) || 0,
      githubUrl: newProject.githubUrl,
      liveUrl: newProject.liveUrl
    }

    setProjects((prev) => [createdProject, ...prev])
    setNewProject({
      title: '',
      description: '',
      techStack: '',
      status: 'In Progress',
      progress: 50,
      githubUrl: '',
      liveUrl: ''
    })
    setShowAddModal(false)
  }

  // Handle deleting a project
  const handleDelete = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id))
  }

  // Filter pipeline
  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') return true
    return project.status === filter
  })

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your applications, repositories, and build progress.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            + Add Project
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-gray-200 pb-3 mb-6">
          {['All', 'In Progress', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filter === tab
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-200/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => {
              const isCompleted = project.status === 'Completed'

              return (
                <div
                  key={project.id}
                  className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Status & Delete */}
                    <div className="flex justify-between items-center mb-2.5">
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-medium ${
                          isCompleted
                            ? 'bg-green-50 text-green-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {project.status}
                      </span>

                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-xs text-gray-400 hover:text-red-600 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Progress & External Links */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-xs font-medium text-gray-600 mb-1.5">
                      <span>Progress</span>
                      <span className="font-bold text-gray-900">{project.progress}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-4">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isCompleted ? 'bg-green-500' : 'bg-black'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-1">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-gray-900 hover:underline flex items-center gap-1"
                        >
                          GitHub ↗
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          Live Demo ↗
                        </a>
                      )}
                      {!project.githubUrl && !project.liveUrl && (
                        <span className="text-xs text-gray-400">No links attached</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
            <p className="text-gray-500 text-sm font-medium">No projects found in this category.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-3 text-xs font-semibold text-black underline"
            >
              Add a new project
            </button>
          </div>
        )}

        {/* Add Project Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Project</h2>

              <form onSubmit={handleAddSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. DevForge"
                    value={newProject.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Short Description
                  </label>
                  <textarea
                    name="description"
                    rows="2"
                    placeholder="What does this project do?"
                    value={newProject.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    name="techStack"
                    placeholder="React, Node.js, MongoDB"
                    value={newProject.techStack}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={newProject.status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Planned">Planned</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Progress ({newProject.progress}%)
                    </label>
                    <input
                      type="range"
                      name="progress"
                      min="0"
                      max="100"
                      value={newProject.progress}
                      onChange={handleChange}
                      className="w-full h-8 cursor-pointer accent-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    GitHub URL (optional)
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    placeholder="https://github.com/..."
                    value={newProject.githubUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Live Demo URL (optional)
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    placeholder="https://..."
                    value={newProject.liveUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800"
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
  )
}

export default Projects