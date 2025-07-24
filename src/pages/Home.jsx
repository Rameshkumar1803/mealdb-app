import React, { useState, useEffect } from "react";
import MealCard from "../components/MealCard";
import MealDetail from "../components/MealDetail";

const Home = () => {
  const [search, setSearch] = useState("chicken");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // Pagination
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirstItem, indexOfLastItem);

  // Save favorites
  const saveFavorites = (items) => {
    setFavorites(items);
    localStorage.setItem("favorites", JSON.stringify(items));
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
    setIsLoading(true);
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

    if (selectedCategory) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    } else if (selectedArea) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setMeals(data.meals || []);
    setCurrentPage(1);
    setIsLoading(false);
  };

  const fetchFilters = async () => {
    const catRes = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
    );
    const areaRes = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const catData = await catRes.json();
    const areaData = await areaRes.json();
    setCategories(catData.meals || []);
    setAreas(areaData.meals || []);
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedCategory, selectedArea]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">🍽️ MealDB Explorer</h1>

      {selectedMeal ? (
        <MealDetail meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <input
              value={search}
              onChange={handleSearchInput}
              className="flex-1 border p-2 rounded w-full md:w-auto"
              placeholder="Search for meals..."
            />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedArea("");
              }}
              className="border p-2 rounded"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.strCategory} value={cat.strCategory}>
                  {cat.strCategory}
                </option>
              ))}
            </select>
            <select
              value={selectedArea}
              onChange={(e) => {
                setSelectedArea(e.target.value);
                setSelectedCategory("");
              }}
              className="border p-2 rounded"
            >
              <option value="">All Areas</option>
              {areas.map((area) => (
                <option key={area.strArea} value={area.strArea}>
                  {area.strArea}
                </option>
              ))}
            </select>
            <a href="/favorites" className="text-blue-600 underline">
              ⭐ View Favorites
            </a>
          </div>

          {/* Loading Spinner */}
          {isLoading ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-2 text-blue-600 font-medium">Loading meals...</p>
            </div>
          ) : meals.length > 0 ? (
            <>
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

              {/* Pagination */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({
                  length: Math.ceil(meals.length / itemsPerPage),
                }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === idx + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 mt-8">No meals found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
