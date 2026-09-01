import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Problems', path: '/problems' },
  { name: 'Goals', path: '/goals' },
  { name: 'Projects', path: '/projects' },
  { name: 'Resources', path: '/resources' },
  { name: 'Notes', path: '/notes' },
  { name: 'Profile', path: '/profile' },
]

const Sidebar = () => {
  return (
    <aside className="w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] flex flex-col justify-between p-4">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Workspace
        </div>
        
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-amber-100 text-amber-900 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-black font-medium'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100">
        <Link
          to="/login"
          className="block px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          Logout
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar