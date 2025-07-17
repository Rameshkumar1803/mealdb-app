import React, { useState, useEffect } from "react";
import MealCard from "../components/MealCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    setFavorites(saved ? JSON.parse(saved) : []);
  }, []);

  const removeFavorite = (mealToRemove) => {
    const updated = favorites.filter((meal) => meal.idMeal !== mealToRemove.idMeal);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (meal) => true; // All meals here are favorites

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">⭐ Favorite Meals</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorite meals yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              isFavorite={isFavorite}
              toggleFavorite={removeFavorite}
              onClick={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
