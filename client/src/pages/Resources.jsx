import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const INITIAL_RESOURCES = [
  {
    id: 1,
    title: 'MDN Web Docs',
    description: 'Comprehensive documentation and references for JavaScript, HTML, CSS, and web APIs.',
    category: 'Documentation',
    topic: 'JavaScript',
    url: 'https://developer.mozilla.org',
    isSaved: true
  },
  {
    id: 2,
    title: 'React Official Documentation',
    description: 'The official guides, reference docs, and interactive examples for React.',
    category: 'Documentation',
    topic: 'React',
    url: 'https://react.dev',
    isSaved: true
  },
  {
    id: 3,
    title: 'NeetCode DSA Roadmap',
    description: 'Structured roadmap with free video tutorials and practice problems for algorithmic interviews.',
    category: 'Video / Tutorial',
    topic: 'DSA',
    url: 'https://neetcode.io',
    isSaved: false
  },
  {
    id: 4,
    title: 'Tailwind CSS Documentation',
    description: 'Utility-first CSS framework reference with complete class listings and components.',
    category: 'Documentation',
    topic: 'CSS',
    url: 'https://tailwindcss.com/docs',
    isSaved: false
  }
]

const CATEGORIES = ['All', 'Documentation', 'Video / Tutorial', 'Article', 'Tool']

const Resources = () => {
  const [resources, setResources] = useState(INITIAL_RESOURCES)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    category: 'Documentation',
    topic: 'JavaScript',
    url: '',
    isSaved: false
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewResource((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleToggleSave = (id) => {
    setResources((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSaved: !item.isSaved } : item
      )
    )
  }

  const handleDelete = (id) => {
    setResources((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!newResource.title.trim() || !newResource.url.trim()) return

    const createdResource = {
      id: Date.now(),
      ...newResource
    }

    setResources((prev) => [createdResource, ...prev])
    setNewResource({
      title: '',
      description: '',
      category: 'Documentation',
      topic: 'JavaScript',
      url: '',
      isSaved: false
    })
    setShowAddModal(false)
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description.toLowerCase().includes(search.toLowerCase()) ||
      resource.topic.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' || resource.category === selectedCategory

    const matchesSaved = showSavedOnly ? resource.isSaved : true

    return matchesSearch && matchesCategory && matchesSaved
  })

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
            <p className="text-sm text-gray-500 mt-1">
              Curate and access your personal library of tools, tutorials, and documentation.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            + Add Resource
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search resources, topics, or descriptions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-3 py-2 text-xs font-semibold rounded-md border whitespace-nowrap transition-colors ${
                showSavedOnly
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {showSavedOnly ? '★ Saved Only' : '☆ All Items'}
            </button>
          </div>
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">
                      {resource.category}
                    </span>

                    <button
                      onClick={() => handleToggleSave(resource.id)}
                      className={`text-sm font-bold transition-colors ${
                        resource.isSaved
                          ? 'text-amber-500'
                          : 'text-gray-300 hover:text-gray-500'
                      }`}
                      title={resource.isSaved ? 'Remove Bookmark' : 'Bookmark Resource'}
                    >
                      {resource.isSaved ? '★' : '☆'}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-gray-900">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-3 leading-relaxed">
                    {resource.description}
                  </p>

                  <div className="mt-3">
                    <span className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
                      {resource.topic}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-black hover:underline flex items-center gap-1"
                  >
                    Open Resource ↗
                  </a>

                  <button
                    onClick={() => handleDelete(resource.id)}
                    className="text-xs text-gray-400 hover:text-red-600 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
            <p className="text-gray-500 text-sm font-medium">No resources match your filter criteria.</p>
            <button
              onClick={() => {
                setSearch('')
                setSelectedCategory('All')
                setShowSavedOnly(false)
              }}
              className="mt-3 text-xs font-semibold text-black underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Resource</h2>

              <form onSubmit={handleAddSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Resource Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Next.js Learn Course"
                    value={newResource.title}
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
                    placeholder="Brief description of the material..."
                    value={newResource.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={newResource.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="Documentation">Documentation</option>
                      <option value="Video / Tutorial">Video / Tutorial</option>
                      <option value="Article">Article</option>
                      <option value="Tool">Tool</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Topic / Language
                    </label>
                    <input
                      type="text"
                      name="topic"
                      placeholder="e.g. Node.js, SQL"
                      value={newResource.topic}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    External URL
                  </label>
                  <input
                    type="url"
                    name="url"
                    required
                    placeholder="https://..."
                    value={newResource.url}
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
                    Save Resource
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

export default Resources