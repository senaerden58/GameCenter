import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { getGames } from "./api";

import Navbar from './components/Navbar.js';
import Games from './components/Games.js';
import Login from './components/Login.js';
import Home from './components/Home.js';
import Register from './components/Register.js';


// const API_URL = "http://localhost:3000";

function App() {
  const [message, setMessage] = useState("");
  // const [games, setGames] = useState([]);
  // const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <div className="App">
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
    {/* <h1>Oyunlar</h1>
      {error && <p>{error}</p>}
      {games.length === 0 ? (
        <p>Hiç oyun yok.</p>
      ) : (
        <ul>
          {games.map(game => (
            <li key={game.id}>
              <h3>{game.name}</h3>
              <p>Tür: {game.genre}</p>
            </li>
          ))}
        </ul>
      )} */}
       <h1>{message}</h1>
    </div>
  );
}

export default App;
