import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const INITIAL_PROBLEMS = [
  {
    id: 1,
    title: 'Two Sum',
    topic: 'Arrays',
    difficulty: 'Easy',
    status: 'Solved'
  },
  {
    id: 2,
    title: 'Binary Search',
    topic: 'Arrays',
    difficulty: 'Easy',
    status: 'Reviewing'
  },
  {
    id: 3,
    title: 'LRU Cache',
    topic: 'Linked List',
    difficulty: 'Medium',
    status: 'Solved'
  },
  {
    id: 4,
    title: 'Trapping Rain Water',
    topic: 'Dynamic Programming',
    difficulty: 'Hard',
    status: 'Unsolved'
  },
  {
    id: 5,
    title: 'Valid Anagram',
    topic: 'Strings',
    difficulty: 'Easy',
    status: 'Solved'
  },
  {
    id: 6,
    title: 'Longest Substring Without Repeating Characters',
    topic: 'Strings',
    difficulty: 'Medium',
    status: 'Reviewing'
  }
]

const Problems = () => {
  // 1. State Management
  const [problems, setProblems] = useState(INITIAL_PROBLEMS)
  const [search, setSearch] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  // Modal / Add Problem State
  const [showAddModal, setShowAddModal] = useState(false)
  const [newProblem, setNewProblem] = useState({
    title: '',
    topic: 'Arrays',
    difficulty: 'Easy',
    status: 'Unsolved'
  })

  // 2. Multi-condition Filter Pipeline
  const filteredProblems = problems.filter((problem) => {
    // Search match against title or topic
    const matchesSearch =
      problem.title.toLowerCase().includes(search.toLowerCase()) ||
      problem.topic.toLowerCase().includes(search.toLowerCase())

    // Difficulty filter match
    const matchesDifficulty =
      difficultyFilter === 'All' || problem.difficulty === difficultyFilter

    // Status filter match
    const matchesStatus =
      statusFilter === 'All' || problem.status === statusFilter

    return matchesSearch && matchesDifficulty && matchesStatus
  })

  // 3. Handlers for CRUD (Frontend only)
  const handleDelete = (id) => {
    setProblems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!newProblem.title.trim()) return

    const createdItem = {
      id: Date.now(),
      ...newProblem
    }

    setProblems((prev) => [createdItem, ...prev])
    setNewProblem({
      title: '',
      topic: 'Arrays',
      difficulty: 'Easy',
      status: 'Unsolved'
    })
    setShowAddModal(false)
  }

  // Difficulty pill styling
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-700 bg-green-50'
      case 'Medium':
        return 'text-amber-700 bg-amber-50'
      case 'Hard':
        return 'text-red-700 bg-red-50'
      default:
        return 'text-gray-700 bg-gray-50'
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Problems</h1>
            <p className="text-sm text-gray-500 mt-1">
              Track and organize your coding problem solutions.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            + Add Problem
          </button>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Live Search Input */}
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search problems or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-1/2 md:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-1/2 md:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="All">All Statuses</option>
              <option value="Solved">Solved</option>
              <option value="Reviewing">Reviewing</option>
              <option value="Unsolved">Unsolved</option>
            </select>
          </div>
        </div>

        {/* Problems List Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50/50 text-xs font-semibold text-gray-400 border-b border-gray-100">
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Topic</th>
                  <th className="px-5 py-3">Difficulty</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((problem) => (
                    <tr key={problem.id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3.5 font-medium text-gray-900">
                        {problem.title}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">
                        {problem.topic}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded ${getDifficultyBadge(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-medium text-gray-600">
                          {problem.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleDelete(problem.id)}
                          className="text-xs text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-gray-400 text-sm">
                      No problems match the current filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Problem Simple Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Problem</h2>
              
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Problem Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Valid Parentheses"
                    value={newProblem.title}
                    onChange={(e) =>
                      setNewProblem({ ...newProblem, title: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stack, Graph, DP"
                    value={newProblem.topic}
                    onChange={(e) =>
                      setNewProblem({ ...newProblem, topic: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
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
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
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
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="Solved">Solved</option>
                      <option value="Reviewing">Reviewing</option>
                      <option value="Unsolved">Unsolved</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
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
                    Save Problem
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

export default Problems