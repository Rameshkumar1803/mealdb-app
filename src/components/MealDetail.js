import React from 'react';

const MealDetail = ({ meal, onClose }) => {
  const getIngredients = () => {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        list.push(`${ingredient} - ${measure}`);
      }
    }
    return list;
  };

  return (
    <div className="p-4">
      <button onClick={onClose} className="mb-4 text-red-500 underline">← Back to list</button>
      <h2 className="text-2xl font-bold mb-2">{meal.strMeal}</h2>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full max-w-md mb-4 rounded" />
      <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
      <p className="mb-4">{meal.strInstructions}</p>

      <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
      <ul className="list-disc list-inside">
        {getIngredients().map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealDetail;