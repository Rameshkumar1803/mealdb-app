// src/components/MealCard.jsx
import React from "react";

const MealCard = ({ meal, onClick, isFavorite, toggleFavorite }) => {
  const handleFavorite = (e) => {
    e.stopPropagation(); // Prevent meal detail popup
    toggleFavorite(meal);
  };

  const isFav = isFavorite(meal);

  return (
    <div
      className="relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(meal)}
    >
      {/* Favorite Icon */}
      <button
        onClick={handleFavorite}
        className={`absolute top-2 right-2 text-2xl z-10 transition-all duration-300 transform hover:scale-125 ${
          isFav ? "text-yellow-400" : "text-gray-400"
        }`}
      >
        {isFav ? "⭐" : "☆"}
      </button>

      {/* Meal Image */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* Meal Name */}
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{meal.strMeal}</h2>
      </div>
    </div>
  );
};

export default MealCard;
