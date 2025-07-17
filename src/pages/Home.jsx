// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import MealCard from '../components/MealCard';

const Home = ({ onClick, isFavorite, toggleFavorite }) => {
  const [search, setSearch] = useState("chicken");
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const data = await res.json();
    setMeals(data.meals || []);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMeals();
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Search for meals..."
        />
        <button className="bg-blue-500 text-white px-4 rounded">Search</button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            meal={meal}
            onClick={onClick}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
