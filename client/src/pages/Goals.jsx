import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const INITIAL_GOALS = [
  {
    id: 1,
    title: 'Master JavaScript',
    description: 'Deep dive into event loop, closures, prototypes, and async patterns.',
    target: 10,
    current: 7,
    deadline: '2026-12-30',
    category: 'Language'
  },
  {
    id: 2,
    title: 'Solve 100 DSA Problems',
    description: 'Improve problem-solving across Trees, Graphs, and Dynamic Programming.',
    target: 100,
    current: 50,
    deadline: '2026-11-15',
    category: 'DSA'
  },
  {
    id: 3,
    title: 'Build Full-Stack MERN Portfolio',
    description: 'Complete DevForge workspace and deploy on cloud infrastructure.',
    target: 5,
    current: 5,
    deadline: '2026-10-01',
    category: 'Projects'
  }
]

const Goals = () => {
  // State management
  const [goals, setGoals] = useState(INITIAL_GOALS)
  const [filter, setFilter] = useState('All') // 'All', 'In Progress', 'Completed'
  const [showAddModal, setShowAddModal] = useState(false)

  // Form input state
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    current: 0,
    target: 10,
    deadline: '',
    category: 'General'
  })

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target
    setNewGoal((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle adding a new goal
  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!newGoal.title.trim() || !newGoal.target) return

    const goalItem = {
      id: Date.now(),
      title: newGoal.title,
      description: newGoal.description,
      current: Number(newGoal.current) || 0,
      target: Number(newGoal.target) || 1,
      deadline: newGoal.deadline || 'No deadline',
      category: newGoal.category
    }

    setGoals((prev) => [goalItem, ...prev])
    setNewGoal({
      title: '',
      description: '',
      current: 0,
      target: 10,
      deadline: '',
      category: 'General'
    })
    setShowAddModal(false)
  }

  // Handle deleting a goal
  const handleDelete = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
  }

  // Handle quick progress increment
  const handleIncrement = (id) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === id && goal.current < goal.target) {
          return { ...goal, current: goal.current + 1 }
        }
        return goal
      })
    )
  }

  // Filter pipeline
  const filteredGoals = goals.filter((goal) => {
    const isCompleted = goal.current >= goal.target
    if (filter === 'Completed') return isCompleted
    if (filter === 'In Progress') return !isCompleted
    return true
  })

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Goals</h1>
            <p className="text-sm text-gray-500 mt-1">
              Set targets, track your progress, and hit your milestones.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            + Add Goal
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

        {/* Goals Cards Grid */}
        {filteredGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredGoals.map((goal) => {
              const percentage = Math.min(
                100,
                Math.round((goal.current / goal.target) * 100)
              )
              const isDone = percentage === 100

              return (
                <div
                  key={goal.id}
                  className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Category & Status */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        {goal.category}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-medium ${
                          isDone
                            ? 'bg-green-50 text-green-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {isDone ? 'Completed' : 'In Progress'}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-bold text-gray-900">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 leading-snug">
                      {goal.description}
                    </p>
                  </div>

                  {/* Progress Section */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-xs font-medium text-gray-600 mb-1.5">
                      <span>
                        Progress: {goal.current} / {goal.target}
                      </span>
                      <span className="font-bold text-gray-900">{percentage}%</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isDone ? 'bg-green-500' : 'bg-black'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    {/* Target Date & Actions */}
                    <div className="flex justify-between items-center mt-4 pt-2 text-xs">
                      <span className="text-gray-400">
                        Target: <strong className="text-gray-600">{goal.deadline}</strong>
                      </span>

                      <div className="flex items-center gap-3">
                        {!isDone && (
                          <button
                            onClick={() => handleIncrement(goal.id)}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                          >
                            +1 Step
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(goal.id)}
                          className="text-xs font-semibold text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
            <p className="text-gray-500 text-sm font-medium">No goals found for this filter.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-3 text-xs font-semibold text-black underline"
            >
              Create a new goal
            </button>
          </div>
        )}

        {/* Add Goal Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Goal</h2>

              <form onSubmit={handleAddSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Master React Hooks"
                    value={newGoal.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="2"
                    placeholder="Brief detail about your target..."
                    value={newGoal.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Target Count
                    </label>
                    <input
                      type="number"
                      name="target"
                      min="1"
                      required
                      value={newGoal.target}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Current Progress
                    </label>
                    <input
                      type="number"
                      name="current"
                      min="0"
                      value={newGoal.current}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      placeholder="e.g. DSA, Web, CS"
                      value={newGoal.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Target Date
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={newGoal.deadline}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
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
                    Save Goal
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

export default Goals