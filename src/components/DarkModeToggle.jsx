// src/components/DarkModeToggle.jsx
import React from "react";
import useDarkMode from "../hooks/useDarkMode";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-3 py-1 text-sm font-medium rounded-md border dark:border-gray-600 border-gray-300 dark:text-white text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
