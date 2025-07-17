import React from 'react';

const MealCard = ({ meal, onClick, isFavorite, toggleFavorite }) => {
  return (
    <div className="border p-4 rounded hover:shadow-md relative">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover rounded mb-2 cursor-pointer"
        onClick={() => onClick(meal)}
      />
      <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
      <p className="text-sm text-gray-500">{meal.strArea}</p>
      <button
        onClick={() => toggleFavorite(meal)}
        className="absolute top-2 right-2 text-xl"
        title={isFavorite(meal) ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite(meal) ? '♥' : '♡'}
      </button>
    </div>
  );
};

export default MealCard;