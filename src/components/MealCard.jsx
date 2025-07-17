// src/components/MealCard.jsx
import React from 'react';

const MealCard = ({ meal, onClick, isFavorite, toggleFavorite }) => {
  const fav = isFavorite(meal);

  return (
    <div className="relative border rounded shadow hover:shadow-lg cursor-pointer overflow-hidden">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover"
        onClick={() => onClick(meal)}
      />

      <button
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md transition-transform transform hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(meal);
        }}
      >
        <span className="text-xl">{fav ? "💖" : "🤍"}</span>
      </button>

      <div className="p-2 text-center">
        <h3 className="font-semibold">{meal.strMeal}</h3>
        <p className="text-sm text-gray-500">{meal.strArea}</p>
      </div>
    </div>
  );
};

export default MealCard;
