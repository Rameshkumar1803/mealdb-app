// src/pages/Favorites.jsx
import React, { useState, useEffect } from 'react';
import MealCard from '../components/MealCard';
import MealDetail from '../components/MealDetail';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    setFavorites(saved ? JSON.parse(saved) : []);
  }, []);

  const saveFavorites = (items) => {
    setFavorites(items);
    localStorage.setItem('favorites', JSON.stringify(items));
  };

  const toggleFavorite = (meal) => {
    const updated = favorites.filter((fav) => fav.idMeal !== meal.idMeal);
    saveFavorites(updated);
  };

  const isFavorite = (meal) => {
    return favorites.some((fav) => fav.idMeal === meal.idMeal);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">⭐ Favorite Meals</h1>

      {selectedMeal ? (
        <MealDetail meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      ) : (
        <>
          <div className="mb-4 text-center">
            <a href="/" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
              🔙 Go Back to Home
            </a>
          </div>

          {favorites.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No favorite meals yet. Try adding some!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {favorites.map((meal) => (
                <MealCard
                  key={meal.idMeal}
                  meal={meal}
                  onClick={setSelectedMeal}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
