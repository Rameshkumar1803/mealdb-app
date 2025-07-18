import React from "react";

const MealDetail = ({ meal, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto z-50 p-4">
      <div className="bg-white text-black shadow-lg rounded p-4 w-full max-w-2xl relative mt-10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-black"
        >
          ✖
        </button>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{meal.strMeal}</h2>
        <p className="text-sm text-gray-600 mb-1">Category: {meal.strCategory}</p>
        <p className="text-sm text-gray-600 mb-4">Area: {meal.strArea}</p>
        <p className="text-sm text-gray-700 mb-4">{meal.strInstructions}</p>
        {meal.strYoutube && (
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            ▶️ Watch on YouTube
          </a>
        )}
      </div>
    </div>
  );
};

export default MealDetail;
