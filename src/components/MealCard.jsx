// src/components/MealCard.jsx
import React from 'react';

const MealCard = ({ meal, onClick, isFavorite, toggleFavorite }) => {
  return (
    <div
      className="relative border rounded overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        onClick={() => onClick(meal)}
        className="w-full h-48 object-cover"
      />

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent triggering onClick of parent
          toggleFavorite(meal);
        }}
        className="absolute top-2 right-2 text-xl"
      >
        {isFavorite(meal) ? '❤️' : '🤍'}
      </button>

      <div onClick={() => onClick(meal)} className="p-4">
        <h3 className="text-lg font-semibold mb-1">{meal.strMeal}</h3>
        <p className="text-sm text-gray-500">{meal.strCategory}</p>
      </div>
    </div>
  );
};

export default MealCard;
