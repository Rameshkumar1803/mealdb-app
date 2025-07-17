// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MealDetail from "./components/MealDetail";

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedMeal, setSelectedMeal] = useState(null);

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

  return (
    <Router>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">🍽️ MealDB Explorer</h1>

        {selectedMeal ? (
          <MealDetail meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onClick={setSelectedMeal}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  onClick={setSelectedMeal}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
