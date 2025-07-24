import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path
      ? 'text-yellow-400 font-bold'
      : 'hover:text-yellow-300';

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        🍽️ MealDB Explorer
      </h1>
      <div className="space-x-6 text-lg">
        <Link to="/" className={linkClass('/')}>Home</Link>
        <Link to="/favorites" className={linkClass('/favorites')}>Favorites</Link>
      </div>
    </nav>
  );
};

export default Navbar;
