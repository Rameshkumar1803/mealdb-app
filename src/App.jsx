// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 to-yellow-100">
        {/* Top Navigation Bar */}
        <Navbar />

        {/* Main content area */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>

        {/* Toast for Add/Remove feedback */}
        <ToastContainer position="bottom-center" autoClose={2000} />

        {/* Footer at bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
