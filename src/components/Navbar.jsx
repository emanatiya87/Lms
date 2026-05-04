// import React from "react";
// import LogoutBtn from "./Logout";
// export default function Navbar() {
//   return (
//     <div>
//       nav
//       <LogoutBtn></LogoutBtn>
//     </div>
//   );
// }
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../redux/slices/users";
import LogoutBtn from "./Logout";
export default function Navbar() {
  const { token, fullName, email, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = !!token;

  // 🖱️ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔤 Get first letter
  const getInitials = (name) => name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 🔹 Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 hover:text-blue-600 transition"
        >
          EduPlatform
        </Link>

        {/* 🔹 Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-gray-600 hover:text-blue-600 font-medium transition"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-blue-600 font-medium transition"
          >
            About
          </Link>

          {/* 🎓 Role-based Dashboard link */}
          {isLoggedIn && role?.toLowerCase() === "tutor" && (
            <Link
              to="/dashboard"
              className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md font-medium hover:bg-blue-100 transition"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* 🔹 User Section (Desktop & Mobile) */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {getInitials(fullName)}
                </div>
                {/* Email (Hidden on small screens) */}
                <span className="text-sm text-gray-600 max-w-30 truncate hidden md:block">
                  {email}
                </span>
                {/* Chevron Down Icon */}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 overflow-hidden animate-fade-in-down">
                  <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {email}
                    </p>
                  </div>
                  <LogoutBtn />
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold text-blue-600 border border-blue-600 rounded-md px-4 py-1.5 hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </Link>
          )}

          {/* 🔹 Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Nav Links Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0">
          <div className="flex flex-col p-4 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 font-medium py-2 px-3 rounded hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/courses"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 font-medium py-2 px-3 rounded hover:bg-gray-50"
            >
              Courses
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 font-medium py-2 px-3 rounded hover:bg-gray-50"
            >
              About
            </Link>

            {isLoggedIn && role?.toLowerCase() === "tutor" && (
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-blue-600 font-medium py-2 px-3 rounded bg-blue-50"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
