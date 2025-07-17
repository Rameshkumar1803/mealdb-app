import React from 'react';

const MealDetail = ({ meal, onClose }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <button
        className="mb-4 text-red-500 hover:underline"
        onClick={onClose}
      >
        ⬅️ Back
      </button>
      <h2 className="text-2xl font-bold mb-2">{meal.strMeal}</h2>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="mb-4">{meal.strInstructions}</p>

      {meal.strYoutube && (
        <div className="mt-4">
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            ▶️ Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default MealDetail;
