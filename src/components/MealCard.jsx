// src/components/MealCard.jsx
import React from "react";
import { toast } from "react-toastify";

const MealCard = ({ meal, onClick, isFavorite, toggleFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(meal);
    const isFav = isFavorite(meal); // check after toggle
    setTimeout(() => {
      toast.success(isFav ? "⭐ Added to Favorites" : "❌ Removed from Favorites");
    }, 50);
  };

  const isFav = isFavorite(meal); // Always re-evaluated on every render

  return (
    <div className="relative border rounded shadow hover:shadow-md transition duration-300 overflow-hidden">
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-2 right-2 text-2xl transition-all duration-200 transform ${
          isFav ? "text-yellow-400 scale-110" : "text-gray-400 scale-100"
        } hover:scale-125 active:scale-95`}
        aria-label="Toggle Favorite"
      >
        ⭐
      </button>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={() => onClick(meal)}
      />

      <div
        className="p-4 text-center cursor-pointer"
        onClick={() => onClick(meal)}
      >
        <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
      </div>
    </div>
  );
};

export default MealCard;
