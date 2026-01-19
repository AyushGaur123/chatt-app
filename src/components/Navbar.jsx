import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {Menu, X, Home, User, Settings, LogOut} from "lucide-react";
import { useAuth } from "../store/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { logout, authUser } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.querySelector("html").setAttribute("data-theme", newTheme);
    setIsDark(!isDark);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setIsOpen(false);

const randomSeed = Math.random().toString(36).substring(7);
const avatarUrl = `https://api.dicebear.com/9.x/adventurer/png?seed=${randomSeed}`;

  const userAvatar =
    authUser?.profilePic || avatarUrl;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-base-100 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >

            <Home className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-primary">Chatty</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-lg font-semibold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1 ${
                  isActive ? "text-primary" : "hover:text-primary"
                }`
              }
            >
              <Home className="w-5 h-5" /> Home
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-1 ${
                  isActive ? "text-primary" : "hover:text-primary"
                }`
              }
            >
              <User className="w-5 h-5" /> Profile
            </NavLink>

            <NavLink
              to="/setting"
              className={({ isActive }) =>
                `flex items-center gap-1 ${
                  isActive ? "text-primary" : "hover:text-primary"
                }`
              }
            >
              <Settings className="w-5 h-5" /> Settings
            </NavLink>

           

            {authUser && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={userAvatar} alt="User Avatar" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/setting">Settings</NavLink>
                  </li>
                  <li onClick={handleLogout}>
                    <a className="text-red-500">Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost text-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-base-100 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-3 p-6 bg-gradient-to-r from-primary to-secondary text-white font-bold text-xl">
          {authUser && (
            <div className="avatar relative">
              <div className="w-16 rounded-full ring ring-white ring-offset-2">
                <img src={userAvatar} alt="User Avatar" />
              </div>
              <span className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 border border-white rounded-full"></span>
            </div>
          )}
          <span>{authUser?.fullName || "Chatty User"}</span>
        </div>

        <ul className="p-6 space-y-4 text-lg font-semibold text-primary">
          <li onClick={closeMenu}>
            <NavLink to="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" /> Home
            </NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink to="/profile" className="flex items-center gap-2">
              <User className="w-5 h-5" /> Profile
            </NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink to="/setting" className="flex items-center gap-2">
              <Settings className="w-5 h-5" /> Settings
            </NavLink>
          </li>
          {authUser && (
            <li
              className="flex items-center gap-2 text-red-600 hover:text-red-800 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" /> Logout
            </li>
          )}
        </ul>
      </div>

      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      ></div>
    </nav>
  );
};

export default Navbar;
