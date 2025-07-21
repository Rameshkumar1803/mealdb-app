// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import MealCard from '../components/MealCard';
import MealDetail from '../components/MealDetail';

const Home = () => {
  const [search, setSearch] = useState("chicken");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  // 👉 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 6;

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
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

    if (selectedCategory) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    } else if (selectedArea) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setMeals(data.meals || []);
    setCurrentPage(1); // reset to first page on new search/filter
  };

  const fetchFilters = async () => {
    const [catRes, areaRes] = await Promise.all([
      fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list"),
      fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    ]);
    const catData = await catRes.json();
    const areaData = await areaRes.json();
    setCategories(catData.meals || []);
    setAreas(areaData.meals || []);
  };

  useEffect(() => {
    fetchMeals();
    fetchFilters();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMeals();
  };

  // 👉 Calculate paginated meals
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(meals.length / mealsPerPage);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🍽️ MealDB Explorer</h1>

      {selectedMeal ? (
        <MealDetail meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      ) : (
        <>
          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border p-2 rounded"
              placeholder="Search for meals..."
              disabled={selectedCategory || selectedArea}
            />
            <button
              className="bg-blue-500 text-white px-4 rounded"
              disabled={selectedCategory || selectedArea}
            >
              Search
            </button>
          </form>

          {/* Category & Area Filters */}
          <div className="flex flex-wrap gap-4 mb-4 justify-center">
            <select
              className="border p-2 rounded"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedArea('');
                setSearch('');
                fetchMeals();
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.strCategory} value={cat.strCategory}>
                  {cat.strCategory}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded"
              value={selectedArea}
              onChange={(e) => {
                setSelectedArea(e.target.value);
                setSelectedCategory('');
                setSearch('');
                fetchMeals();
              }}
            >
              <option value="">All Areas</option>
              {areas.map((area) => (
                <option key={area.strArea} value={area.strArea}>
                  {area.strArea}
                </option>
              ))}
            </select>

            {(selectedCategory || selectedArea) && (
              <button
                className="text-red-500 underline"
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedArea('');
                  fetchMeals();
                }}
              >
                ❌ Clear Filter
              </button>
            )}
          </div>

          {/* Go to Favorites Page */}
          <div className="flex justify-between items-center mb-4">
            <a href="/favorites" className="text-blue-600 underline">
              ⭐ View Favorites
            </a>
          </div>

          {/* Meals List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentMeals.map((meal) => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
                onClick={setSelectedMeal}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {/* No Results */}
          {meals.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No meals found.</p>
          )}

          {/* Pagination Controls */}
          {meals.length > mealsPerPage && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ⬅️ Prev
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next ➡️
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
