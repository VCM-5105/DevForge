import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const INITIAL_PROFILE = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  bio: 'Full-stack developer passionate about React, Node.js, and building clean developer tools.',
  skills: 'React, Node.js, Express, MongoDB, Tailwind CSS, JavaScript',
  github: 'https://github.com/alexdoe',
  linkedin: 'https://linkedin.com/in/alexdoe'
}

const Profile = () => {
  // Profile view data state
  const [profile, setProfile] = useState(INITIAL_PROFILE)

  // Edit mode toggle
  const [isEditing, setIsEditing] = useState(false)

  // Form input state (isolated from display state until saved)
  const [formData, setFormData] = useState(INITIAL_PROFILE)

  // Handle controlled input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Enter edit mode
  const handleEditClick = () => {
    setFormData(profile)
    setIsEditing(true)
  }

  // Cancel edit mode
  const handleCancel = () => {
    setFormData(profile)
    setIsEditing(false)
  }

  // Save changes to profile state
  const handleSave = (e) => {
    e.preventDefault()
    setProfile(formData)
    setIsEditing(false)
  }

  // Helper to extract first name initial for the avatar
  const getInitial = (name) => {
    return name ? name.trim().charAt(0).toUpperCase() : 'U'
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Profile Container */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal developer details and public links.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm">
          
          {!isEditing ? (
            /* ================= VIEW MODE ================= */
            <div className="space-y-6">
              
              {/* Avatar & Header Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-2xl font-extrabold border border-amber-200">
                    {getInitial(profile.name)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
              </div>

              {/* Bio Section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  About
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {profile.bio || 'No bio provided yet.'}
                </p>
              </div>

              {/* Skills Tags */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills
                    ? profile.skills.split(',').map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                        >
                          {skill.trim()}
                        </span>
                      ))
                    : <span className="text-xs text-gray-400">No skills listed</span>}
                </div>
              </div>

              {/* Links Section */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Online Presence
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 text-xs">
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-gray-900 hover:underline flex items-center gap-1"
                    >
                      GitHub Profile ↗
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      LinkedIn Profile ↗
                    </a>
                  )}
                  {!profile.github && !profile.linkedin && (
                    <span className="text-gray-400">No links connected</span>
                  )}
                </div>
              </div>

            </div>
          ) : (
            /* ================= EDIT MODE ================= */
            <form onSubmit={handleSave} className="space-y-4">
              
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h2 className="text-base font-bold text-gray-900">Edit Profile Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, TypeScript"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded-md transition-colors"
                >
                  Save Changes
                </button>
              </div>

            </form>
          )}

        </div>

      </main>
    </div>
  )
}

export default Profile