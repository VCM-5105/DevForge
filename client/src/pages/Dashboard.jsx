import React from 'react'
import Sidebar from '../components/Sidebar'

const STATS = [
  { id: 1, label: 'Solved Problems', value: 42 },
  { id: 2, label: 'Active Goals', value: 8 },
  { id: 3, label: 'Total Projects', value: 5 },
  { id: 4, label: 'Saved Notes', value: 23 },
]

const RECENT_PROBLEMS = [
  {
    id: 101,
    title: 'Two Sum',
    platform: 'LeetCode',
    topic: 'Arrays & Hashing',
    difficulty: 'Easy',
    status: 'Solved',
    date: 'Today'
  },
  {
    id: 102,
    title: 'Binary Search',
    platform: 'LeetCode',
    topic: 'Binary Search',
    difficulty: 'Easy',
    status: 'Solved',
    date: 'Yesterday'
  },
  {
    id: 103,
    title: 'LRU Cache',
    platform: 'LeetCode',
    topic: 'Linked List',
    difficulty: 'Medium',
    status: 'Solved',
    date: '3 days ago'
  },
  {
    id: 104,
    title: 'Merge K Sorted Lists',
    platform: 'LeetCode',
    topic: 'Heap / Priority Queue',
    difficulty: 'Hard',
    status: 'Reviewing',
    date: '4 days ago'
  }
]

const Dashboard = () => {
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
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, Developer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here is your daily developer overview and learning activity.
          </p>
        </div>

        {/* Minimal Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <p className="text-xs font-medium text-gray-500">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Minimal Problems Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Recent Problems</h2>
            <span className="text-xs text-gray-400">Last 7 Days</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50/50 text-xs font-semibold text-gray-400 border-b border-gray-100">
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Topic</th>
                  <th className="px-5 py-3">Difficulty</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {RECENT_PROBLEMS.map((problem) => (
                  <tr key={problem.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {problem.title}
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {problem.topic}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${getDifficultyBadge(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs font-medium text-gray-600">
                        {problem.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-xs text-gray-400">
                      {problem.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard