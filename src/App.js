import React, { useState, useEffect } from 'react';
import MealCard from './components/MealCard';
import MealDetail from './components/MealDetail';

const App = () => {
  const [search, setSearch] = useState("chicken");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [viewFavorites, setViewFavorites] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const saveFavorites = (items) => {
    setFavorites(items);
    localStorage.setItem('favorites', JSON.stringify(items));
  };

  const toggleFavorite = (meal) => {
    const exists = favorites.find((fav) => fav.idMeal === meal.idMeal);
    if (exists) {
      const updated = favorites.filter((fav) => fav.idMeal !== meal.idMeal);
      saveFavorites(updated);
    } else {
      saveFavorites([...favorites, meal]);
    }
  };

  const isFavorite = (meal) => {
    return favorites.some((fav) => fav.idMeal === meal.idMeal);
  };

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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🍽️ MealDB Explorer</h1>
      {selectedMeal ? (
        <MealDetail meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      ) : (
        <>
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border p-2 rounded"
              placeholder="Search for meals..."
            />
            <button className="bg-blue-500 text-white px-4 rounded">Search</button>
          </form>

          <div className="flex justify-between items-center mb-4">
            <button
              className="text-blue-600 underline"
              onClick={() => setViewFavorites(!viewFavorites)}
            >
              {viewFavorites ? '🔙 Back to Search' : '⭐ View Favorites'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(viewFavorites ? favorites : meals).map((meal) => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
                onClick={setSelectedMeal}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {viewFavorites && favorites.length === 0 && (
            <p className="text-center mt-4 text-gray-500">No favorite meals yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default App;