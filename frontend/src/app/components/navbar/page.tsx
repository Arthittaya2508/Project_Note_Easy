"use client";
import React, { useState, useEffect } from "react"; // Import useEffect
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { TbUserPlus } from "react-icons/tb";
import LoginModal from "../login-modal/page";
import { CiLogout } from "react-icons/ci";

function Nav() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Check local storage for authentication state on component mount
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    if (storedIsAuthenticated === "true") {
      setAuthenticated(true);
      setUserName(storedUserName || ""); // Default to an empty string if null
    }
  }, []);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    setAuthenticated(true);
    localStorage.setItem("userName", name); // Save username to local storage
    localStorage.setItem("isAuthenticated", "true"); // Save authentication state
    closeLoginModal();
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUserName("");
    localStorage.removeItem("userName"); // Remove username from local storage
    localStorage.setItem("isAuthenticated", "false"); // Update authentication state
    setProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <>
      <nav className="bg-gable-green-900 border-gray-200">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="self-center text-2xl font-semibold dark:text-white"
          >
            Note Easy
          </Link>

          {/* Search Bar */}
          <div className="flex-grow flex justify-center">
            <div className="relative hidden md:block w-full max-w-md">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FiSearch
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                />
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-titan-white-50 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6 ml-auto">
            {isAuthenticated && (
              <>
                <Link
                  href="/"
                  className="text-sm font-medium text-white dark:text-white"
                >
                  Home
                </Link>
                <Link
                  href="/homepage/home-page"
                  className="text-sm font-medium text-white dark:text-white"
                >
                  Notes
                </Link>
                <Link
                  href="/homepage/history"
                  className="text-sm font-medium text-white dark:text-white"
                >
                  ประวัติการแก้ไข
                </Link>
              </>
            )}
          </div>

          {/* User Authentication */}
          <div className="flex items-center ml-auto ">
            {isAuthenticated ? (
              <>
                {/* Circular Profile with Dropdown */}
                <div className="relative ml-10 ">
                  <div
                    className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full cursor-pointer"
                    onClick={toggleProfileDropdown}
                  >
                    <span className="font-medium text-gray-600 text-lg">
                      {userName.charAt(0)}{" "}
                      {/* Display first letter of user's name */}
                    </span>
                  </div>
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                      <Link
                        href="/edit-profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        แก้ไขโปรไฟล์
                      </Link>
                      <Link
                        href="/"
                        onClick={handleLogout}
                        className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        <CiLogout className="w-4 h-4" /> ออกจากระบบ
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <span
                  className="ml-10 text-sm font-medium text-white dark:text-white cursor-pointer"
                  onClick={openLoginModal}
                >
                  ลงชื่อเข้าใช้
                </span>
                <div
                  className="bg-white rounded-full w-10 h-10 ml-4 flex items-center justify-center cursor-pointer"
                  onClick={openLoginModal}
                >
                  <TbUserPlus
                    className="w-6 h-6 text-gray-800 dark:text-gray-800"
                    aria-hidden="true"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onLoginSuccess={handleLoginSuccess} // Pass down the function
        />
      )}
    </>
  );
}

export default Nav;
