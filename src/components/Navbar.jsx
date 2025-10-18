import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Home, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../store/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, authUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-base-100 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand / Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Home className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-primary">Chatty</span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 items-center text-lg font-semibold">
           
            <li className="flex items-center gap-1">
              <User
               className="w-5 h-5" 
               />
              <NavLink

                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-primary"
                }
              >
                Profile
              </NavLink>
            </li>
            <li className="flex items-center gap-1">
              <Settings className="w-5 h-5" />
              <NavLink
                to="/setting"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-primary"
                }
              >
                Setting
              </NavLink>
            </li>

            {authUser && (
              <li
                onClick={handleLogout}
                className="flex items-center gap-1 cursor-pointer text-red-600 hover:text-red-800"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-base-100 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div
          className="flex items-center gap-2 p-6 text-white font-bold text-xl shadow-md cursor-pointer bg-gradient-to-r from-primary to-secondary"
          onClick={() => {
            navigate("/");
            setIsOpen(false);
          }}
        >
          <Home className="w-6 h-6" />
          Chatty
        </div>

        {/* Sidebar Links */}
        <ul className="p-6 space-y-4 text-primary font-semibold">
          <li
            className="flex items-center gap-2 cursor-pointer"
            onClick={closeMenu}
          >
            <Home className="w-5 h-5" />
            <NavLink to="/">Home</NavLink>
          </li>
          <li
            className="flex items-center gap-2 cursor-pointer"
            onClick={closeMenu}
          >
            <User className="w-5 h-5" />
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li
            className="flex items-center gap-2 cursor-pointer"
            onClick={closeMenu}
          >
            <Settings className="w-5 h-5" />
            <NavLink to="/setting">Setting</NavLink>
          </li>

          {authUser && (
            <li
              className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-800"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
