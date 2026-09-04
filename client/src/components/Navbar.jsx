import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-3 pb-2 bg-transparent">
      <div className="max-w-4xl mx-auto bg-neutral-900 text-white rounded-full px-3 py-2 flex items-center justify-between shadow-xl border border-neutral-800">
        
        <Link
          to="/"
          className="w-9 h-9 bg-white text-neutral-900 rounded-full flex items-center justify-center font-extrabold text-sm hover:scale-105 transition-transform shadow"
        >
          <FaGlobe size={18} />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive? "text-white font-semibold": "text-neutral-300 hover:text-white transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive? "text-white font-semibold": "text-neutral-300 hover:text-white transition-colors"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive? "text-white font-semibold": "text-neutral-300 hover:text-white transition-colors"
            }
          >
            Features
          </NavLink>


          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive? "text-amber-300 font-semibold": "text-neutral-300 hover:text-white transition-colors"
              }
            >
              Dashboard
            </NavLink>
          )}
        </nav>

       
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="bg-white text-neutral-900 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-neutral-200 transition-colors shadow-sm"
              >
                {user.email || user.name}
              </Link>
              <button
                onClick={logout}
                className="text-xs text-neutral-400 hover:text-red-400 px-2 py-1 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="bg-white text-neutral-900 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-neutral-200 transition-colors shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-xs text-neutral-300 hover:text-white px-3 py-1.5 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white pr-2 text-lg focus:outline-none"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden max-w-4xl mx-auto mt-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-sm text-neutral-200 flex flex-col gap-3 shadow-xl">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="py-1.5 px-2 hover:bg-neutral-800 rounded"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className="py-1.5 px-2 hover:bg-neutral-800 rounded"
          >
            About
          </NavLink>
          <NavLink
            to="/features"
            onClick={() => setIsOpen(false)}
            className="py-1.5 px-2 hover:bg-neutral-800 rounded"
          >
            Features
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="py-1.5 px-2 text-amber-300 hover:bg-neutral-800 rounded"
            >
              Dashboard
            </NavLink>
          )}

          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="bg-white text-neutral-900 text-center py-2 rounded-full font-semibold text-xs"
                >
                  {user.email || user.name}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-red-400 text-center text-xs py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-white text-neutral-900 text-center py-2 rounded-full font-semibold text-xs"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border border-neutral-700 text-white text-center py-2 rounded-full font-semibold text-xs"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
