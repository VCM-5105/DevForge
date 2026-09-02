import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const INITIAL_NOTES = [
  {
    id: 1,
    title: 'React useEffect Cheatsheet',
    content: 'Always specify dependencies correctly. Return a cleanup function for timers, subscriptions, or event listeners to prevent memory leaks.',
    category: 'React',
    date: '2026-08-28'
  },
  {
    id: 2,
    title: 'CSS Box Model & Flexbox Rules',
    content: 'Inline elements do not respect vertical margins/padding. Use flex or inline-block when building padded buttons inside links.',
    category: 'CSS',
    date: '2026-08-29'
  },
  {
    id: 3,
    title: 'MongoDB Indexing Basics',
    content: 'Create compound indexes on frequently queried combinations (e.g., user + status) to reduce document scan overhead in queries.',
    category: 'Database',
    date: '2026-08-31'
  }
]

const CATEGORIES = ['All', 'React', 'JavaScript', 'CSS', 'Database', 'General']

const Notes = () => {
  // 1. State declarations
  const [notes, setNotes] = useState(INITIAL_NOTES)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Modal & Form handling state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'React'
  })

  // 2. Controlled Form Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // 3. Open Modal for Create vs Edit
  const handleOpenCreateModal = () => {
    setEditingId(null)
    setFormData({
      title: '',
      content: '',
      category: 'React'
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (note) => {
    setEditingId(note.id)
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category
    })
    setIsModalOpen(true)
  }

  // 4. Save / Update Note Handler
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) return

    if (editingId) {
      // Update existing note
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: formData.title,
                content: formData.content,
                category: formData.category,
                date: 'Updated Today'
              }
            : note
        )
      )
    } else {
      // Create new note
      const newNote = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        category: formData.category,
        date: new Date().toISOString().split('T')[0]
      }
      setNotes((prev) => [newNote, ...prev])
    }

    setIsModalOpen(false)
  }

  // 5. Delete Note Handler
  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  // 6. Filter & Search Pipeline
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' || note.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
            <p className="text-sm text-gray-500 mt-1">
              Capture quick thoughts, code snippets, and architectural references.
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            + Add Note
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search notes or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>

          <div className="w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes Cards Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">
                      {note.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {note.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {note.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line line-clamp-4">
                    {note.content}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => handleOpenEditModal(note)}
                    className="text-xs font-semibold text-gray-700 hover:text-black transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
            <p className="text-gray-500 text-sm font-medium">No notes match your filter or search.</p>
            <button
              onClick={() => {
                setSearch('')
                setSelectedCategory('All')
              }}
              className="mt-3 text-xs font-semibold text-black underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Add / Edit Note Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {editingId ? 'Edit Note' : 'Add New Note'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Note Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Redux Toolkit Boilerplate"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="React">React</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="CSS">CSS</option>
                    <option value="Database">Database</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Content / Notes
                  </label>
                  <textarea
                    name="content"
                    rows="4"
                    required
                    placeholder="Write your note here..."
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800"
                  >
                    {editingId ? 'Update Note' : 'Save Note'}
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

export default Notes