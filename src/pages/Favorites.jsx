// src/pages/Favorites.jsx
import React, { useEffect, useState } from 'react';
import MealCard from '../components/MealCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const saveFavorites = (items) => {
    setFavorites(items);
    localStorage.setItem('favorites', JSON.stringify(items));
  };

  const toggleFavorite = (meal) => {
    const updated = favorites.filter((fav) => fav.idMeal !== meal.idMeal);
    saveFavorites(updated);
    toast.info("Removed from favorites");
  };

  const isFavorite = () => true;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">⭐ Favorite Meals</h1>
      <div className="flex justify-start mb-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          onClick={() => navigate("/")}
        >
          🔙 Back to Home
        </button>
      </div>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              onClick={() => {}}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
