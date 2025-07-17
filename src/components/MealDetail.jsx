import React from 'react';

const MealCard = ({ meal, onClick, isFavorite, toggleFavorite }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* ⭐ Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(meal);
        }}
        className="absolute top-2 right-2 z-10 bg-white bg-opacity-90 rounded-full p-1 shadow hover:bg-yellow-200 transition"
        title="Toggle Favorite"
      >
        {isFavorite(meal) ? '⭐' : '☆'}
      </button>

      {/* Meal Image */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={() => onClick(meal)}
      />

      {/* Meal Name */}
      <div
        className="p-3 cursor-pointer"
        onClick={() => onClick(meal)}
      >
        <h3 className="text-lg font-semibold text-gray-800">{meal.strMeal}</h3>
      </div>
    </div>
  );
};

export default MealCard;
