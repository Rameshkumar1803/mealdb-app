// src/components/MealDetail.jsx
import React from 'react';

const MealDetail = ({ meal, onClose }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded">
      <button onClick={onClose} className="mb-4 text-blue-600 underline">🔙 Back</button>
      <h2 className="text-2xl font-bold mb-2">{meal.strMeal}</h2>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded mb-4" />
      <p><strong>Category:</strong> {meal.strCategory}</p>
      <p><strong>Area:</strong> {meal.strArea}</p>
      <p className="mt-2">{meal.strInstructions}</p>
    </div>
  );
};

export default MealDetail;
